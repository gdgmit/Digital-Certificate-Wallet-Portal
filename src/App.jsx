import React from "react";
import NavBar from "./components/NavBar";
import DownloadButtons from "./components/DownloadButton";
import PDFViewer from "./components/PDFViewer";

function App(){
  return (
    <div>
      <NavBar></NavBar>
      <div className="container mt-5">
        <h1 className="text-center mb-4">View and Download PDF or PNG</h1>
        <PDFViewer></PDFViewer>
        <DownloadButtons></DownloadButtons>
      </div>
    </div>
  );
};

export default App;