import React, { useState, useEffect, useRef } from "react";
import certificateData from "../../data/certificate_data.json";
import { useParams, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Menu, X } from "lucide-react";
import EventCertificateComponent from "../CertificateTemplates/EventCertificateComponent";
import WorkShopCertificateComponent from "../CertificateTemplates/WorkShopCertificateComponent";
import GenAICertificate from "../CertificateTemplates/GenAICertificateComponent";
import CourseCertificateComponent from "../CertificateTemplates/CourseCertificateComponent";

// const Navbar = ({ showMenu }) => (
//   <nav
//     className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300 ${
//       showMenu ? "translate-x-0" : "-translate-x-full"
//     } hover:translate-x-0`}
//   >
//     <ul className="space-y-6 text-center mt-20">
//       <li>
//         <a href="#" className="text-blue-900 font-semibold text-xl">
//           My Certificates
//         </a>
//       </li>
//     </ul>
//   </nav>
// );

const ListOfCertificates = () => {
  const { st_id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [certificateImages, setCertificateImages] = useState({});
  const [showMenu, setShowMenu] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const templateRefs = useRef({});
  const hoverTimerRef = useRef(null); // Ref to hold the hover timer

  useEffect(() => {
    if (!st_id) return;

    const studentCertificates = [];
    let studentProfile = null;

    certificateData.forEach((certificate) => {
      const student = certificate.students.find(
        (s) => s.st_id.toString() === st_id
      );
      if (student) {
        studentProfile = student;
        studentCertificates.push({
          ...certificate,
          skills: certificate.skills || [],
        });
      }
    });

    if (studentProfile) {
      setProfile(studentProfile);
      setCertificates(studentCertificates);
    }
  }, [st_id]);

  useEffect(() => {
    if (certificates.length === 0) return;

    const generateAllCertificateImages = async () => {
      const images = {};
      for (const cert of certificates) {
        const templateRef = templateRefs.current[cert.cert_id];
        if (templateRef) {
          const canvas = await html2canvas(templateRef, { useCORS: true, scale: 2 });
          images[cert.cert_id] = canvas.toDataURL("image/png");
        }
      }
      setCertificateImages(images);
    };

    generateAllCertificateImages();
  }, [certificates]);

  const downloadImage = (imgData, certName, format, event) => {
    event.stopPropagation(); // Prevents navigation issue

    if (format === "png") {
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `${certName}.png`;
      link.click();
    } else if (format === "pdf") {
      const pdf = new jsPDF("landscape");
      pdf.addImage(imgData, "PNG", 10, 10, 280, 200);
      pdf.save(`${certName}.pdf`);
    }
  };

  // Handlers to manage hover state with a delay
  const handleMouseEnter = (id) => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    setHoveredIcon(id);
  };

  const handleMouseLeave = () => {
    hoverTimerRef.current = setTimeout(() => {
      setHoveredIcon(null);
    }, 200); // Adjust the delay as needed (in milliseconds)
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative">
      {/* Header */}
      {/* <header className="flex items-center justify-between p-4 bg-white shadow-md fixed top-0 left-0 right-0 z-50 w-full">
        <div className="flex items-center">
          <button
            className="p-2 text-[#0A8EE0] hover:text-[#0A8EE0] focus:outline-none"
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Toggle Menu"
          >
            {showMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-2xl font-bold text-[#0A8EE0] ml-4">GDG-MIT</h1>
        </div>
      </header> */}

      {/* Navbar */}
      {/* <Navbar showMenu={showMenu} /> */}

      {/* Main Content */}
      <div
        className={`pt-20 px-4 py-8 transition-all duration-300 min-h-screen w-full flex flex-col items-center ${
          showMenu ? "ml-64" : "ml-0"
        }`}
      >
        <h2
          className={`text-2xl font-semibold text-[#000000] mb-6 self-start transition-all duration-300 ${
            showMenu ? "ml-16" : "ml-0"
          }`}
        >
          My Certificates
        </h2>

        {/* Certificates Grid */}
        <div className="space-y-6 flex flex-col items-center">
          {certificates.map((certificate) => (
            <div
              key={certificate.cert_id}
              className="relative bg-white border border-gray-300 rounded-lg shadow-md w-[600px] h-[500px] flex flex-col items-center justify-center cursor-pointer"
              onClick={() =>
                navigate(`/certificates/${st_id}/${certificate.cert_id}`)
              }
            >
              {/* Hidden Certificate Component for Image Generation */}
              <div
                ref={(el) =>
                  (templateRefs.current[certificate.cert_id] = el)
                }
                className="absolute top-[-9999px] left-[-9999px]"
              >
                {certificate.category === "course" && (
                  <GenAICertificate
                    certificate={certificate}
                    student={profile}
                  />
                )}
                {certificate.category === "event" && (
                  <EventCertificateComponent
                    certificateData={certificate}
                    studentName={profile?.st_name}
                  />
                )}
                {certificate.category === "workshop" && (
                  <WorkShopCertificateComponent
                    certificateData={certificate}
                    studentName={profile?.st_name}
                  />
                )}
              </div>

              {/* Certificate Image Preview */}
              <div className="flex items-center justify-center w-full h-[85%] bg-gray-100 rounded-lg">
                {certificateImages[certificate.cert_id] ? (
                  <img
                    src={certificateImages[certificate.cert_id]}
                    alt="Certificate"
                    className="w-full h-full object-contain rounded-lg"
                  />
                ) : (
                  <p className="text-gray-500">
                    Generating certificate preview...
                  </p>
                )}
              </div>

              {/* Download Icon & Options */}
              <div className="absolute bottom-4 right-4">
                {/* Icon */}
                <div
                  onMouseEnter={() => handleMouseEnter(certificate.cert_id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Download
                    size={24}
                    className="cursor-pointer text-blue-600"
                  />
                </div>

                {/* Options Dropdown */}
                {hoveredIcon === certificate.cert_id && (
                  <div
                    className="absolute left-full ml-2 bottom-0 bg-white shadow-lg rounded-lg p-2"
                    onMouseEnter={() => handleMouseEnter(certificate.cert_id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      className="block text-sm text-gray-700 hover:bg-gray-200 px-3 py-1 rounded"
                      onClick={(event) =>
                        downloadImage(
                          certificateImages[certificate.cert_id],
                          certificate.name,
                          "pdf",
                          event
                        )
                      }
                    >
                      Download as PDF
                    </button>
                    <button
                      className="block text-sm text-gray-700 hover:bg-gray-200 px-3 py-1 rounded"
                      onClick={(event) =>
                        downloadImage(
                          certificateImages[certificate.cert_id],
                          certificate.name,
                          "png",
                          event
                        )
                      }
                    >
                      Download as PNG
                    </button>
                  </div>
                )}
              </div>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2  text-lg font-semibold text-[#000000] text-center rounded-b-lg">
                {certificate.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListOfCertificates;
