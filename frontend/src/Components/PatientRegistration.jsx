import React, { useState } from "react";
import LoginForm from "./LoginForm"; // make sure path is correct

export default function PatientRegistration({ onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/patient/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, mobile, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");

      alert("Patient registered successfully!");

      // Clear form
      setName("");
      setEmail("");
      setMobile("");
      setPassword("");

      // Call onSuccess to switch to login
      if (onSuccess) onSuccess();
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return (
    <div className="w-90 mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Patient Registration</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#00ab9f]"
        />
        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#00ab9f]"
        />
        {/* Mobile */}
        <input
          type="tel"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#00ab9f]"
        />
        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#00ab9f]"
        />

        <button
          type="submit"
          className="bg-[#00ab9f] text-white py-2 rounded hover:bg-[#008b7a]"
        >
          Register
        </button>
      </form>
    </div>
  );
}
