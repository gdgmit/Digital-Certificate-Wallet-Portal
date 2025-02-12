import { BrowserRouter as Router } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import AppRoutes from "./Routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
      basename="/Digital-Certificate-Wallet-Portal"
    >
      <Navbar />
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
