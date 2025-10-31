import React, { useEffect, useState } from "react";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch appointments from backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const pid = localStorage.getItem("userId");
        const response = await fetch(
          "https://hospital-management-system-qhz9.onrender.com/appointment/user",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pid }),
          }
        );

        const data = await response.json();
        if (data.success) {
          setAppointments(data.appointments);
        } else {
          console.error("Failed to fetch appointments");
        }
      } catch (error) {
        console.log("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Delete appointment
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?"))
      return;

    try {
      const response = await fetch(
        `https://hospital-management-system-qhz9.onrender.com/appointment/delete/${id}`,
        { method: "DELETE" }
      );

      const data = await response.json();
      if (data.success) {
        alert("Appointment deleted successfully");
        setAppointments(appointments.filter((appt) => appt._id !== id));
      } else {
        alert("Failed to delete appointment");
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#00ab9f]">
        My Appointments
      </h2>

      {/* Loading state */}
      {loading ? (
        <div className="text-center text-lg text-gray-600 mt-10">
          ⏳ Loading your appointments...
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white w-full max-w-full">
          <div className="min-w-[600px] sm:min-w-full">
            <table className="w-full text-left border border-gray-200 text-xs sm:text-sm">
              <thead className="bg-blue-100 text-gray-700 uppercase">
                <tr>
                  <th className="px-2 sm:px-4 py-3 border">#</th>
                  <th className="px-2 sm:px-4 py-3 border">Doctor Name</th>
                  <th className="px-2 sm:px-4 py-3 border">Specialization</th>
                  <th className="px-2 sm:px-4 py-3 border">Date</th>
                  <th className="px-2 sm:px-4 py-3 border">Time</th>
                  <th className="px-2 sm:px-4 py-3 border">Fees</th>
                  <th className="px-2 sm:px-4 py-3 border">Status</th>
                  <th className="px-2 sm:px-4 py-3 border text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {appointments.length > 0 ? (
                  appointments.map((appt, index) => (
                    <tr
                      key={appt._id}
                      className="hover:bg-blue-50 transition duration-200"
                    >
                      <td className="px-2 sm:px-4 py-2 border text-center">
                        {index + 1}
                      </td>
                      <td className="px-2 sm:px-4 py-2 border">{appt.dname}</td>
                      <td className="px-2 sm:px-4 py-2 border">
                        {appt.specialization}
                      </td>
                      <td className="px-2 sm:px-4 py-2 border">
                        {new Date(appt.date).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-2 sm:px-4 py-2 border">{appt.time}</td>
                      <td className="px-2 sm:px-4 py-2 border">
                        ₹{appt.fees}
                      </td>
                      <td className="px-2 sm:px-4 py-2 border text-center">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            appt.status === "Processed"
                              ? "bg-green-100 text-green-700"
                              : appt.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {appt.status}
                        </span>
                      </td>
                      <td className="px-2 sm:px-4 py-2 border text-center">
                        <button
                          onClick={() => handleDelete(appt._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs sm:text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center text-gray-500 py-6 border"
                    >
                      No appointments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
