import React, { useEffect, useState } from "react";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("https://hospital-management-system-qhz9.onrender.com/doctor/all"); // adjust API endpoint if needed
        const data = await response.json();

        if (data.success) {
          setDoctors(data.doctors);
        } else {
          console.error("Failed to fetch doctors");
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#00ab9f]">
        All Doctors
      </h2>

      {loading ? (
        <div className="text-center text-lg text-gray-600 mt-10">
          ⏳ Loading doctors list...
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
          <table className="min-w-full text-sm text-left border border-gray-200">
            <thead className="bg-blue-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="px-4 py-3 border">#</th>
                <th className="px-4 py-3 border">Name</th>
                <th className="px-4 py-3 border">Email</th>
                <th className="px-4 py-3 border">Specialization</th>
                <th className="px-4 py-3 border">Fees</th>
              </tr>
            </thead>
            <tbody>
              {doctors.length > 0 ? (
                doctors.map((doc, index) => (
                  <tr
                    key={doc._id}
                    className="hover:bg-blue-50 transition duration-200"
                  >
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{doc.name}</td>
                    <td className="px-4 py-2 border">{doc.email}</td>
                    <td className="px-4 py-2 border">{doc.specialization}</td>
                    <td className="px-4 py-2 border">₹{doc.fees}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center text-gray-500 py-6 border"
                  >
                    No doctors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
