import React, { useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { Document, Page, pdfjs } from "react-pdf";

// Set the workerSrc property to the location of the pdf.worker.js file
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const onLoadError = (error) => {
    setError(error);
    setLoading(false);
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <h5 className="card-title">PDF Viewer</h5>
        {loading && <Spinner animation="border" />}
        {error && <div>Error loading PDF: {error.message}</div>}
        {!loading && !error && (
          <Document
            file="/webDeveloping.pdf" // Adjust this path if necessary
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onLoadError}
          >
            <Page pageNumber={pageNumber} />
          </Document>
        )}
        {!loading && numPages && (
          <p>Page {pageNumber} of {numPages}</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default PDFViewer;