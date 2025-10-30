import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ userType, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:5000/${userType}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      // ✅ Save token and userId
      localStorage.setItem("token", data.token);

      if (userType === "patient") {
        localStorage.setItem("userId", data.patient.id);
        navigate("/patient/");
      } else if (userType === "doctor") {
        localStorage.setItem("doctorId", data.doctor.id);
        localStorage.setItem("doctorEmail",data.doctor.email);
        navigate("/doctor/");
      }else  if (userType === "admin") {
         navigate("/admin/");
      }

      alert(`${userType} logged in successfully!`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-2 capitalize text-center text-[#00ab9f]">
        {userType} Login
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Please enter your email and password to log in.
      </p>

      {error && <p className="text-red-500 mb-3 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block mb-1 font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#00ab9f]"
          />
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block mb-1 font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#00ab9f]"
          />
        </div>

        <button
          type="submit"
          className="bg-[#00ab9f] text-white py-2 rounded hover:bg-[#008b7a] transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Show Register link only for patients */}
      {userType === "patient" && (
        <p className="text-center text-gray-600 mt-4">
          Don't have an account yet?{" "}
          <span
            className="text-[#00ab9f] font-semibold cursor-pointer hover:underline"
            onClick={onRegister}
          >
            Register Now
          </span>
        </p>
      )}
    </div>
  );
}
