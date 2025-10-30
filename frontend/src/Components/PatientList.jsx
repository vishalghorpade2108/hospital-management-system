import React, { useEffect, useState } from "react";

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://localhost:5000/patient/allpatients");
        const data = await response.json();

        if (data.success) {
          setPatients(data.patients);
        } else {
          console.error("Failed to fetch patients");
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#00ab9f]">
        All Patients
      </h2>

      {loading ? (
        <div className="text-center text-lg text-gray-600 mt-10">
          ⏳ Loading patients list...
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
          <table className="min-w-full text-sm text-left border border-gray-200">
            <thead className="bg-blue-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="px-4 py-3 border">#</th>
                <th className="px-4 py-3 border">Name</th>
                <th className="px-4 py-3 border">Email</th>
                <th className="px-4 py-3 border">Mobile</th>
              </tr>
            </thead>
            <tbody>
              {patients.length > 0 ? (
                patients.map((p, index) => (
                  <tr
                    key={p._id}
                    className="hover:bg-blue-50 transition duration-200"
                  >
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{p.name}</td>
                    <td className="px-4 py-2 border">{p.email}</td>
                    <td className="px-4 py-2 border">{p.mobile}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center text-gray-500 py-6 border"
                  >
                    No patients found.
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

export default PatientsList;
