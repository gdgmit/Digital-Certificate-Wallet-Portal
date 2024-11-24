import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CourseCertificateComponent from "./components/CertificateTemplates/CourseCertificateComponent";
import EventCertificateComponent from "./components/CertificateTemplates/EventCertificateComponent";
import WorkShopCertificateComponent from "./components/CertificateTemplates/WorkShopCertificateComponent";
import studentsData from "./data/certificate_data.json";
function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/course" element={<CourseCertificateComponent 
            certificateData={studentsData[0].certificates[1]}
            regno={studentsData[0].regno}
            year={studentsData[0].year}
            dept={studentsData[0].dept}
            studentName={studentsData[0].st_name}
            />}
         />
        <Route path="/event" element={<EventCertificateComponent 
            studentName={studentsData[1].st_name}
            regno={studentsData[1].regno}
            year={studentsData[1].year}
            dept={studentsData[1].dept}
            certificateData={studentsData[1].certificates[0]}
            />} 
        />
        <Route path="/workshop" element={<WorkShopCertificateComponent 
            studentName={studentsData[0].st_name} 
            regno={studentsData[0].regno}
            year={studentsData[0].year}
            dept={studentsData[0].dept}
            certificateData={studentsData[0].certificates[0]}
          />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;