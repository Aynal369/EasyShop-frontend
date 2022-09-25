import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import MainUI from "./views/MainUI";
import Dashboard from "./views/Dashboard";
import ControlPanel from "./views/ControlPanel";
import Login from "./components/mainUI/pages/Login";
import Register from "./components/mainUI/pages/Register";
import AuthProvider from "./authentication/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainUI />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/create-a-new-account" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/control-panel" element={<ControlPanel />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AuthProvider>
  );
}

export default App;
