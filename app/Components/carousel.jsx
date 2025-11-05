"use client";
import React, { useState, useEffect } from "react";

const Carousel = () => {
  const images = [
    "https://i.ibb.co/wZMWYcdt/Whats-App-Image-2025-06-19-at-16-11-48-29eea7db.jpg",
    "https://i.ibb.co/Wp3JPNGp/Whats-App-Image-2025-06-25-at-16-42-42-9a5a86ac.jpg",
    "https://i.ibb.co/M5V88HxG/Whats-App-Image-2025-06-25-at-16-42-46-7a86b691.jpg",
    "https://i.ibb.co/FLb15rbv/Whats-App-Image-2025-07-10-at-13-12-44-520984bb.jpg",
    "https://i.ibb.co/NdWCT92D/Whats-App-Image-2025-04-14-at-20-34-43-2a2285fc.jpg",
    "https://i.ibb.co/RpjG3Y8y/Whats-App-Image-2025-09-28-at-18-18-59-7b39fe7d.jpg",
    "https://i.ibb.co/HLBcc84Y/Whats-App-Image-2025-07-28-at-22-47-23-01a296e0.jpg",
    "https://i.ibb.co/HfcmmBhL/Whats-App-Image-2025-09-28-at-19-36-32-72e8a27e.jpg",
    "https://i.ibb.co/pBbKCWSc/Whats-App-Image-2025-09-28-at-20-38-41-91ccee96.jpg",
    "https://i.ibb.co/N6XB5QKz/Whats-App-Image-2025-03-25-at-20-26-27-edc85017.jpg",
    "https://i.ibb.co/8WbLkCN/Whats-App-Image-2025-03-25-at-13-40-30-1a876de2.jpg",
  ];

  const [current, setCurrent] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Image Container */}
      <div className="relative w-full h-screen overflow-hidden rounded-2xl shadow-lg">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === current ? "bg-blue-500 scale-110" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
