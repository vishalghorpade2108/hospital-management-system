import React, { useState } from "react";
import {
  FaHome,
  FaUserMd,
  FaLock,
  FaCommentDots,
  FaBars,
  FaUsers,
} from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { BsFileMedical } from "react-icons/bs";

export default function AdminSidebar({ userName, onLogout, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

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
        {/* Top Section */}
        <div>
          <h2 className="text-2xl font-bold text-[#00ab9f] mb-8 hidden md:block">
            Welcome {userName}
          </h2>

          <ul className="space-y-5 text-lg font-medium">
            <li
              className="flex items-center gap-4 text-[#00ab9f] hover:text-[#008b7a] cursor-pointer"
              onClick={() => {
                onSelect("home");
                setIsOpen(false);
              }}
            >
              <FaHome size={22} /> Home
            </li>

            <li
              className="flex items-center gap-4 text-[#00ab9f] hover:text-[#008b7a] cursor-pointer"
              onClick={() => {
                onSelect("doctors");
                setIsOpen(false);
              }}
            >
              <FaUserMd size={22} /> All Doctors
            </li>

            <li
              className="flex items-center gap-4 text-[#00ab9f] hover:text-[#008b7a] cursor-pointer"
              onClick={() => {
                onSelect("patients");
                setIsOpen(false);
              }}
            >
              <FaUsers size={22} /> All Patients
            </li>

            <li
              className="flex items-center gap-4 text-[#00ab9f] hover:text-[#008b7a] cursor-pointer"
              onClick={() => {
                onSelect("add-doctor");
                setIsOpen(false);
              }}
            >
              <BsFileMedical size={22} /> Add Doctor
            </li>

            <li
              className="flex items-center gap-4 text-[#00ab9f] hover:text-[#008b7a] cursor-pointer"
              onClick={() => {
                onSelect("password");
                setIsOpen(false);
              }}
            >
              <FaLock size={22} /> Change Password
            </li>

            <li
              className="flex items-center gap-4 text-[#00ab9f] hover:text-[#008b7a] cursor-pointer"
              onClick={() => {
                onSelect("feedback");
                setIsOpen(false);
              }}
            >
              <FaCommentDots size={22} /> Feedback
            </li>
          </ul>
        </div>

        {/* Logout */}
        <div
          className="flex items-center gap-4 text-red-600 font-semibold text-lg cursor-pointer hover:text-red-700 mt-8"
          onClick={onLogout}
        >
          <MdLogout size={22} /> Log out
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 h-screen bg-black opacity-30 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
