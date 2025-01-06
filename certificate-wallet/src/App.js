import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage'; 
import MyCertificatesPage from './pages/MyCertificatesPage';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Update login state when login is successful
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Update login state when logging out
  };

  return (
    <Router> {/* Ensure Router wraps the whole app */}
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/dashboard/:st_id" element={<DashboardPage />} />
        <Route path="/certificates/:st_id" element={<MyCertificatesPage />} />
        <Route path="/certificates/:st_id/:cert_id" element={<div>Certificate Detail</div>} />
      </Routes>
    </Router>
  );
}

export default App;