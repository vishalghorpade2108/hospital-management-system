import React, { useEffect, useState } from "react";

const MedicalHistory = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        const pid = localStorage.getItem("userId");
        const response = await fetch(
          "https://hospital-management-system-qhz9.onrender.com/medical/patient",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pid }),
          }
        );

        const data = await response.json();
        if (data.success) {
          setRecords(data.medicals);
        } else {
          console.error("Failed to fetch medical history");
        }
      } catch (error) {
        console.error("Error fetching medical history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalHistory();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-[#00ab9f]">
        🩺 My Medical History
      </h2>

      {loading ? (
        <div className="text-center text-lg text-gray-600 mt-10">
          ⏳ Loading your medical history...
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
          <table className="min-w-full text-sm sm:text-base text-left border border-gray-200">
            <thead className="bg-blue-100 text-gray-700 uppercase text-sm sm:text-base">
              <tr>
                <th className="px-4 py-3 border">#</th>
                <th className="px-4 py-3 border">Doctor Name</th>
                <th className="px-4 py-3 border">Disease</th>
                <th className="px-4 py-3 border">Prescription</th>
                <th className="px-4 py-3 border">BP</th>
                <th className="px-4 py-3 border">Sugar</th>
                <th className="px-4 py-3 border">Temp (°C)</th>
                <th className="px-4 py-3 border">Weight (kg)</th>
                <th className="px-4 py-3 border">Date</th>
                <th className="px-4 py-3 border">Next Visit</th>
              </tr>
            </thead>

            <tbody>
              {records.length > 0 ? (
                records.map((rec, index) => (
                  <tr
                    key={rec._id}
                    className="hover:bg-blue-50 transition duration-200 text-gray-700"
                  >
                    <td className="px-4 py-2 border text-center">{index + 1}</td>
                    <td className="px-4 py-2 border">{rec.dname}</td>
                    <td className="px-4 py-2 border">{rec.disease}</td>
                    <td className="px-4 py-2 border whitespace-pre-line">
                      {rec.prescription}
                    </td>
                    <td className="px-4 py-2 border text-center">{rec.bp}</td>
                    <td className="px-4 py-2 border text-center">{rec.sugar}</td>
                    <td className="px-4 py-2 border text-center">{rec.temperature}</td>
                    <td className="px-4 py-2 border text-center">{rec.weight}</td>
                    <td className="px-4 py-2 border text-center">
                      {rec.date
                        ? new Date(rec.date).toLocaleDateString("en-GB")
                        : new Date(rec.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-4 py-2 border text-center">{rec.nextvisit}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="10"
                    className="text-center text-gray-500 py-6 border"
                  >
                    No medical history found.
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

export default MedicalHistory;
