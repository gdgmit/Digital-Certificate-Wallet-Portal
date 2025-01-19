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
import jsPDF from "jspdf";
import "./CertificateDetails.css";

const CertificateDetails = () => {
  const { st_id, cert_id } = useParams();
  const certificate = jsonData.find(
    (certificate) => certificate.cert_id === parseInt(cert_id)
  );
  const student = certificate?.students.find(
    (st) => st.st_id === parseInt(st_id)
  );

  const [certificateImage, setCertificateImage] = useState(null);
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const templateRef = useRef(null);

  // Function to generate image from the component
  const generateCertificateImage = () => {
    if (templateRef.current) {
      html2canvas(templateRef.current, { useCORS: true, logging: true })
        .then((canvas) => {
          setCertificateImage(canvas.toDataURL("image/png"));
        })
        .catch((error) => {
          console.error("Error generating certificate image: ", error);
        });
    }
  };

  const generatePDF = () => {
    if (templateRef.current) {
      html2canvas(templateRef.current, { useCORS: true })
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF({
            orientation: "landscape", // Certificate orientation
            unit: "px",
            format: [canvas.width, canvas.height],
          });

          pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);

          // Create a blob URL for the PDF
          const pdfBlob = pdf.output("blob");
          const blobUrl = URL.createObjectURL(pdfBlob);
          setPdfBlobUrl(blobUrl); // Store the blob URL
        })
        .catch((error) => {
          console.error("Error generating PDF: ", error);
        });
    }
  };


  useEffect(() => {
    if (certificate && student) {
      generateCertificateImage(); 
      generatePDF();
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
    
    <Box display="flex" justifyContent="space-between" className="content-section" sx={{ mt: 4 }}>
      {/* Left Section: Skills Gained */}
      {isCourse && (
        <Box
          className="skills-panel"
          sx={{ flex: "1", marginRight: "20px" }} // Allow flexible width and spacing
        >
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

      {/* Right Section: Certificate Preview & Actions */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        className="certificate-preview-section"
        sx={{ flex: "2" }} // Make the right section wider
      >
        {/* Hidden Template for Generating Image */}
        <Box
          ref={templateRef}
          style={{
            position: "absolute",
            top: "-9999px",
            left: "-9999px", // Position the element off-screen
          }}
        >
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
        </Box>

        {/* Display Generated Image */}
        <Box>
          {certificateImage && (
            <img
              src={certificateImage}
              alt="Certificate Preview"
              className="certificate-preview"
              style={{
                maxWidth: "100%",
                height: "auto",
                marginBottom: "20px", // Space between preview and download options
              }}
            />
          )}
        </Box>

        {/* Download and Share Options */}
        <Box display="flex" flexDirection="column" alignItems="center">
          <DownloadOptions
            downloadLinks={{
              png: certificateImage, // Use the generated image link for PNG download
              pdf: pdfBlobUrl, // Dynamically generated PDF link
            }}
            className="download"
          />
          <ShareCertificate shareUrl="https://yourwebsite.com/certificates" />
        </Box>
      </Box>
    </Box>
  </Paper>
</Container>

  );
};

export default CertificateDetails;
