import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./DoctorSidebar";
import {
  FaClipboardList,
  FaNotesMedical,
  FaCalendarCheck,
} from "react-icons/fa";
import AppointmentsForDoctor from "./AppointmentsForDoctor";
import AddMedical from "./AddMedical";

export default function DoctorDashboard() {
  const [doctorName, setDoctorName] = useState("");
  const [stats] = useState({
    totalTreatments: 70,
    todaysAppointments: 19,
    totalPatients:100
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("doctorToken");
    localStorage.removeItem("doctorEmail");
    localStorage.removeItem("doctorId");
    navigate("/login/doctor");
  };

  useEffect(() => {
    const fetchDoctorDashboard = async () => {
      try {
        const doctorId = localStorage.getItem("doctorId");
        if (!doctorId) return;

        const doctorRes = await fetch(`http://localhost:5000/doctor/getdoctorname/${doctorId}`);
        const doctorData = await doctorRes.json();
        setDoctorName(doctorData.name);
      } catch (error) {
        console.error("Error fetching doctor dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDashboard();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 mt-3">
      <Sidebar doctorName={doctorName || "Doctor"} onLogout={handleLogout} />

      <div className="flex-1 p-6 overflow-auto">
        <Routes>
          {/* Dashboard Home */}
          <Route
            path="/"
            element={
              <>
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-800">
                    Doctor Dashboard
                  </h1>
                  <span className="text-[#00ab9f] font-semibold text-xl">
                    Welcome, {doctorName || "Doctor"}
                  </span>
                </div>

                {loading ? (
                  <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#00ab9f]"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                     <DashboardCard
                      icon={<FaCalendarCheck size={32} />}
                      title="Today's Appointments"
                      count={stats.todaysAppointments}
                      link="/doctor/today"
                    />
                    <DashboardCard
                      icon={<FaNotesMedical size={32} />}
                      title="Total Treatments"
                      count={stats.totalTreatments}
                      link="/doctor/prescriptions"
                    />
                    <DashboardCard
                      icon={<FaCalendarCheck size={32} />}
                      title="Total Patients"
                      count={stats.totalPatients}
                      link="/doctor/today"
                    />
                  </div>
                )}
              </>
            }
          />

          {/* Nested Routes */}
          <Route path="appointments" element={<AppointmentsForDoctor />} />
           <Route path="addMedical" element={<AddMedical />} />
         
          <Route path="patients" element={<p className="text-lg text-gray-600">My Patients</p>} />
          <Route
            path="reports"
            element={<p className="text-lg text-gray-600">Reports Page</p>}
          />
          <Route
            path="feedback"
            element={<p className="text-lg text-gray-600">Feedback Page</p>}
          />
          <Route
            path="password"
            element={<p className="text-lg text-gray-600">Change Password</p>}
          />
        </Routes>
      </div>
    </div>
  );
}

function DashboardCard({ icon, title, count, link }) {
  return (
    <a
      href={link}
      className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all text-center flex flex-col items-center"
    >
      <div className="text-[#00ab9f] mb-4">{icon}</div>
      <h3 className="font-semibold text-xl text-gray-800">{title}</h3>
      <p className="text-gray-500 text-base mt-1">Total: {count}</p>
      <button className="mt-4 bg-[#00ab9f] text-white px-6 py-2 rounded-lg text-lg hover:bg-[#008b7a] transition">
        View Details
      </button>
    </a>
  );
}
