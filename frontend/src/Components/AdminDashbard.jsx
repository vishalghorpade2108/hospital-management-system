import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./AdminSidebar";
import { FaCalendarCheck, FaUserMd, FaUsers, FaComments, FaPlus } from "react-icons/fa";
import AddDoctor from "./AddDoctor";
import Doctors from "./Doctors";
import PatientList from "./PatientList";

export default function AdminDashboard() {
  const navigate = useNavigate();

  // 🧮 Static counts (hardcoded)
  const counts = {
    todaysAppointments: 8,
    doctors: 15,
    patients: 120,
    feedback: 25,
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login/admin");
  };

  return (
    <div className="flex min-h-screen bg-gray-50 mt-3">
      {/* Sidebar */}
      <Sidebar
        userName="Admin Panel"
        onLogout={handleLogout}
        onSelect={(section) =>
          navigate(section === "home" ? "/admin" : `/admin/${section}`)
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
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Admin Dashboard
                </h2>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {/* 🔹 Card 1: Today’s Appointments */}
                  <DashboardCard
                    icon={<FaCalendarCheck size={36} />}
                    title="Today's Appointments"
                    count={counts.todaysAppointments}
                    buttonText="View Appointments"
                    onClick={() => navigate("/admin/appointments")}
                  />

                  {/* 🔹 Card 2: Total Doctors */}
                  <DashboardCard
                    icon={<FaUserMd size={36} />}
                    title="Total Doctors"
                    count={counts.doctors}
                    buttonText="View Doctors"
                    onClick={() => navigate("/admin/doctors")}
                  />

                  {/* 🔹 Card 3: Total Patients */}
                  <DashboardCard
                    icon={<FaUsers size={36} />}
                    title="Total Patients"
                    count={counts.patients}
                    buttonText="View Patients"
                    onClick={() => navigate("/admin/patients")}
                  />

                  {/* 🔹 Card 4: Total Feedback */}
                  <DashboardCard
                    icon={<FaComments size={36} />}
                    title="Total Feedback"
                    count={counts.feedback}
                    buttonText="View Feedback"
                    onClick={() => navigate("/admin/feedback")}
                  />
                </div>

                {/* 🔹 Add Doctor Section */}
                <div className="bg-white shadow-lg rounded-xl p-8 flex items-center justify-between border border-gray-200">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Register a new doctor
                    </h3>
                    <p className="text-gray-500 text-base">
                      Add doctor details including name, specialization, and contact information.
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("/admin/add-doctor")}
                    className="flex items-center gap-2 bg-[#00ab9f] text-white px-6 py-3 rounded-lg text-lg hover:bg-[#008b7a]"
                  >
                    <FaPlus /> Add Doctor
                  </button>
                </div>
              </>
            }
          />

          {/* Other Routes */}
          <Route path="doctors" element={<Doctors />} />
          <Route path="patients" element={<PatientList />} />
          <Route path="feedback" element={<p>All feedback page</p>} />
          <Route path="add-doctor" element={<AddDoctor />} />
        </Routes>
      </div>
    </div>
  );
}

// 🔹 Reusable Card Component
function DashboardCard({ icon, title, count, buttonText, onClick }) {
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
          {buttonText}
        </button>
      </div>
    </div>
  );
}
