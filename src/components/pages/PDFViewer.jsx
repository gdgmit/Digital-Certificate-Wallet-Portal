import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles

// React-PDF configuration
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

// DownloadButtons Component
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
    const link = document.createElement("a");
    link.href = "/path/to/your/image.png"; // Adjust this path as necessary
    link.setAttribute("download", "image.png"); // Set the name for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <Button variant="primary" className="mx-2" onClick={handleDownloadPDF}>
        Download PDF
      </Button>
      <Button variant="secondary" className="mx-2" onClick={handleDownloadPNG}>
        Download PNG
      </Button>
    </div>
  );
}

// PDFViewer Component
export const PDFViewer = () => {
  const [numPages, setNumPages] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div style={styles.container}>
      <Button
        variant="primary"
        className="mb-4"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? "Hide PDF" : "View PDF"}
      </Button>
      {isVisible && (
        <div style={styles.pdfViewerContainer}>
          <p style={styles.pageInfo}>Total Pages: {numPages}</p>
          <div style={styles.scrollPanel}>
            <Document
              file="/webDeveloping.pdf"
              onLoadSuccess={onDocumentLoadSuccess}
            >
              {Array.from({ length: numPages }, (_, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              ))}
            </Document>
          </div>
        </div>
      )}
      {/* Add DownloadButtons Below the PDF */}
      <DownloadButtons />
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f4f4",
    padding: "20px",
  },
  pdfViewerContainer: {
    backgroundColor: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    padding: "20px",
    width: "80%",
    maxWidth: "900px",
  },
  pageInfo: {
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "10px",
  },
  scrollPanel: {
    maxHeight: "500px",
    overflowY: "scroll",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "10px",
    backgroundColor: "#f9f9f9",
  },
};
