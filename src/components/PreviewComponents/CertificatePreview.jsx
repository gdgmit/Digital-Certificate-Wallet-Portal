import React from "react";
import "./CertificatePreview.css";

const CertificatePreview = ({ image }) => {
  return (
    <div className="preview-container">
      <div className="preview-card">
        <img src={image} alt="Certificate Preview" className="preview-image" />
      </div>
    </div>
  );
};

export default CertificatePreview;
