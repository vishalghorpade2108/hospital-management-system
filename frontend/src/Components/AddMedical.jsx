import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
export default function AddMedical() {
  const location = useLocation();
  const { appointment } = location.state || {};
const navigate=useNavigate()
  const [formData, setFormData] = useState({
    bp: "",
    sugar: "",
    temperature: "",
    weight: "",
    disease: "",
    nextVisit: "",
    prescription: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const did = localStorage.getItem("doctorId"); // 👈 get doctor ID from localStorage

  // Prepare the data to send
  const dataToSend = {
    ...formData,
    aid: appointment._id,
    pid: appointment.pid,
    did: did, // use doctor ID from localStorage
   
  };

  console.log("Submitted:", dataToSend);

  try {
    const response = await fetch("https://hospital-management-system-qhz9.onrender.com/medical/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Medical record added successfully!");
       navigate("/doctor/appointments");

      setFormData({
        bp: "",
        sugar: "",
        temperature: "",
        weight: "",
        disease: "",
        nextVisit: "",
        prescription: "",
      });

    } else {
      alert(result.message || "Failed to save medical record");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong while saving medical record");
  }
};


  return (
    <div className="flex min-h-screen bg-gray-50">
    
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold text-[#00ab9f] mb-6 text-center">
          Patient Medical Details
        </h2>

        {appointment ? (
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">
                Patient Information
              </h3>
              <p><strong>Name:</strong> {appointment.pname}</p>
              <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString("en-GB")}</p>
              <p><strong>Time:</strong> {appointment.time}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="bp"
                  placeholder="Blood Pressure"
                  value={formData.bp}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                />
                <input
                  type="text"
                  name="sugar"
                  placeholder="Blood Sugar"
                  value={formData.sugar}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                />
                <input
                  type="text"
                  name="temperature"
                  placeholder="Body Temperature"
                  value={formData.temperature}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                />
                <input
                  type="text"
                  name="weight"
                  placeholder="Weight (kg)"
                  value={formData.weight}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>

              <input
                type="text"
                name="disease"
                placeholder="Name of Disease"
                value={formData.disease}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              />

              <select
                name="nextVisit"
                value={formData.nextVisit}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              >
                <option value="">Select Next Visit</option>
                <option value="1 month">After 1 Month</option>
                <option value="2 months">After 2 Months</option>
                <option value="3 months">After 3 Months</option>
                <option value="no need">No Need</option>
              </select>

              <textarea
                name="prescription"
                placeholder="Prescription"
                value={formData.prescription}
                onChange={handleChange}
                className="border p-2 rounded w-full h-24"
                required
              />

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-[#00ab9f] text-white px-6 py-2 rounded hover:bg-[#009b8e] transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        ) : (
          <p className="text-center text-gray-500">No appointment selected.</p>
        )}
      </div>
    </div>
  );
}
