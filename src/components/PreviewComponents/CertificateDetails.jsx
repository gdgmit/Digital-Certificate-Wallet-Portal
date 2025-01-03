import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Container, Paper } from "@mui/material";
import DownloadOptions from "./DownloadOptions";
import ShareCertificate from "./ShareCertificate";
import CertificatePreview from "./CertificatePreview";
import studentsData from "./data/certificate_data.json";
import "./CertificateDetails.css";

const CertificateDetails = () => {
  const { st_id, cert_id } = useParams();
  const student = studentsData.find(student => student.st_id === parseInt(st_id));
  const certificate = student?.certificates.find(cert => cert.cert_id === parseInt(cert_id));

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

  return (
    <Container className="container">
      <Paper className="paper">
        <Box className="title-row">
          <Typography variant="h3" className="title">
            {certificate.name}
          </Typography>
        </Box>
        <Box display="flex" className="box">
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
          <Box className={isCourse ? "main-content" : "full-content"}>
            <CertificatePreview image="/assets/sample-certificate.png" />
            <DownloadOptions
              downloadLinks={{
                png: "/assets/sample-certificate.png",
                pdf: "/assets/sample-certificate.pdf",
              }}
              className="download"
            />
            <ShareCertificate shareUrl="https://yourwebsite.com/certificates" />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CertificateDetails;
