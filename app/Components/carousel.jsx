"use client";
import React, { useState, useEffect } from "react";

const Carousel = () => {
  // Direct ImgBB Image Links
  const images = [
    "https://i.ibb.co.com/wZMWYcdt/Whats-App-Image-2025-06-19-at-16-11-48-29eea7db.jpg",
    "https://i.ibb.co.com/Wp3JPNGp/Whats-App-Image-2025-06-25-at-16-42-42-9a5a86ac.jpg",
    "https://i.ibb.co.com/M5V88HxG/Whats-App-Image-2025-06-25-at-16-42-46-7a86b691.jpg",
    "https://i.ibb.co.com/FLb15rbv/Whats-App-Image-2025-07-10-at-13-12-44-520984bb.jpg",
    "https://i.ibb.co.com/NdWCT92D/Whats-App-Image-2025-04-14-at-20-34-43-2a2285fc.jpg",
    "https://i.ibb.co.com/RpjG3Y8y/Whats-App-Image-2025-09-28-at-18-18-59-7b39fe7d.jpg",
    "https://i.ibb.co.com/HLBcc84Y/Whats-App-Image-2025-07-28-at-22-47-23-01a296e0.jpg",
    "https://i.ibb.co.com/HfcmmBhL/Whats-App-Image-2025-09-28-at-19-36-32-72e8a27e.jpg",
    "https://i.ibb.co.com/pBbKCWSc/Whats-App-Image-2025-09-28-at-20-38-41-91ccee96.jpg",
    "https://i.ibb.co.com/N6XB5QKz/Whats-App-Image-2025-03-25-at-20-26-27-edc85017.jpg",
    "https://i.ibb.co.com/8WbLkCN/Whats-App-Image-2025-03-25-at-13-40-30-1a876de2.jpg",
    "https://i.ibb.co.com/GfCXqV1f/DSC-0318.jpg",
    "https://i.ibb.co.com/C37gwnZ2/DSC-0297.jpg",
    "https://i.ibb.co.com/FLDqm63G/DSC-0309.jpg",
    "https://i.ibb.co.com/F4db1XKt/DSC-0302.jpg"
  ];

  const [current, setCurrent] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-3xl shadow-2xl bg-black">
        {images.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img 
              src={src} 
              alt={`Slide ${index + 1}`} 
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
            {/* Dark overlay for better text contrast if you add captions later */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-20" />
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrent(current === 0 ? images.length - 1 : current - 1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-full text-white transition-all active:scale-90"
        >
          ←
        </button>
        <button
          onClick={() => setCurrent((current + 1) % images.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-full text-white transition-all active:scale-90"
        >
          →
        </button>
      </div>

      {/* Slide Indicators (Dots) */}
      <div className="flex justify-center mt-6 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 transition-all duration-300 rounded-full ${
              index === current ? "w-8 bg-blue-600" : "w-2 bg-gray-400 hover:bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;