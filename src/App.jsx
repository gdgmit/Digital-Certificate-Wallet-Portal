import React from "react";
import "./App.css";
import { Navbar } from "./components/NavBar";
import { RoutesComponent } from "./Routes";

function App() {
  return (
    <div className="App">
      <Navbar />
      <RoutesComponent />
    </div>
  );
}

export default App;
