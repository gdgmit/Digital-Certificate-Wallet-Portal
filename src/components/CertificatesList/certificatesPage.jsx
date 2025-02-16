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


const ListOfCertificates = () => {
  const { st_id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [certificateImages, setCertificateImages] = useState({});
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const templateRefs = useRef({});
  const hoverTimerRef = useRef(null);

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
      // Loop through certificates sequentially
      for (const cert of certificates) {
        const templateRef = templateRefs.current[cert.cert_id];
        if (templateRef) {
          // Wait 500ms to allow images and fonts to load
          await new Promise((resolve) => setTimeout(resolve, 500));
          try {
            const canvas = await html2canvas(templateRef, {
              useCORS: true,
              scale: 2,
            });
            images[cert.cert_id] = canvas.toDataURL("image/png");
          } catch (error) {
            console.error("Error capturing certificate", cert.cert_id, error);
            images[cert.cert_id] = "data:,";
          }
        }
      }
      setCertificateImages(images);
    };
  
    generateAllCertificateImages();
  }, [certificates]);
  

  const downloadImage = (imgData, certName, format, event) => {
    event.stopPropagation();
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

  const handleMouseEnter = (id) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setHoveredIcon(id);
  };

  const handleMouseLeave = () => {
    hoverTimerRef.current = setTimeout(() => {
      setHoveredIcon(null);
    }, 200);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative px-4 sm:px-8 w-full">
      <div className="pt-20 px-4 py-8 transition-all duration-300 min-h-screen w-full flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-[#000000] mb-6 self-start">
          My Certificates
        </h2>
        <div className="space-y-6 flex flex-col items-center w-full">
          {certificates.map((certificate) => (
            <div
              key={certificate.cert_id}
              className="relative bg-white border border-gray-300 rounded-lg shadow-md w-full max-w-[600px] h-auto sm:h-[500px] cursor-pointer"
              onClick={() =>
                navigate(`/certificates/${st_id}/${certificate.cert_id}`)
              }
            >
              {/* Hidden Certificate for html2canvas Capture */}
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
                  <>
                   
                    <EventCertificateComponent
                      studentName={profile?.st_name}
                      certificateData={certificate}
                      
                    />
                  </>
                )}
                {certificate.category === "workshop" && (
                  <WorkShopCertificateComponent
                  studentName={profile?.st_name}
                    certificateData={certificate}
                    
                  />
                )}
              </div>

              {/* Responsive Certificate Card */}
              <div className="flex flex-col h-full">
                {/* Header: Certificate Name */}
                <div className="px-3 py-1 bg-white bg-opacity-70 text-blue-700 text-center text-sm sm:text-lg font-semibold z-10 max-w-xs mx-auto">
                  {certificate.name}
                </div>
               {/* { console.log("All certificate images:", certificateImages)} */}

                
                {/* Main Content: Certificate Preview */}
                <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-lg">
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

                {/* Footer: Download Icon and Buttons */}
                <div className="px-3 py-1 bg-white bg-opacity-70 flex flex-col items-center z-10">
                  <div
                    onMouseEnter={() => handleMouseEnter(certificate.cert_id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Download
                      size={30}
                      className="cursor-pointer text-blue-700"
                    />
                  </div>
                  {hoveredIcon === certificate.cert_id && (
                    <div
                      className="absolute bottom-[50px] mt-2 bg-white shadow-lg rounded-lg p-2"
                      onMouseEnter={() => handleMouseEnter(certificate.cert_id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <button
                        className="block text-sm text-gray-700 hover:bg-gray-200 px-3 py-1 rounded mb-1"
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListOfCertificates;
