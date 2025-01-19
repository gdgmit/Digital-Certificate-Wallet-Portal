import CourseCertificateComponent from "../../components/CertificateTemplates/CourseCertificateComponent";
import jsonData from "../../data/certificate_data.json";
import React, { useState } from "react";
import EventCertificateComponent from "../CertificateTemplates/EventCertificateComponent";
import WorkShopCertificateComponent from "../CertificateTemplates/WorkShopCertificateComponent";

const SearchComponent = () => {
  const [searchId, setSearchId] = useState(""); // Search string (certificate_id)
  const [certificate, setCertificate] = useState(null); // Matched certificate data
  const [studentData, setStudentData] = useState(null); // Matched student data

  const handleSearch = (e) => {
    const searchValue = parseInt(e.target.value); // Parse input as integer
    setSearchId(e.target.value);

    // Find the certificate where one of the students has a matching certificate_id
    const matchedCertificate = jsonData.find((cert) =>
      cert.students.some((student) => student.certificate_id === searchValue)
    );

    if (matchedCertificate) {
      // Find the student whose certificate_id matches the search string
      const matchedStudent = matchedCertificate.students.find(
        (student) => student.certificate_id === searchValue
      );

      setCertificate(matchedCertificate); // Set the matched certificate
      setStudentData(matchedStudent); // Set the matched student
    } else {
      setCertificate(null); // Reset if no match is found
      setStudentData(null);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Search Certificate</h1>
        <input
          type="number"
          value={searchId}
          onChange={handleSearch}
          placeholder="Enter Certificate ID"
          className="border p-2 rounded w-full mb-4"
        />
  
        {/* Certificate Display Section */}
        <div className="overflow-y-auto max-h-96">
          {certificate && studentData && certificate.category === "course" && (
            <CourseCertificateComponent
              certificateData={certificate}
              studentName={studentData.st_name} // Pass the student's name
            />
          )}
          {certificate && studentData && certificate.category === "event" && (
            <EventCertificateComponent
              certificateData={certificate}
              studentName={studentData.st_name} // Pass the student's name
            />
          )}
          {certificate && studentData && certificate.category === "workshop" && (
            <WorkShopCertificateComponent
              certificateData={certificate}
              studentName={studentData.st_name} // Pass the student's name
            />
          )}
          {!certificate && searchId && (
            <p className="text-gray-500 text-center">
              No matching certificate found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
  
  
};

export default SearchComponent;
