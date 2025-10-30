import React, { useState, useEffect } from "react";
import img1 from "./images/img1.jpg";
import img2 from "./images/img2.jpg";
import img3 from "./images/img3.jpg";

export default function Scrolling() {
  const images = [img1, img2, img3];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);

  return (
    <div className="relative w-full">
      {/* Slides */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-screen overflow-hidden">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`slide${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-[#00ab9f]" : "bg-gray-300"
            }`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>

    {/* Prev Button */}
<button
  onClick={prevSlide}
  aria-label="Previous Slide"
  className="absolute top-1/2 left-2 sm:left-5 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2 sm:p-3 shadow-md z-20"
>
  <span aria-hidden="true">&#10094;</span>
</button>

{/* Next Button */}
<button
  onClick={nextSlide}
  aria-label="Next Slide"
  className="absolute top-1/2 right-2 sm:right-5 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2 sm:p-3 shadow-md z-20"
>
  <span aria-hidden="true">&#10095;</span>
</button>

    </div>
  );
}
