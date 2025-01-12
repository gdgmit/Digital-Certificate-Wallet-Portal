import './App.css';
import  { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Navbar from './components/Navbar.jsx';
import DashboardPage from './pages/DashboardPage.jsx'; 
import MyCertificatesPage from './pages/MyCertificatesPage.jsx';
import MyProfile from "./pages/MyProfile.jsx";
import Certificate from './pages/Certificate';

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
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/certificate" element={<Certificate />} />
        </Routes>
    </Router>
  );
}


export default App;