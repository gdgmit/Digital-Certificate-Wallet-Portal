import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/NavBar";
import { About, Contact, Home, PDFViewer } from "./components/pages";


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/my certificates" element={<PDFViewer />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;