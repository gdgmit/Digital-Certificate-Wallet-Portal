import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import CourseCertificateComponent from "./components/CertificateTemplates/CourseCertificateComponent";
import EventCertificateComponent from "./components/CertificateTemplates/EventCertificateComponent";
import WorkShopCertificateComponent from "./components/CertificateTemplates/WorkShopCertificateComponent";
import studentsData from "./data/certificate_data.json";
function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/certificates/:st_id" element={<h1>Student Certificates Page</h1>} />
        <Route path="/certificates/:st_id/:cert_id" element={<h1>Individual Certificate Page</h1>} />
        <Route path="/dashboard/:st_id" element={<h1>Student Details Page</h1>} />
        <Route path="*" element={<NotFoundPage />} />

        // only for testing 
        <Route path="/course" element={<CourseCertificateComponent 
            certificateData={studentsData[0].certificates[1]}
            studentName={studentsData[0].st_name}
            />}
         />
        <Route path="/event" element={<EventCertificateComponent 
            studentName={studentsData[1].st_name}
            certificateData={studentsData[1].certificates[0]}
            />} 
        />
        <Route path="/workshop" element={<WorkShopCertificateComponent 
            studentName={studentsData[0].st_name} 
            certificateData={studentsData[0].certificates[0]}
          />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;