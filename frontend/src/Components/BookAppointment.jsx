import React, { useState, useEffect } from "react";

const BookAppointment = () => {
  const pid = localStorage.getItem("userId");
console.log("Logged in user id:", pid);
  const [specialization, setSpecialization] = useState("");
  const [doctor, setDoctor] = useState("");
  const [doctorId, setDoctorId] = useState(""); // store did
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const specializations = [
    "Orthopedics", "Internal Medicine", "Obstetrics and Gynecology", "Dermatology",
    "Pediatrics", "Radiology", "General Surgery", "Ophthalmology", "Anesthesia",
    "Pathology", "Endocrinologists", "Neurologists"
  ];

  // Generate slots from 9:00 AM to 5:00 PM
  const generateTimeSlots = () => {
    const slots = [];
    let start = new Date();
    start.setHours(9, 0, 0, 0);
    let end = new Date();
    end.setHours(17, 0, 0, 0);
    while (start < end) {
      const hours = start.getHours().toString().padStart(2, "0");
      const minutes = start.getMinutes().toString().padStart(2, "0");
      slots.push(`${hours}:${minutes}`);
      start.setMinutes(start.getMinutes() + 30);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Fetch doctors by specialization
  useEffect(() => {
    if (!specialization) {
      setDoctors([]);
      setDoctor("");
      setDoctorId("");
      return;
    }

    const fetchDoctors = async () => {
      try {
        const res = await fetch(`https://hospital-management-system-qhz9.onrender.com/doctor/${specialization}`);
        const data = await res.json();
        if (data.success && Array.isArray(data.doctors)) {
          setDoctors(data.doctors);
        } else {
          setDoctors([]);
        }
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setDoctors([]);
      }
    };

    fetchDoctors();
  }, [specialization]);

  // Fetch appointment count and set next available time
  useEffect(() => {
    const fetchAppointmentCount = async () => {
       if (!doctorId || !date) return;

      try {

         const res = await fetch(`https://hospital-management-system-qhz9.onrender.com/appointment/appointmentbydate`,
       {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
           },
           body:JSON.stringify({doctorId,date})
       }
      );

       
        const data = await res.json();

        if (data.success) {
          const count = data.totalAppointments;
          console.log(count)
          if (count < timeSlots.length) {
            setTime(timeSlots[count]); // Automatically set next available time
          } else {
            setTime("");
            alert("All time slots are full for this date.");
          }
        }
      } catch (err) {
        console.error("Error fetching appointment count:", err);
      }
    };

    fetchAppointmentCount();
  }, [doctorId, date, timeSlots]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log({ specialization, doctor, doctorId, date, time, pid });

  try {
    const res = await fetch("https://hospital-management-system-qhz9.onrender.com/appointment/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pid, doctorId, date, time, specialization }),
    });

    const data = await res.json(); 

    if (data.success) {
      alert("Booking successful!");
      setSpecialization("");
      setDoctor("");
      setDoctorId("");
      setDate("");
      setTime("");
      setDoctors([]);

    } else {
      alert("Booking failed: " + (data.message || "Unknown error"));
    }
  } catch (error) {
    console.log("Error while submitting form data:", error.message);
  }
};


  return (
    <div className="max-w-lg mx-auto mt-6 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold text-[#00ab9f] mb-4">Book Appointment</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Specialization */}
        <div>
          <label className="block font-medium mb-1">Select Specialization</label>
          <select
            className="w-full border border-gray-300 rounded p-2"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            required
          >
            <option value="">Select Specialization</option>
            {specializations.map((spec, i) => (
              <option key={i} value={spec}>{spec}</option>
            ))}
          </select>
        </div>

        {/* Doctor */}
        <div>
          <label className="block font-medium mb-1">Select Doctor</label>
          <select
            className="w-full border border-gray-300 rounded p-2"
            value={doctor}
            onChange={(e) => {
              const selectedDoc = doctors.find(d => d.name === e.target.value);
              setDoctor(e.target.value);
              setDoctorId(selectedDoc ? selectedDoc._id : "");
            }}
            required
            disabled={!specialization}
          >
            <option value="">Select Doctor</option>
            {doctors.length > 0 ? (
              doctors.map((doc) => (
                <option key={doc._id} value={doc.name}>
                  {doc.name} — Fees ₹{doc.fees}
                </option>
              ))
            ) : (
              <option value="">No doctors found</option>
            )}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block font-medium mb-1">Select Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded p-2"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {/* Auto Time Slot Display */}
        <div>
          <label className="block font-medium mb-1">Assigned Time Slot</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2 bg-gray-100"
            value={time ? `${time}` : ""}
            readOnly
            placeholder="Select doctor and date to get time slot"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#00ab9f] text-white font-semibold py-2 rounded hover:bg-[#008b7a]"
          disabled={!time}
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
