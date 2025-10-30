import React, { useState } from "react";

export default function AddDoctor() {
  // Separate state variables for each field
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [fees, setFees] = useState("");
  
  const specializations = [
    "Orthopedics",
    "Internal Medicine",
    "Obstetrics and Gynecology",
    "Dermatology",
    "Pediatrics",
    "Radiology",
    "General Surgery",
    "Ophthalmology",
    "Anesthesia",
    "Pathology",
    "Endocrinologists",
    "Neurologists",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
   console.log(name,email,password,specialization,fees)
    
    try {
      const response = await fetch("http://localhost:5000/doctor/adddoctor", {
        method: "POST",
          headers: { "Content-Type": "application/json" },
        body: JSON.stringify({name,email,password,specialization,fees}),
      });

      const result = await response.json();
      alert(result.message || "Doctor added successfully!");

      // Reset all fields after submit
      setName("");
      setEmail("");
      setPassword("");
      setSpecialization("");
      setFees("");
      
    } catch (err) {
      console.error("Error adding doctor:", err);
      alert("Failed to add doctor");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl border-t-4 border-[#00ab9f]">
        <h2 className="text-2xl font-semibold text-center text-[#00ab9f] mb-6">
          Add Doctor
        </h2>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-5"
        >
          {/* Row 1: Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter doctor's name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00ab9f] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00ab9f] outline-none"
              />
            </div>
          </div>

          {/* Row 2: Password + Specialization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00ab9f] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Specialization
              </label>
              <select
                name="specialization"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-[#00ab9f] outline-none"
              >
                <option value="">Select Specialization</option>
                {specializations.map((spec, index) => (
                  <option key={index} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3: Fees + Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Consultation Fees
              </label>
              <input
                type="number"
                name="fees"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                required
                placeholder="Enter fees"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00ab9f] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Profile Image
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
    className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-[#00ab9f] outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#00ab9f] hover:bg-[#008b7a] text-white font-medium py-2 rounded-lg transition duration-200"
            >
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
