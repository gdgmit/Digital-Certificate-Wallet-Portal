import React, { useState } from "react";
import "./Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const studentId = "4a33e68a-642c-48ff-b444-211e1bd23b7f"; // Replace with actual student ID from context or state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/Digital-Certificate-Wallet-Portal"); // Redirect to the home page after logout
  };
  return (
    <nav>
      <Link to="/" className="title">
        <div className="flex items-center">
            <img
                src="/Digital-Certificate-Wallet-Portal/assets/gdgoc-logo.png"
                alt="MIT Logo"
                className="h-20 mr-2"
            />
            <span className="text-2xl font-bold">Digital Certificate Wallet</span>
        </div>

      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to={`/certificates/${studentId}`}>My Certificates</NavLink>
        </li>
        <li>
          <NavLink to="/validate">Search</NavLink>
        </li>
        {/* <li>
          <NavLink to="/validate">Validate</NavLink>
        </li> */}
        <li>
          <NavLink to={`/dashboard/${studentId}`}>Dashboard</NavLink>
        </li>
        {isAuthenticated ? (<li><button onClick={handleLogout}>Logout</button></li>
    ) : ( <li><NavLink to="/login">Login</NavLink></li>)} 
       
      </ul>
    </nav>
  );
};
