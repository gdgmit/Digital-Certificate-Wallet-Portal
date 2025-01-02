import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "tailwindcss/tailwind.css"; // Ensure Tailwind CSS is included in your project

// React-PDF configuration
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export const PDFViewer = () => {
  const [numPages, setNumPages] = useState(0);
  const [currentPDF, setCurrentPDF] = useState("/webDeveloping.pdf"); // Default PDF

  const paths = ['/webDeveloping.pdf', '/git-github-reference.pdf'];

  // Function to handle file download
  const handleDownloadPDF = (pdfPath) => {
    const link = document.createElement("a");
    link.href = pdfPath; // Ensure this file exists in your public directory
    link.setAttribute("download", pdfPath);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // React-PDF success callback
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      {/* PDF Selection Dropdown */}
      <div className="mb-4">
        <label htmlFor="pdfSelect" className="font-semibold text-lg mr-2">Select a PDF:</label>
        <select
          id="pdfSelect"
          className="p-2 border border-gray-300 rounded"
          value={currentPDF}
          onChange={(e) => setCurrentPDF(e.target.value)}
        >
          {paths.map((path, index) => (
            <option key={index} value={path}>
              {path.replace("/pdfs/", "")} {/* Option label (filename) */}
            </option>
          ))}
        </select>
      </div>

      {/* PDF Display Section */}
      <div className="max-h-96 overflow-y-scroll border border-gray-300 rounded-lg p-4 bg-gray-50">
        <Document
          file={currentPDF} // Dynamically change PDF file based on selection
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

      {/* Download icon */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-left font-bold text-lg">Total Pages: {numPages}</p>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="cursor-pointer"
          style={{ width: '20px', height: '20px'}} // Explicit size for the icon
          onClick={() => handleDownloadPDF(currentPDF)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
      </div>
    </div>
  );
};
