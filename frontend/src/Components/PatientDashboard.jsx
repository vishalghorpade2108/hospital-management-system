import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FaFlask, FaClipboardList, FaNotesMedical, FaComments } from "react-icons/fa";

// Import components
import Appointments from "./Appointments";
import ChangePassword from "./ChangePassword";
import MedicalHistory from "./MedicalHistory";
import FeedbackSection from "./FeedbackSection";
import BookAppointment from "./BookAppointment";

export default function PatientDashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Loading...");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch username by ID stored in localStorage
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.warn("No userId found in localStorage");
          navigate("/login/patient");
          return;
        }
     
        const response = await fetch(`http://localhost:5000/patient/getpatientname/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setUserName(data.name || "Patient");
        } else {
          console.error("Error fetching user:", data.message);
          setUserName("Unknown User");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setUserName("Error loading user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login/patient");
  };

  return (
    <div className="flex min-h-screen bg-gray-50 mt-3">
      {/* Sidebar */}
      <Sidebar
        userName={loading ? "Loading..." : userName}
        onLogout={handleLogout}
        onSelect={(section) =>
          navigate(section === "home" ? "/patient" : `/patient/${section}`)
        }
      />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Routes>
          {/* Home Section */}
          <Route
            path="/"
            element={
              <>
                {/* Search Bar */}
                <div className="flex justify-end mb-6">
                  <input
                    type="text"
                    placeholder="Enter doctor name to search medical history"
                    className="border border-gray-300 p-3 text-lg rounded-l-md w-96 focus:outline-none"
                  />
                  <button className="bg-[#00ab9f] text-white px-5 text-lg rounded-r-md mr-10 hover:bg-[#008b7a]">
                    🔍
                  </button>
                </div>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <DashboardCard
                    icon={<FaClipboardList size={32} />}
                    title="My Appointments"
                    count="39"
                    onClick={() => navigate("/patient/appointments")}
                  />
                  <DashboardCard
                    icon={<FaNotesMedical size={32} />}
                    title="Medical History"
                    count="0"
                    onClick={() => navigate("/patient/medical")}
                  />
                  <DashboardCard
                    icon={<FaFlask size={32} />}
                    title="Lab Results"
                    count="3"
                    onClick={() => navigate("/patient/book")}
                  />
                  <DashboardCard
                    icon={<FaComments size={32} />}
                    title="Feedback Report"
                    count="1"
                    onClick={() => navigate("/patient/feedback")}
                  />
                </div>
              </>
            }
          />

          {/* Other Sections */}
          <Route path="appointments" element={<Appointments />} />
          <Route path="book" element={<BookAppointment />} />
          <Route path="medical" element={<MedicalHistory />} />
          <Route path="password" element={<ChangePassword />} />
          <Route path="feedback" element={<FeedbackSection />} />
        </Routes>
      </div>
    </div>
  );
}

// Small reusable card component
function DashboardCard({ icon, title, count, onClick }) {
  return (
    <div
      className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="text-[#00ab9f]">{icon}</div>
        <h3 className="font-semibold text-xl">{title}</h3>
        <p className="text-gray-500 text-base">
          Total {title} = {count}
        </p>
        <button className="bg-[#00ab9f] text-white px-6 py-3 text-lg rounded hover:bg-[#008b7a]">
          Click Here
        </button>
      </div>
    </div>
  );
}
