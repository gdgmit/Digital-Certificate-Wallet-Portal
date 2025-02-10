import React, { useState, useEffect, useRef } from 'react';
import certificateData from "../../data/certificate_data.json";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import CourseCertificateComponent from "../CertificateTemplates/CourseCertificateComponent";
import EventCertificateComponent from "../CertificateTemplates/EventCertificateComponent";
import WorkShopCertificateComponent from "../CertificateTemplates/WorkShopCertificateComponent";
import GenAICertificate from "../CertificateTemplates/GenAICertificateComponent";

const ListOfCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [certificateImages, setCertificateImages] = useState({});
  // const [studentDetails, setStudentDetails] = useState([]);
  const { st_id } = useParams();
  const [profile, setProfile] = useState(null);
  const templateRefs = useRef({});

  // useEffect(() => {
  //   if (st_id) {

  //     let studentInfo = null;
  //   certificateData.some((certificate) => {
  //     const student = certificate.students.find((s) => s.st_id === st_id);
  //     if (student) {
  //       studentInfo = {
  //         st_id: student.st_id,
  //         st_name: student.st_name,
  //         dept: student.dept,
  //       };
        
  //     }
  //   });
  //   // console.log(studentInfo)
  //   setStudentDetails(studentInfo); 
    
  //     // Filter certificates for the given student ID
  //     const studentCertificates = certificateData
  //       .filter((certificate) =>
  //         certificate.students.some((student) => student.st_id === st_id)
  //       )
  //       .map((certificate) => ({
  //         cert_id: certificate.cert_id,
  //         name: certificate.name,
  //         category: certificate.category,
  //         date: certificate.date,
  //       }));

  //     setCertificates(studentCertificates);

      
  //   }
  // }, [st_id]);

  useEffect(() => {
    let studentProfile = null;
    const studentCertificates = [];

    // Find the student data from certificateData
    certificateData.forEach((certificate) => {
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
        certificates: studentCertificates,
      };
      setProfile(formattedProfile);
    }

    
  }, [st_id]);

  useEffect(() => {
    console.log(profile)
      if (profile && profile.certificates.length > 0) {
        setCertificates(profile.certificates);
      }
    }, [profile]);

  useEffect(() => {
    // Automatically generate certificate images when certificates are loaded
    console.log(certificates)
    const generateAllCertificateImages = async () => {
      for (const cert of certificates) {
        const templateRef = templateRefs.current[cert.cert_id];

        if (templateRef) {
          const canvas = await html2canvas(templateRef, {
            useCORS: true,
            scale: 2,
          });
          const imgData = canvas.toDataURL("image/png");
          setCertificateImages((prevImages) => ({
            ...prevImages,
            [cert.cert_id]: imgData,
          }));
        }
      }
    };

    if (certificates.length > 0) {
      generateAllCertificateImages();
    }
  }, [certificates]);

  const downloadImage = (imgData, certName) => {
    const link = document.createElement("a");
    link.href = imgData;
    link.download = `${certName}.png`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-white relative">
      <h2 className="text-2xl font-semibold text-[#000000] px-4 py-2 rounded self-start mb-6">
        My Certificates
      </h2>

      <div className="space-y-6 w-full flex flex-col items-center">
        {certificates.map((certificate) => (
          <div
            key={certificate.cert_id}
            className="bg-white border border-gray-300 rounded-lg shadow-md w-[600px] h-[500px] flex flex-col items-center"
          >
            {/* Hidden Certificate Template */}
            <div
              ref={(el) => (templateRefs.current[certificate.cert_id] = el)}
              className="absolute top-[-9999px] left-[-9999px] bg-white p-4 w-[500px] rounded-md"
            >
              {certificate.category === "course" && (
                <GenAICertificate certificate={certificate} student={profile} />
              )}
              {certificate.category === "event" && (
                <EventCertificateComponent
                  certificateData={certificate}
                  studentName={profile.st_name}
                />
              )}
              {certificate.category === "workshop" && (
                <WorkShopCertificateComponent
                  certificateData={certificate}
                  studentName={profile.st_name}
                />
              )}
            </div>

            {/* Certificate Preview */}
            <div className="flex items-center justify-center w-full h-[85%]">
              {certificateImages[certificate.cert_id] ? (
                <img
                  src={certificateImages[certificate.cert_id]}
                  alt="Generated Certificate"
                  className="object-cover w-[95%] h-[95%] rounded-lg"
                />
              ) : (
                <p>Generating certificate preview...</p>
              )}
            </div>

            {/* Download Button */}
            {certificateImages[certificate.cert_id] && (
              <button
                className="bg-green-500 text-white px-4 py-2 mt-4 rounded-md"
                onClick={() =>
                  downloadImage(
                    certificateImages[certificate.cert_id],
                    certificate.name
                  )
                }
              >
                Download Certificate
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListOfCertificates;
