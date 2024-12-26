import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import CertificatesPage from './pages/CertificatesPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Certificates Page */}
        <Route path="/certificates/:st_id" element={<CertificatesPage />} />

        {/* Redirect from root route to /certificates/:st_id */}
        <Route path="/" element={<Navigate to="/certificates/123" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
