import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DownloadOptions from "../PreviewComponents/DownloadOptions";
import ShareCertificate from "../PreviewComponents/ShareCertificate";
import GenAICertificate from "../CertificateTemplates/GenAICertificateComponent";
import EventCertificateComponent from "../CertificateTemplates/EventCertificateComponent";
import WorkShopCertificateComponent from "../CertificateTemplates/WorkShopCertificateComponent";
import jsonData from "../../data/certificate_data.json";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "react-toastify";

const EditProfile = () => {
  const navigate = useNavigate();
  const { st_id } = useParams();
  const [profile, setProfile] = useState(null);
  const [certificateImage, setCertificateImage] = useState(null);
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const templateRef = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [originalProfile, setOriginalProfile] = useState(null);

  // Fetch the profile and certificates on initial render
  useEffect(() => {
    let studentProfile = null;
    const studentCertificates = [];

    // Find the student data from certificateData
    jsonData.forEach((certificate) => {
      const student = certificate.students.find(
        (s) => s.st_id.toString() === st_id
      );
      if (student) {
        studentProfile = student;
        studentCertificates.push({
          ...certificate,
          skills: certificate.skills || [],
        });
      }
    });

    // If studentProfile found, set the profile data
    if (studentProfile) {
      const formattedProfile = {
        ...studentProfile,
        email: studentProfile.email || "",
        password: studentProfile.password || "",
        confirmPassword: "",
        certificates: studentCertificates,
      };
      setProfile(formattedProfile);
      setOriginalProfile(formattedProfile);
    }
  }, [st_id]);

  // Handle media generation for the certificate (image/PDF)
  useEffect(() => {
    if (profile && profile.certificates.length > 0) {
      const recentCertificate = profile.certificates.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      )[0];
      generateMedia(recentCertificate);
    }
  }, [profile]);

  const generateMedia = async (recentCertificate) => {
    if (!templateRef.current) return;

    try {
      const canvas = await html2canvas(templateRef.current, {
        useCORS: true,
        scale: 4, // High-resolution rendering
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png", 1.0);
      setCertificateImage(imgData);

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      const pdfBlob = pdf.output("blob");
      const blobUrl = URL.createObjectURL(pdfBlob);
      setPdfBlobUrl(blobUrl);
    } catch (error) {
      console.error("Error generating certificate or PDF: ", error);
    }
  };

  const toggleEditMode = () => {
    if (editMode) {
      if (!validatePassword(profile.password) || !validateConfirmPassword()) {
        alert("Please fix the errors before saving.");
        return;
      }
      console.log("Updated Profile Data:", profile);
      alert("Profile updated successfully!");
    }
    setEditMode(!editMode);
  };

  const cancelEditMode = () => {
    setProfile(originalProfile);
    setEditMode(false);
    setPasswordError("");
    setConfirmPasswordError("");
  };

  const handleProfileChange = (e, field) => {
    setProfile({
      ...profile,
      [field]: e.target.value,
    });
  };

  const validatePassword = (password) => {
    if (!password) return true; // Skip validation if password is not being changed
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
    const isValid = passwordRegex.test(password);
    setPasswordError(
      isValid
        ? ""
        : "Password must include uppercase, lowercase, number, and special character, and be at least 7 characters."
    );
    return isValid;
  };

  const validateConfirmPassword = () => {
    const isMatch = profile.password === profile.confirmPassword;
    setConfirmPasswordError(isMatch ? "" : "Passwords do not match.");
    return isMatch;
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl text-red-500 font-bold">Profile not found!</p>
      </div>
    );
  }

  // Get the most recent certificate based on the date
  const recentCertificate = profile.certificates.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )[0];

  const isCourse = recentCertificate.category === "course";
  const isEvent = recentCertificate.category === "event";
  const isWorkshop = recentCertificate.category === "workshop";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* <header className="bg-blue-700 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-full p-2">
            <img
              src="/external/images/gdg_logo.png"
              alt="GDG Logo"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold">Google Developer Groups</h1>
        </div>
      </header> */}
      <main className="flex-grow p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h1 className="text-3xl font-semibold text-gray-800">My Profile</h1>
            <div className="flex gap-2">
              {editMode && (
                <button
                  onClick={cancelEditMode}
                  className="px-6 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold transition-all"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={toggleEditMode}
                className={`px-6 py-2 rounded-lg ${
                  editMode ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
                } text-white text-sm font-semibold transition-all`}
              >
                {editMode ? "Save Changes" : "Edit Profile"}
              </button>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {[{ label: "Name", value: "st_name" },
              { label: "Student ID", value: "regno" },
              { label: "Email", value: "email" },
              { label: "Department", value: "dept" },
              { label: "Password", value: "password" },
            ].map(({ label, value }) => (
              <div key={value}>
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <input
                  type={value === "password" ? "password" : "text"}
                  value={profile[value]}
                  onChange={(e) => handleProfileChange(e, value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!editMode}
                />
              </div>
            ))}

            {editMode && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <input
                    type="password"
                    value={profile.confirmPassword}
                    onChange={(e) => handleProfileChange(e, "confirmPassword")}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {confirmPasswordError && (
                  <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>
                )}
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Recent Certificate Section */}
        <div className="mt-8 p-6 bg-green-50 shadow-lg rounded-lg max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-green-800 flex items-center gap-2">
            🎉Congratulations on your recent certificate, {profile.st_name}! 🎓
          </h2>
          <h3 className="text-l font-semibold text-green-600 mt-4">
            You have successfully completed the{" "}
            <span className="text-green-700 text-xl font-semibold">{recentCertificate.name}</span> on{" "}
            <span className="text-green-700">{recentCertificate.date}</span>.
          </h3>

          <div className="flex flex-col items-center mt-6">
            {/* Hidden Template */}
            <div
              ref={templateRef}
              className="absolute top-[-9999px] left-[-9999px]"
            >
              {isCourse && (
                <GenAICertificate certificate={recentCertificate} student={profile} />
              )}
              {isEvent && (
                <EventCertificateComponent
                  certificateData={recentCertificate}
                  studentName={profile.st_name}
                />
              )}
              {isWorkshop && (
                <WorkShopCertificateComponent
                  certificateData={recentCertificate}
                  studentName={profile.st_name}
                />
              )}
            </div>

            {/* Certificate Preview */}
            {certificateImage ? (
  <a href={certificateImage} target="_blank" rel="noopener noreferrer">
    <img
      src={certificateImage}
      alt="Certificate Preview"
      className="w-full max-w-md rounded-md shadow-lg mb-4 cursor-pointer"
    />
  </a>
) : (
  <p className="text-lg text-gray-600">Loading certificate preview...</p>
)}

            {/* Download and Share Options */}
            <div className="flex flex-col items-center space-y-4 mt-4">
              <DownloadOptions
                downloadLinks={{
                  png: certificateImage,
                  pdf: pdfBlobUrl,
                }}
              />
              <ShareCertificate shareUrl="https://yourwebsite.com/certificates" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditProfile;