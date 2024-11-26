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
  const [isVisible, setIsVisible] = useState(false);

  // Function to handle file download
  const handleDownloadPDF = () => {
    const link = document.createElement("a");
    link.href = "/webDeveloping.pdf"; // Ensure this file exists in your public directory
    link.setAttribute("download", "webDeveloping.pdf");
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
  {/* Toggle PDF Viewer */}
  <button
    className="bg-blue-500 text-white px-6 py-2 mb-4 rounded hover:bg-blue-600"
    onClick={() => setIsVisible(!isVisible)}
  >
    {isVisible ? "Hide PDF" : "View PDF"}
  </button>

  {isVisible && (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
      {/* Flex container for Total Pages and Download icon */}
      <div className="flex justify-between items-center mb-4">
        {/* Total Pages Text on the left */}
        <p className="text-left font-bold text-lg">Total Pages: {numPages}</p>

        {/* Download SVG Icon on the right */}
       <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth="1.5"
  stroke="currentColor"
  className="cursor-pointer" // This ensures the pointer changes on hover
  style={{ width: '20px', height: '20px'}} // Explicit size for the icon
  onClick={handleDownloadPDF}
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
  />
</svg>

      </div>

      {/* PDF Display Section */}
      <div className="max-h-96 overflow-y-scroll border border-gray-300 rounded-lg p-4 bg-gray-50 ">
        <Document
          file="/webDeveloping.pdf" // Ensure this file exists
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
</div>

  );
};
