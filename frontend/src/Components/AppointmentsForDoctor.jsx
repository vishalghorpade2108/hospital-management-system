import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AppointmentsForDoctor() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const did = localStorage.getItem("doctorId");
        const response = await fetch(
          `https://hospital-management-system-qhz9.onrender.com/appointment/appointmentbydr?did=${did}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await response.json();
        if (data.success) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const tomorrow = new Date(today);
          tomorrow.setDate(today.getDate() + 1);

          const todaysAppointments = data.appointments.filter((appt) => {
            const apptDate = new Date(appt.date);
            return apptDate >= today && apptDate < tomorrow;
          });

          setAppointments(todaysAppointments);
        } else {
          console.error("Failed to fetch appointments");
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleAddMedical = (appt) => {
    navigate("/doctor/addmedical", { state: { appointment: appt } });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#00ab9f]">
        My Appointments
      </h2>

      {loading ? (
        <div className="text-center text-lg text-gray-600 mt-10">
          ⏳ Loading your appointments...
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
          <table className="min-w-full text-sm text-left border border-gray-200">
            <thead className="bg-blue-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="px-4 py-3 border">#</th>
                <th className="px-4 py-3 border">Patient Name</th>
                <th className="px-4 py-3 border">Date</th>
                <th className="px-4 py-3 border">Time</th>
                <th className="px-4 py-3 border text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((appt, index) => (
                  <tr
                    key={appt._id}
                    className="hover:bg-blue-50 transition duration-200"
                  >
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{appt.pname}</td>
                    <td className="px-4 py-2 border">
                      {new Date(appt.date).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-4 py-2 border">{appt.time}</td>
                    <td className="px-4 py-2 border text-center">
                      {appt.status === "pending" ? (
                        <button
                          onClick={() => handleAddMedical(appt)}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                          Add Medical
                        </button>
                      ) : (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm font-medium">
                          Processed
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center text-gray-500 py-6 border"
                  >
                    No appointments found for today.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
