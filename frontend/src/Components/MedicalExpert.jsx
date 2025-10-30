import React from "react";

// Import images
import d1 from "./images/doctors/d1.jpeg";
import d2 from "./images/doctors/d2.jpg";
import d3 from "./images/doctors/d3.jpeg";
import d4 from "./images/doctors/d4.jpeg";
import d5 from "./images/doctors/d5.jpeg";
import d7 from "./images/doctors/d7.jpeg";
import d8 from "./images/doctors/d8.jpeg";
import d10 from "./images/doctors/d10.jpeg";
import d11 from "./images/doctors/d11.jpeg";

const doctors = [
  { image: d1, name: "Dr. Gaurav Jadhav", specialization: "Cardiologist" },
  { image: d2, name: "Dr. Vaishnavi Magar", specialization: "Neurologist" },
  { image: d3, name: "Dr. Sai Tanpure", specialization: "Pediatrician" },
  { image: d4, name: "Dr. Kaveri Bhagure", specialization: "Dermatologist" },
  { image: d5, name: "Dr. Vinayak Khose", specialization: "Orthopedic Surgeon" },
   { image: d7, name: "Dr. Aryan Yadav", specialization: "Endocrinologist" },
  { image: d8, name: "Dr. Arti Ghorpade", specialization: "Gastroenterologist" },
   { image: d10, name: "Dr. Stella Torne", specialization: "General Practitioner" },
  { image: d11, name: "Dr. Sumit Ugale", specialization: "Ophthalmologist" },
];

const MedicalExperts = () => {
  const scrollContainer = React.useRef(null);

  const scrollLeft = () => {
    const scrollAmount = scrollContainer.current.clientWidth / 1.5;
    scrollContainer.current.scrollLeft -= scrollAmount;
  };

  const scrollRight = () => {
    const scrollAmount = scrollContainer.current.clientWidth / 1.5;
    scrollContainer.current.scrollLeft += scrollAmount;
  };

  return (
    <section id="aboutus" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-3">Our Medical Experts</h2>
        <p className="text-center text-gray-600 mb-8">
          Meet our team of highly skilled and experienced doctors who are
          dedicated to providing the best healthcare services.
        </p>

        <div className="relative">
          {/* Left Scroll Button */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-full shadow-lg z-10"
            onClick={scrollLeft}
          >
            &lt;
          </button>

          {/* Scrollable Container */}
          <div
            className="flex overflow-x-auto space-x-6 scrollbar-hide scroll-smooth"
            ref={scrollContainer}
          >
            {doctors.map((doctor, index) => (
              <div
                className="flex-shrink-0 w-64 bg-white rounded-xl shadow-md overflow-hidden"
                key={index}
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-50 object-cover"
                />
                <div className="p-4">
                  <h5 className="text-lg font-semibold">{doctor.name}</h5>
                  <p className="text-gray-500">{doctor.specialization}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Scroll Button */}
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-full shadow-lg z-10"
            onClick={scrollRight}
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
};

export default MedicalExperts;
