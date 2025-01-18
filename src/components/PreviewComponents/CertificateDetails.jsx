import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Container, Paper } from "@mui/material";
import DownloadOptions from "./DownloadOptions";
import ShareCertificate from "./ShareCertificate";
import CourseCertificateComponent from "../CertificateTemplates/CourseCertificateComponent";
import EventCertificateComponent from "../CertificateTemplates/EventCertificateComponent";
import WorkShopCertificateComponent from "../CertificateTemplates/WorkShopCertificateComponent";
import jsonData from "../../data/certificate_data.json";
import html2canvas from "html2canvas";
import "./CertificateDetails.css";

const CertificateDetails = () => {
  const { st_id, cert_id } = useParams();
  const certificate = jsonData.find(certificate => certificate.cert_id === parseInt(cert_id));
  const student = certificate?.students.find(st => st.st_id === parseInt(st_id));

  const [certificateImage, setCertificateImage] = useState(null);
  const templateRef = useRef(null); // Reference for the certificate template

  // Function to generate image from the component
  const generateCertificateImage = () => {
    if (templateRef.current) {
      html2canvas(templateRef.current, { logging: true, useCORS: true }).then((canvas) => {
        setCertificateImage(canvas.toDataURL("image/png")); // Set image source from canvas
      }).catch((error) => {
        console.error("Error generating certificate image: ", error);
      });
    }
  };

  useEffect(() => {
    if (certificate && student) {
      generateCertificateImage(); // Generate image when certificate and student are loaded
    }
  }, [certificate, student]);

  if (!student || !certificate) {
    return (
      <Container>
        <Typography variant="h5" color="error" align="center" sx={{ mt: 4 }}>
          Certificate not found.
        </Typography>
      </Container>
    );
  }

  const isCourse = certificate.category === "course";
  const isEvent = certificate.category === "event";
  const isWorkshop = certificate.category === "workshop";

  return (
    <Container className="container">
      <Paper className="paper">
        <Box className="title-row">
          <Typography variant="h3" className="title">
            {certificate.name}
          </Typography>
        </Box>
        {isCourse && (
          <Box className="skills-panel">
            <Typography variant="h5" className="skills-title">
              Skills Gained
            </Typography>
            <ul>
              {certificate.skills.map((skill, index) => (
                <li key={index} className="skills-item">
                  {skill}
                </li>
              ))}
            </ul>
          </Box>
        )}
        {/* Box with flexDirection column to align items vertically */}
        <Box display="flex" flexDirection="column" className="content-container">
          <Box ref={templateRef} className="preview-container">
            <div className="preview-card">
              {isCourse && (
                <CourseCertificateComponent
                  certificateData={certificate}
                  studentName={student.st_name}
                />
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
          </Box>

          {/* Provide the generated image for downloading */}
          {certificateImage && (
            <DownloadOptions
              downloadLinks={{
                png: certificateImage, // Use the generated image link for PNG download
                pdf: "/assets/sample-certificate.pdf", // Placeholder for the PDF download link
              }}
              className="download"
            />
          )}

          {/* Share Certificate Component */}
          <ShareCertificate shareUrl="https://yourwebsite.com/certificates" />
        </Box>
      </Paper>
    </Container>
  );
};

export default CertificateDetails;
