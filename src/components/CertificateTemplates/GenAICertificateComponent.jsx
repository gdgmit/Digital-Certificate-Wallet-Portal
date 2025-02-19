import React from "react";

const Certificate = ({ certificate, student }) => {
  return (
    <div
      className="bg-white border border-gray-300 shadow-lg mx-auto"
      style={{
        width: "297mm", // A4 landscape width
        height: "210mm", // A4 landscape height
      }}
    >
      <div className="w-full h-full flex">
        {/* Left Section: Skills Acquired */}
        <div
          className="p-6"
          style={{
            width: "35%",
            borderRadius: "10px 0 0 10px",
            background: "linear-gradient(to bottom, #e0f7ff, #cceeff)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img
              src="/Digital-Certificate-Wallet-Portal/assets/cert-logo-au.svg"
              alt="Google Logo"
              className="h-40"
            />
          </div>

          {/* Title */}
          <h3 className="font-bold text-blue-900 text-lg text-center mb-2">
            Skills Acquired ({certificate.skills.length})
          </h3>

          <div
            className="bg-white p-4 rounded-lg shadow-md"
            style={{
              border: "1px solid #e0e0e0",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <ol className="list-none space-y-2">
              {certificate.skills.map((skill, index) => (
                <li
                  key={index}
                  className="text-gray-800 text-sm"
                  style={{
                    lineHeight: "1.5",
                  }}
                >
                  {/* Skill Name */}
                  <span style={{ wordBreak: "break-word" }}>
                    {index + 1}. {skill}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Right Section: Certificate Content */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          {/* Top Content */}
          <div>
            <div className="flex justify-between items-center mb-12">
              <div>
                <h1 className="text-3xl font-bold text-blue-600">
                  Certificate of Achievement
                </h1>
                <p className="text-gray-600">
                  Google Developer Groups On Campus - MIT
                </p>
              </div>
              <img
                src="/Digital-Certificate-Wallet-Portal/assets/gdgoc-logo.png"
                alt="MIT Logo"
                className="h-24"
              />
            </div>

            {/* Participant Info */}
            <div className="mt-24">
              <p className="text-lg text-gray-700">This is to certify that</p>
              <h2 className="text-2xl font-bold text-gray-800 mt-2">
                {student.st_name}
              </h2>
              <p className="text-gray-700 mt-4">
                has successfully completed the {certificate.category} titled{" "}
                <span className="font-bold">{certificate.name}</span> and
                acquired the listed skills.
              </p>
            </div>

            {/* Certificate ID and Date */}
            <div className="mt-4">
              <p className="text-gray-600">
                Certificate ID:{" "}
                <span className="font-bold">{student.certificate_id}</span>
              </p>
              <p className="text-gray-600">
                Date: <span className="font-bold">{certificate.date}</span>
              </p>
            </div>
          </div>

          {/* Bottom Content */}
          <div>
            {/* Signature Section */}
            <div className="flex justify-between mt-8">
              <div className="text-center">
                <img
                  src="/Digital-Certificate-Wallet-Portal/assets/signature/staff-kottilingam.png"
                  alt="Signature"
                  className="h-16"
                />
                <p className="font-bold border-t border-gray-500 pt-2">
                  Faculty Incharge
                </p>
                <p className="text-gray-700">Dr. Kottilingam</p>
                <p className="text-gray-600 text-sm">Assistant Professor</p>
              </div>
              <div className="text-center">
                <img
                  src="/Digital-Certificate-Wallet-Portal/assets/signature/vijai-sign.png"
                  alt="Signature"
                  className="h-16"
                />
                <p className="font-bold border-t border-gray-500 pt-2">
                  Organizer
                </p>
                <p className="text-gray-700">Mr. Vijai Suria</p>
                <p className="text-gray-600 text-sm">Chapter Lead</p>
              </div>
              <div className="text-center">
                <img
                  src="/Digital-Certificate-Wallet-Portal/assets/signature/usha-ai.png"
                  alt="Signature"
                  className="h-16"
                />
                <p className="font-bold border-t border-gray-500 pt-2">
                  Facilitator
                </p>
                <p className="text-gray-700">Ms. Usha Nandhini</p>
                <p className="text-gray-600 text-sm">AI & ML Innovation Lead</p>
              </div>
            </div>

            {/* Footer Section */}
            <div className="text-center mt-8 text-gray-600 text-sm">
              <p>
                Go green! This certificate was generated electronically to
                promote sustainability. You can verify its authenticity at{" "}
                <span className="font-bold">{window.location.href}</span>.
              </p>
              <p className="mt-2">
                Powered by Google Developer Groups On Campus - MIT, Anna
                University
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
