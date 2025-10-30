import React from "react";
import patientLoginImage from "./images/patientlogin.jpg";
import doctorLoginImage from "./images/doctorlogin.jpg";
import adminLoginImage from "./images/adminlogin.jpg";

export default function LoginPanel({ onSelectUser }) {
  const loginSections = [
    { title: "Patient Login", image: patientLoginImage, type: "patient" },
    { title: "Doctor Login", image: doctorLoginImage, type: "doctor" },
    { title: "Admin Login", image: adminLoginImage, type: "admin" },
  ];

  return (
    <section id="logins" className="py-12 bg-gray-50">
      <div className="max-w-8xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Login</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loginSections.map((section, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer"
              onClick={() => onSelectUser(section.type)} // Show LoginForm
            >
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-64 sm:h-65 object-cover"
              />
              <div className="absolute bottom-0 w-full bg-white/70 backdrop-blur-sm py-4 flex flex-col items-center">
                <h3 className="text-xl font-semibold text-gray-800">{section.title}</h3>
                <span className="mt-3 bg-[#00ab9f] text-white font-semibold px-6 py-2 rounded cursor-pointer">
                  Click Here
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
