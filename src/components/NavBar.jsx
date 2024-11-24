import React, { useState } from "react";
import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";
import DownloadButtons from "./DownloadButton";
import { pdfjs } from "react-pdf";
import PDFViewer from "./PDFViewer";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const NavBar = () => {
  const [showPDFViewer, setShowPDFViewer] = useState(false); // State to control PDFViewer visibility

  const togglePDFViewer = () => {
    setShowPDFViewer(!showPDFViewer);
  };

  return (
    <>
      <BootstrapNavbar bg="dark" variant="dark" expand="lg">
        <Container>
          <BootstrapNavbar.Brand href="#">
            Digital Certificate Wallet
          </BootstrapNavbar.Brand>
          <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
          <BootstrapNavbar.Collapse id="navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#Home">Home</Nav.Link>
              <Nav.Link onClick={togglePDFViewer}>
                {showPDFViewer ? "Hide Certificate" : "My Certificate"}
              </Nav.Link>
              <Nav.Link href="#download">Download</Nav.Link>
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>

      {showPDFViewer && (
        <div style={styles.overlay}>
          <button style={styles.closeButton} onClick={togglePDFViewer}>
            Hide PDF
          </button>
          <div style={styles.pdfContainer}>
            <PDFViewer />
          </div>
          <div style={styles.downloadButtons}>
            <DownloadButtons />
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  overlay: {
    position: "relative",
    backgroundColor: "#f4f4f4",
    padding: "20px",
    minHeight: "100vh",
  },
  closeButton: {
    position: "absolute",
    top: "20px",
    right: "20px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    zIndex: 10, // Ensures the button is above the PDF content
  },
  pdfContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50px", // Adjusted to avoid overlapping with the button
  },
  downloadButtons: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
  },
};

export default NavBar;
