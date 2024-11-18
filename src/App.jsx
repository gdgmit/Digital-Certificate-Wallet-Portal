import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import CourseCertificateComponent from "./components/CertificateTemplates/CourseCertificateComponent";
import EventCertificateComponent from "./components/CertificateTemplates/EventCertificateComponent";
import WorkShopCertificateComponent from "./components/CertificateTemplates/WorkShopCertificateComponent";

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
            studentName="John" 
            courseName="GenAI Study Jam"
            date="12-11-2024"
            skills={["The Basics of Google Cloud Compute","Analyze Images with the Cloud Vision API","Prompt Design in Vertex AI"]}
            />}
         />
        <Route path="/event" element={<EventCertificateComponent 
            studentName="John"
            eventName="Ideathon"
            date="13-11-2024"
            />} 
        />
        <Route path="/workshop" element={<WorkShopCertificateComponent 
            studentName="John" 
            workshopName="Web Development Workshop" 
            date="14-11-2024" 
          />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;