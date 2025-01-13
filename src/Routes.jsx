import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, About, Contact, PDFViewer } from "./components/pages/index";

export const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/certificates" element={<PDFViewer />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};
