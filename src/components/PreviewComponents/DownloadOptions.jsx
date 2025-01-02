import React from "react";
import { Button, ButtonGroup } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { saveAs } from "file-saver";
import "./DownloadOptions.css";

const DownloadOptions = ({ downloadLinks }) => {
  const handleDownload = (format) => {
    const link = downloadLinks[format];
    if (link) {
      saveAs(link, `certificate.${format}`);
    } else {
      alert(`Download for ${format} is not available.`);
    }
  };

  return (
    <ButtonGroup className="download-button-group">
      <Button
        onClick={() => handleDownload("png")}
        className="download-button"
      >
        <DownloadIcon sx={{ mr: 1 }} />
        Download PNG
      </Button>
      <Button
        onClick={() => handleDownload("pdf")}
        className="download-button download-button-pdf"
      >
        <DownloadIcon sx={{ mr: 1 }} />
        Download PDF
      </Button>
    </ButtonGroup>
  );
};

export default DownloadOptions;
