import React, { useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CaptchaField from "./CaptchaField";
import { useNavigate } from "react-router-dom";

const CertificateValidator = () => {
  const navigate = useNavigate();
  const [event, setEvent] = useState("");
  const [studentId, setStudentId] = useState("");
  const [certificateId, setCertificateId] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [userCaptchaInput, setUserCaptchaInput] = useState("");
  const captchaRef = useRef(null);

  const handleValidation = () => {
    // Refresh CAPTCHA after validation attempt
    if (captchaRef.current) {
      captchaRef.current.refreshCaptcha();
    }

    if (!captcha || userCaptchaInput !== captcha) {
      toast.error("Invalid CAPTCHA! Please try again.");
      return;
    }

    if (!(event && studentId) && !certificateId) {
      toast.error(
        "Please fill either the event and student ID fields or the certificate ID field."
      );
      return;
    }

    navigate(`/certificates/${studentId}/${event}`); // Redirect to the certificate page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 p-4">
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
        {/* Left: Certificate image */}
        <div className="w-full md:w-1/2 bg-gradient-to-b from-blue-300 to-blue-500 flex items-center justify-center p-6">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/girl-getting-certificate-illustration-download-in-svg-png-gif-file-formats--knowledge-skill-pack-school-education-illustrations-6294364.png?f=webp"
            alt="Certificate Graphic"
            className="w-3/4 h-auto rounded-lg shadow-lg transform hover:scale-110 transition-transform duration-300 ease-in-out"
          />
        </div>

        {/* Right: Form */}
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
            Certificate Validation
          </h2>
          <p className="text-gray-600 text-sm mb-6 text-center">
            Select the event and enter your student ID or directly enter the
            certificate ID below.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleValidation();
            }}
            className="space-y-6"
          >
            {/* Row 1: Event and Student ID */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="w-full">
                <label
                  htmlFor="event"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Event
                </label>
                <select
                  id="event"
                  value={event}
                  onChange={(e) => setEvent(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Choose an event</option>
                  <option value="2">GenAI Study Jam</option>
                  <option value="3">Event 2</option>
                  <option value="1">Event 3</option>
                </select>
              </div>

              <div className="w-full">
                <label
                  htmlFor="studentId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Student ID
                </label>
                <input
                  type="text"
                  id="studentId"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="Enter student ID"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* OR Separator */}
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-sm text-gray-500 font-medium">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div>
              <label
                htmlFor="certificateId"
                className="block text-sm font-medium text-gray-700"
              >
                Certificate ID
              </label>
              <input
                type="text"
                id="certificateId"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                placeholder="Enter certificate ID"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="w-full">
                <label
                  htmlFor="userCaptcha"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter CAPTCHA
                </label>
                <input
                  type="text"
                  id="userCaptcha"
                  value={userCaptchaInput}
                  onChange={(e) => setUserCaptchaInput(e.target.value)}
                  placeholder="Enter CAPTCHA"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <CaptchaField ref={captchaRef} onCaptchaChange={setCaptcha} />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transform hover:scale-105 transition-transform duration-300"
            >
              Validate Certificate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CertificateValidator;
