import React, { useState, useEffect } from 'react';
import certificateData from '../data/certificate_data.json';
import Navbar from '../components/Navbar';
import logo from '/logo.png';

const ListOfCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const studentCertificates = certificateData[0]?.certificates || [];
    setCertificates(studentCertificates);
  }, []);

  return (
    <div className="min-h-screen bg-white relative">
      <header className="flex items-center justify-between p-4 bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center">
          <button
            className="p-2 rounded-md"
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Toggle Menu"
          >
            {showMenu ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#0A8EE0]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#0A8EE0]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          <h1 className="text-2xl font-bold text-[#0A8EE0] ml-4 ">GDG-MIT</h1>

          <img src={logo} alt="GDG-MIT Logo" className="h-8 w-auto ml-3" />
        </div>
      </header>

      <Navbar showMenu={showMenu} toggleMenu={() => setShowMenu(!showMenu)} />

      {/* Main Content */}
      <div
        className={`pt-20 px-4 py-8 transition-all duration-300 flex flex-col items-center min-h-screen ${
          showMenu ? 'ml-64' : 'ml-0'
        }`}
      >
        {/* Certificates Heading */}
        <h2 className="text-2xl font-semibold  text-[#000000] px-4 py-2 rounded self-start mb-6">
          My Certificates
        </h2>

        {/* Certificates Section */}
        <div className="space-y-6 w-full flex flex-col items-center">
          {certificates.map((certificate) => (
   <div
   key={certificate.cert_id}
   className="bg-white border border-gray-300 rounded-lg shadow-md w-[600px] h-[500px] flex flex-col items-center"
 >
   {/* Certificate Image */}
   <div className="flex items-center justify-center w-full h-[85%]">
     <img
       src={
         certificate.image ||
         'https://via.placeholder.com/150x150.png?text=Certificate+Preview'
       }
       alt={certificate.name}
       className="object-cover w-[95%] h-[95%] rounded-lg"
     />
   </div>
 
   {/* Certificate Name and Download Icon */}
   <div className="flex items-center justify-between w-full h-[15%] px-4">
     <p className="text-lg font-semibold text-[#000000] text-center flex-grow">
       {certificate.name}
     </p>
     <button
       className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-[#0A8EE0] transition-colors ml-4"
       onClick={() => alert(`Downloading ${certificate.name}`)}
       aria-label="Download"
     >
      <svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-12 w-12 text-black hover:text-gray-800 transition-colors"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
         <path
           strokeLinecap="round"
           strokeLinejoin="round"
           strokeWidth={2}
           d="M12 4v12m4-4l-4 4-4-4m0 4h8"
         />
       </svg>
     </button>
   </div>
 </div>   
       
                   ))}
        </div>
      </div>
    </div>
  );
};

export default ListOfCertificates;
