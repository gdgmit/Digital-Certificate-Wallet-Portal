import React, { useState, useEffect } from "react";
import "animate.css";
import { motion } from "framer-motion";
import {
  FaShieldAlt, FaSearch, FaLeaf, FaClipboardList,
  FaCheckCircle, FaFilter, FaUsers, FaGlobe, FaCog
} from "react-icons/fa";

const features = [
  { icon: <FaShieldAlt />, title: "Secure Digital Storage", description: "All certificates are digitally stored and can be accessed anytime, ensuring safety from loss or damage." },
  { icon: <FaSearch />, title: "Automated Certificate Validation", description: "Instant verification by entering the certificate ID, ensuring authenticity and preventing forgery." },
  { icon: <FaLeaf />, title: "Go Green Initiative", description: "Eliminating paper-based certificates to promote sustainability and cost-effectiveness." },
  { icon: <FaClipboardList />, title: "Easy Retrieval", description: "Quickly fetch certificates by selecting the event and entering the registration number." },
  { icon: <FaCheckCircle />, title: "Scalability", description: "Designed to be extended beyond GDG MIT, enabling other organizations to manage certificates digitally." },
  { icon: <FaFilter />, title: "Event-Based Filtering", description: "Filter certificates based on events participated in, making it easy to find relevant records." },
  { icon: <FaUsers />, title: "User Management", description: "Administrators can manage users and grant access permissions for certificate retrieval and validation." },
  { icon: <FaGlobe />, title: "Global Accessibility", description: "Access certificates from anywhere in the world with our secure cloud-based platform." },
  { icon: <FaCog />, title: "Customization", description: "Organizations can customize certificate designs and branding as per their requirements." }
];

const HomePage = () => {
  const fullText = "Welcome to the Digital Certificate Wallet Portal";
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let index = 0;
    let isDeleting = false;
    const interval = setInterval(() => {
      setTypedText(fullText.substring(0, index));
      if (!isDeleting && index === fullText.length) {
        setTimeout(() => (isDeleting = true), 1000);
      } else if (isDeleting && index === 0) {
        isDeleting = false;
      }
      index = isDeleting ? index - 1 : index + 1;
    }, isDeleting ? 60 : 100);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0a0f33] to-black flex flex-col items-center text-center overflow-hidden">

      
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900 opacity-60 animate-pulse" />

      {/* Header Section */}
    

<motion.img 
src="/Digital-Certificate-Wallet-Portal/assets/gdglogo.png" 
alt="GDG Logo" 
className="mx-auto mt-12 mb-4 w-80 sm:w-96 md:w-[36rem] h-auto drop-shadow-2xl"
animate={{ y: [0, -20, 0] }} 
transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
/>
<motion.div 
  initial={{ opacity: 0, y: -50 }} 
  animate={{ opacity: 1, y: 0 }} 
  transition={{ duration: 1 }} 
  className="max-w-3xl w-full p-6 relative z-10 flex flex-col items-center justify-center h-48"
>

  {/* Fixed height for consistent layout */}
  <div className="h-20 flex items-center justify-center px-4 sm:px-0">
  <motion.h1 
    className="text-3xl sm:text-5xl font-extrabold text-white tracking-wide mt-2 sm:mt-4 mb-4 sm:mb-6 text-center"
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    transition={{ delay: 1, duration: 1 }}
  >
    <span className="text-blue-400">{typedText}</span>
  </motion.h1>
</div>

  
</motion.div>
<motion.p 
  className="text-lg sm:text-xl text-gray-300 mt-4 mb-6 px-4 max-w-2xl"
  initial={{ opacity: 0 }} 
  animate={{ opacity: 1 }} 
  transition={{ delay: 1.5, duration: 1 }}
>
  A secure platform to manage, access, and verify digital certificates with ease.
</motion.p>

<motion.a 
  href="/Digital-Certificate-Wallet-Portal/validate" 
  className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg shadow-lg hover:bg-blue-700 transition duration-200 transform hover:scale-110"
  whileTap={{ scale: 0.9 }}
>
  Validate
</motion.a>


      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-12 p-6 max-w-6xl w-full relative z-10">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="relative bg-gray-800 p-8 rounded-xl text-white text-center shadow-lg transition-all duration-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
              scale: 1.08,
              boxShadow: "0px 0px 30px rgba(0, 140, 255, 0.6)",
              background: "linear-gradient(135deg, rgba(0, 140, 255, 0.2), rgba(255, 255, 255, 0.1))",
              transition: { duration: 0.15 }
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: index * 0.1, ease: "easeOut" }}
          >
            <div className="text-blue-400 text-5xl mb-4 transition-all duration-300 ease-in-out">{feature.icon}</div>
            <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 w-full py-6 mt-12 text-center text-gray-400 text-sm border-t border-gray-800">
        <p>&copy; {new Date().getFullYear()} Digital Certificate Wallet. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
