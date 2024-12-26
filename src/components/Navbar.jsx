// src/components/Navbar.js
import React from 'react';

const Navbar = ({ showMenu, toggleMenu }) => {
  return (
    <nav
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform ${
        showMenu ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <ul className="space-y-6 text-center mt-20">
        <li>
          <a href="#" className="text-blue-900 font-semibold">
            My Certificates
          </a>
        </li>
        <li>
          <a href="#" className="text-black hover:text-blue-900">
            Dashboard
          </a>
        </li>
        <li>
          <a href="#" className="text-black hover:text-blue-900">
            Settings
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
