import React from "react";
import { FaPhoneAlt, FaAmbulance, FaMapMarkerAlt, FaClock, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Emergency() {
  const navigate = useNavigate();

  return (
    <section id="emergency" className="bg-red-50 py-12 px-6 min-h-screen flex flex-col justify-between">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-red-700 mb-6">
          🚨 Emergency Services
        </h2>

        <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
          In case of any medical emergency, please reach out to our 24x7 support team.
          Our ambulance service is always ready to serve you quickly and safely.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Ambulance Service */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <FaAmbulance className="text-5xl text-red-600 mb-3" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Ambulance Service
            </h3>
            <p className="text-gray-600 mb-3">24x7 emergency ambulance available</p>
            <a
              href="tel:+911234567890"
              className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition"
            >
              Call Now: +91 12345 67890
            </a>
          </div>

          {/* Crain Service */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <FaPhoneAlt className="text-5xl text-red-600 mb-3" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Crain Service
            </h3>
            <p className="text-gray-600 mb-3">Available for emergency patient transfer</p>
            <a
              href="tel:+919876543210"
              className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition"
            >
              Call Now: +91 98765 43210
            </a>
          </div>

          {/* Hospital Info */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <FaMapMarkerAlt className="text-5xl text-red-600 mb-3" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Emergency Ward
            </h3>
            <p className="text-gray-600 mb-3">
              Tilekar Hospital, Near Main Road, Pune
            </p>
            <div className="flex items-center gap-2 text-gray-700">
              <FaClock />
              <span>Open 24x7</span>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Back Button Section */}
      <div className="text-center mt-12">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
        >
          <FaArrowLeft /> Back to Home
        </button>
      </div>
    </section>
  );
}
