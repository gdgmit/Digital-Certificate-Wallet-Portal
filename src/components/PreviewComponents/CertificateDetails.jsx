import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import DownloadOptions from "./DownloadOptions";
import ShareCertificate from "./ShareCertificate";
import CourseCertificateComponent from "../CertificateTemplates/CourseCertificateComponent";
import EventCertificateComponent from "../CertificateTemplates/EventCertificateComponent";
import WorkShopCertificateComponent from "../CertificateTemplates/WorkShopCertificateComponent";
import GenAICertificate from "../CertificateTemplates/GenAICertificateComponent";
import jsonData from "../../data/certificate_data.json";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GlobeIcon from "@mui/icons-material/Public";

const CertificateDetails = () => {
  const navigate = useNavigate();
  const { st_id, cert_id } = useParams();
  const [certificateImage, setCertificateImage] = useState(null);
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const templateRef = useRef(null);

  // Validate and extract certificate and student
  const certificate = jsonData.find(
    (certificate) => certificate.cert_id === parseInt(cert_id)
  );
  const student = certificate?.students.find((st) => st.st_id === st_id);

  useEffect(() => {
    if (!certificate || !student) {
      toast.error("Invalid certificate or student ID. Please try again.");
      navigate("/"); // Redirect to the home page
      return;
    } else {
      toast.success("Certificate and student details loaded successfully.");
    }

    const generateMedia = async () => {
      try {
        if (!templateRef.current) return;

        const canvas = await html2canvas(templateRef.current, {
          useCORS: true,
          scale: 4, // High-resolution rendering
          logging: false,
        });

        const imgData = canvas.toDataURL("image/png", 1.0); // Full quality
        setCertificateImage(imgData);

        // Generate PDF
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "px",
          format: [canvas.width, canvas.height],
        });
        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        const pdfBlob = pdf.output("blob");
        const blobUrl = URL.createObjectURL(pdfBlob);
        setPdfBlobUrl(blobUrl);
      } catch (error) {
        console.error("Error generating certificate or PDF: ", error);
      }
    };

    generateMedia();
  }, [certificate, student, navigate]);

  if (!certificate || !student) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-red-600">
          Invalid certificate or student ID. Please try again.
        </h1>
        <a href="/" className="text-blue-600 hover:underline">
          Go back
        </a>
      </div>
    ); // Prevent rendering if invalid
  }

  const isCourse = certificate.category === "course";
  const isEvent = certificate.category === "event";
  const isWorkshop = certificate.category === "workshop";

  return (
    <div className="flex justify-center bg-gray-50 py-8 px-4 md:px-12">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Section: Greeting and Description */}
          <div className="flex-1 bg-gray-100 p-6 rounded-md shadow-md">
            <h1 className="text-3xl font-extrabold text-indigo-700 mb-4">
              🎉 Congratulations, {student.st_name}! 🎓
            </h1>
            <p className="text-gray-700 text-lg mb-6">
              You've successfully completed the{" "}
              <span className="font-semibold text-indigo-600">
                {certificate.name}
              </span>{" "}
              course on{" "}
              <span className="font-semibold">{certificate.date}</span>. This
              certificate celebrates your dedication, hard work, and the
              valuable skills you've gained. 🌟
            </p>
            <p className="text-gray-700 text-md mb-4">
              As a student from the{" "}
              <span className="font-semibold">{student.dept}</span> department,
              your achievement in this course demonstrates your commitment to
              continuous learning and excellence.
            </p>
            <p className="text-gray-700 text-md mb-6">
              Keep up the good work, and continue to strive for success in your
              future endeavors! 🚀 Connect with us on
            </p>
            <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:gap-4 mt-6">
              <a
                href="https://gdg.community.dev/gdg-on-campus-madras-institute-of-technology-chennai-india/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 flex items-center justify-center"
              >
                <GlobeIcon sx={{ mr: 2 }} /> Community
              </a>
              <a
                href="https://instagram.com/gdg.mit"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-500 flex items-center justify-center"
              >
                <InstagramIcon sx={{ mr: 2 }} />
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/company/gdg-mit"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-800 flex items-center justify-center"
              >
                <LinkedInIcon sx={{ mr: 2 }} /> LinkedIn
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-2 flex flex-col items-center">
            {/* Hidden Template */}
            <div
              ref={templateRef}
              className="absolute top-[-9999px] left-[-9999px]"
            >
              {isCourse && (
                <GenAICertificate certificate={certificate} student={student} />
              )}
              {isEvent && (
                <EventCertificateComponent
                  certificateData={certificate}
                  studentName={student.st_name}
                />
              )}
              {isWorkshop && (
                <WorkShopCertificateComponent
                  certificateData={certificate}
                  studentName={student.st_name}
                />
              )}
            </div>

            {/* Certificate Preview */}
            {certificateImage && (
              <img
                src={certificateImage}
                alt="Certificate Preview"
                className="w-full max-w-md rounded-md shadow-md mb-4"
              />
            )}

            {/* Download and Share Options */}
            <div className="flex flex-col items-center space-y-4">
              <DownloadOptions
                downloadLinks={{
                  png: certificateImage,
                  pdf: pdfBlobUrl,
                }}
              />
              <ShareCertificate shareUrl="https://yourwebsite.com/certificates" />
            </div>
          </div>
        </div>

        {/* Certificate Details */}
        {/* Content Section: Course Details */}
        {certificate.category === "course" && (
          <div className="mt-8 bg-gray-50 p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              About the Course: {certificate.name}
            </h2>
            <p className="text-gray-700 text-md mb-6">
              The{" "}
              <span className="font-semibold text-indigo-600">
                {certificate.name}
              </span>{" "}
              is a comprehensive program designed to help learners develop
              skills in cutting-edge technologies and practical applications.
              This course empowers you with the knowledge and tools to excel in
              today's fast-paced, tech-driven world.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              🌟 What You Learned
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-6">
              {certificate.skills.map((skill, index) => (
                <li key={index} className="mb-2">
                  {skill}
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              🏅 Skills Earned
            </h3>
            <div className="flex flex-wrap gap-2">
              {certificate.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-indigo-600 text-white text-sm font-medium py-1 px-3 rounded-full shadow-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateDetails;
