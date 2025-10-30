import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Scrolling from "./Components/Scrolling";
import LoginPanel from "./Components/LoginPanel";
import LoginForm from "./Components/LoginForm";
import PatientRegistration from "./Components/PatientRegistration";
import MedicalExperts from "./Components/MedicalExpert";
import Feedback from "./Components/Feedback";
import Footer from "./Components/Footer";
import PatientDashboard from "./Components/PatientDashboard";
import DoctorDashboard from "./Components/DoctorDashboard";
import AddMedical from "./Components/AddMedical";
import AdminDashbard from "./Components/AdminDashbard";
import Emergency from "./Components/Emergency";
function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Scrolling />
      <LoginPanel onSelectUser={(user) => navigate(`/login/${user}`)} />
      <MedicalExperts />
      <Feedback />
      <Footer />
    </>
  );
}

function LoginWrapper() {
  const navigate = useNavigate();
  const userType = window.location.pathname.split("/").pop(); // patient, doctor, admin

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <LoginForm
        userType={userType}
        onRegister={() => navigate("/register")}
        onLoginSuccess={() => navigate("/dashboard")}
      />
      <button
        className="mt-4 text-sm text-gray-500 underline"
        onClick={() => navigate("/")}
      >
        Back
      </button>
    </div>
  );
}

function RegisterWrapper() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <PatientRegistration onSuccess={() => navigate("/login/patient")} />
      <button
        className="mt-4 text-sm text-gray-500 underline"
        onClick={() => navigate("/")}
      >
        Back
      </button>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/:userType" element={<LoginWrapper />} />
        <Route path="/register" element={<RegisterWrapper />} />
        <Route path="/patient/*" element={<PatientDashboard />} /> 
        <Route path="/doctor/*" element={<DoctorDashboard />} />
        <Route path="/admin/*" element={<AdminDashbard />} />
          <Route path="/emergency" element={<Emergency />} />
     
        </Routes>
    </Router>
  );
}
