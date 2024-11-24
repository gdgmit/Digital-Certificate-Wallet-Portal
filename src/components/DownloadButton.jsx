import React from "react";
import { Button } from "react-bootstrap";

function DownloadButtons() {
  const handleDownloadPDF = () => {
    const link = document.createElement("a");
    link.href = "/webDeveloping.pdf"; // Adjust this path as necessary
    link.setAttribute("download", "webDeveloping.pdf"); // Set the name for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPNG = () => {
    // You can implement similar logic for PNG download if needed
    // For example, if you have a PNG file:
    const link = document.createElement("a");
    link.href = "/path/to/your/image.png"; // Adjust this path as necessary
    link.setAttribute("download", "image.png"); // Set the name for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
   <div className="d-flex justify-content-center">
  <Button variant="primary" className="mx-2" onClick={handleDownloadPDF}>
    Download PDF
  </Button>
  <Button variant="secondary" className="mx-2" onClick={handleDownloadPNG}>
    Download PNG
  </Button>
</div>

  );
};

export default DownloadButtons;
