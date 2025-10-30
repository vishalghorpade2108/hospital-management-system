import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ Use React Router navigation (no full reload)
  const handleBookAppointment = () => {
    navigate("/login/patient");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <a href="/" className="text-2xl font-bold text-green-700">
          Tilekar Hospital
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          <ul className="flex space-x-6 text-gray-700 font-semibold">
            <li>
              <a href="/" className="hover:text-green-700">
                Home
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-green-700">
                Services
              </a>
            </li>
            <li>
              <a href="#aboutus" className="hover:text-green-700">
                About Us
              </a>
            </li>
            <li>
              <a href="#gallery" className="hover:text-green-700">
                Gallery
              </a>
            </li>
            <li>
              <a href="#contactus" className="hover:text-green-700">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#logins" className="hover:text-green-700">
                Login
              </a>
            </li>
          </ul>

          <div className="flex space-x-4">
            {/* ✅ Book Appointment Button */}
            <button
              onClick={handleBookAppointment}
              className="border border-green-600 text-green-600 px-4 py-2 rounded-md hover:bg-green-600 hover:text-white transition"
            >
              Book Appointment
            </button>

            {/* Emergency Button */}
            <button
              onClick={() => navigate("/emergency")}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Emergency
            </button>
          </div>
        </div>

        {/* Toggle Button (Mobile Only) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-gray-800 focus:outline-none"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col space-y-2 px-6 py-3 text-gray-700 font-semibold">
          <li>
            <a href="/" className="block hover:text-green-700">
              Home
            </a>
          </li>
          <li>
            <a href="#services" className="block hover:text-green-700">
              Services
            </a>
          </li>
          <li>
            <a href="#aboutus" className="block hover:text-green-700">
              About Us
            </a>
          </li>
          <li>
            <a href="#gallery" className="block hover:text-green-700">
              Gallery
            </a>
          </li>
          <li>
            <a href="#contactus" className="block hover:text-green-700">
              Contact Us
            </a>
          </li>
          <li>
            <a href="#logins" className="block hover:text-green-700">
              Login
            </a>
          </li>
        </ul>

        <div className="flex flex-col space-y-2 px-6 pb-4">
          <button
            onClick={() => {
              setIsOpen(false);
              handleBookAppointment();
            }}
            className="border border-green-600 text-green-600 px-4 py-2 rounded-md hover:bg-green-600 hover:text-white transition"
          >
            Book Appointment
          </button>

          <button
            onClick={() => {
              setIsOpen(false);
              navigate("/emergency");
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            Emergency
          </button>
        </div>
      </div>
    </nav>
  );
}