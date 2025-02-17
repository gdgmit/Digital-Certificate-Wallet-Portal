import { Routes, Route } from "react-router-dom";
import CourseCertificateComponent from "./components/CertificateTemplates/CourseCertificateComponent";
import EventCertificateComponent from "./components/CertificateTemplates/EventCertificateComponent";
import WorkShopCertificateComponent from "./components/CertificateTemplates/WorkShopCertificateComponent";
import CertificateDetails from "./components/PreviewComponents/CertificateDetails";
import jsonData from "./data/certificate_data.json";
import SearchComponent from "./components/Search";
import CertificateValidator from "./components/Search/Validate";
import ListOfCertificates from "./components/CertificatesList/certificatesPage";
import EditProfile from "./components/Dashboard/EditProfile";
import LoginPage from "./components/Login/LoginPage"; 
import HomePage from "./components/Home/HomePage"; // Import HomePage

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route
        path="course"
        element={
          <CourseCertificateComponent
            certificateData={jsonData[1]}
            studentName={jsonData[1].students[0].st_name}
          />
        }
      />
      <Route
        path="event"
        element={
          <EventCertificateComponent
            studentName={jsonData[2].students[0].st_name}
            certificateData={jsonData[2]}
          />
        }
      />
      <Route
        path="workshop"
        element={
          <WorkShopCertificateComponent
            studentName={jsonData[0].students[0].st_name}
            certificateData={jsonData[0]}
          />
        }
      />
      <Route path="login" element={<LoginPage />} />
      <Route path="certificates/:st_id" element={<ListOfCertificates />} />
      <Route path="certificates/:st_id/:cert_id" element={<CertificateDetails />} />
      <Route path="search" element={<SearchComponent />} />
      <Route path="validate" element={<CertificateValidator />} />
      <Route path="dashboard/:st_id" element={<EditProfile />} />
    </Routes>
  );
};

export default AppRoutes;
