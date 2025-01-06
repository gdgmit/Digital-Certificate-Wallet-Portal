import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Navbar = ({ isLoggedIn, setIsLoggedIn, handleLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility
  const navigate = useNavigate(); // For navigation

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to login page
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  const handleLogoutClick = () => {
    handleLogout(); // Call the parent logout function
    setSidebarOpen(false); // Close sidebar on logout
    navigate('/');
  };

  return (
    <nav className="bg-white-600 text-blue-600 py-4">
      <div className="container mx-auto flex justify-between items-center relative">
        {/* Hamburger Icon (3-line symbol) on the left, always visible */}
        {isLoggedIn && (
          <button
            className="block text-blue-600 mr-2"
            onClick={handleSidebarToggle}
          >
            <div className="w-6 h-0.5 bg-blue-600 mb-1"></div>
            <div className="w-6 h-0.5 bg-blue-600 mb-1"></div>
            <div className="w-6 h-0.5 bg-blue-600"></div>
          </button>
        )}

        {/* GDG-MIT Logo */}
        <div  className="flex items-center gap-x-1">
          <h1 className="text-2xl font-bold">GDG-MIT</h1>
          <img
            src="gdg-logo.png"
            alt="GDG Logo"
            className="h-8 w-12"
          />
        </div>

        {/* Regular Navbar Links */}
        <ul className="flex space-x-6 hidden lg:flex">
          <li>
            <button
              onClick={() => navigate('/')}
              className="hover:underline text-blue-600 bg-transparent border border-blue-600 py-2 px-4 rounded"
            >
              Home
            </button>
          </li>
          {isLoggedIn && (
            <>
              <li>
                <button
                  onClick={() => navigate('/dashboard/:st_id')}
                  className="hover:underline text-blue-600 bg-transparent border border-blue-600 py-2 px-4 rounded"
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/certificates/:st_id')}
                  className="hover:underline text-blue-600 bg-transparent border border-blue-600 py-2 px-4 rounded"
                >
                  My Certificates
                </button>
              </li>
            </>
          )}
          {!isLoggedIn && (
            <li>
              <button
                onClick={handleLoginClick}
                className="hover:underline text-blue-600 bg-transparent border border-blue-600 py-2 px-4 rounded"
              >
                Login
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Sidebar (Appears on the left side) */}
      {isSidebarOpen && isLoggedIn && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50 z-10"
            onClick={handleSidebarToggle}
          ></div>

          {/* Sidebar content on the left */}
          <div className="fixed top-0 left-0 w-64 h-full bg-white text-blue-600 z-20 p-4">
            <h2 className="text-xl font-bold mb-4">User Options</h2>
            <ul>
              <li>
                <button
                  onClick={() => navigate('/profile')}
                  className="w-full text-left hover:underline mb-4"
                >
                  My Profile
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogoutClick}
                  className="w-full text-left hover:underline"
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;