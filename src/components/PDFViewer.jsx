import { useState } from "react";
import { Document, Page } from "react-pdf";

const PDFViewer = () => {
  const [numPages, setNumPages] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "Hide PDF" : "View PDF"}
      </button>
      {isVisible && (
        <div style={styles.pdfContainer}>
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
          <p>Total Pages: {numPages}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#f4f4f4",
  },
  button: {
    position: "absolute",
    top: "10px",
    right: "10px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  pdfContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "20px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    overflow: "auto",
  },
};

export default PDFViewer;
