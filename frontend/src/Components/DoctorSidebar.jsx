import React, { useState } from "react";
import {
  FaHome,
  FaCalendarCheck,
  FaLock,
  FaComments,
  FaBars,
  FaNotesMedical,
  FaUserInjured,
} from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { BsFileEarmarkMedical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function DoctorSidebar({ doctorName, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[#00ab9f] focus:outline-none bg-white p-2 rounded shadow"
        >
          <FaBars size={26} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-md p-6 flex flex-col justify-between
        transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:flex`}
      >
        <div>
          <h2 className="text-2xl font-bold text-[#00ab9f] mb-8 hidden md:block">
            {doctorName}
          </h2>

          <ul className="space-y-5 text-lg font-medium">
            <li
              className="flex items-center gap-4 text-[#00ab9f] hover:text-[#008b7a] cursor-pointer"
              onClick={() => handleNavigation("/doctor")}
            >
              <FaHome size={22} /> Dashboard
            </li>

            <li
              className="flex items-center gap-4 text-[#00ab9f] hover:text-[#008b7a] cursor-pointer"
              onClick={() => handleNavigation("/doctor/appointments")}
            >
              <FaCalendarCheck size={22} /> Appointments
            </li>

            <li
              className="flex items-center gap-4 text-[#00ab9f] hover:text-[#008b7a] cursor-pointer"
              onClick={() => handleNavigation("/doctor/patients")}
            >
              <FaUserInjured size={22} /> My Patients
            </li>

         
            <li
              className="flex items-center gap-4 text-[#00ab9f] hover:text-[#008b7a] cursor-pointer"
              onClick={() => handleNavigation("/doctor/reports")}
            >
              <BsFileEarmarkMedical size={22} /> Reports
            </li>

            <li
              className="flex items-center gap-4 text-[#00ab9f] hover:text-[#008b7a] cursor-pointer"
              onClick={() => handleNavigation("/doctor/feedback")}
            >
              <FaComments size={22} /> Feedback
            </li>

            <li
              className="flex items-center gap-4 text-[#00ab9f] hover:text-[#008b7a] cursor-pointer"
              onClick={() => handleNavigation("/doctor/password")}
            >
              <FaLock size={22} /> Change Password
            </li>
          </ul>
        </div>

        <div
          className="flex items-center gap-4 text-red-600 font-semibold text-lg cursor-pointer hover:text-red-700 mt-8"
          onClick={onLogout}
        >
          <MdLogout size={22} /> Log out
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 h-screen bg-black opacity-30 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
