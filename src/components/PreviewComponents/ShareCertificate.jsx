import React from "react";
import "./ShareCertificate.css";
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";
import { MdMail } from "react-icons/md"; // Gmail Icon from react-icons

const ShareCertificate = ({ shareUrl }) => {
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=Certificate%20Sharing&body=Check%20out%20my%20certificate:%20${encodeURIComponent(shareUrl)}`;

  return (
    <div className="share-buttons">
      <FacebookShareButton url={shareUrl} className="share-button">
        <FacebookIcon size={40} round />
      </FacebookShareButton>
      {/* Using Gmail's web compose interface with pre-filled subject and body */}
      <a href={gmailUrl} target="_blank" rel="noopener noreferrer" className="share-button">
        <MdMail size={40} />
      </a>
      <LinkedinShareButton url={shareUrl} className="share-button">
        <LinkedinIcon size={40} round />
      </LinkedinShareButton>
      <WhatsappShareButton url={shareUrl} className="share-button">
        <WhatsappIcon size={40} round />
      </WhatsappShareButton>
    </div>
  );
};

export default ShareCertificate;
