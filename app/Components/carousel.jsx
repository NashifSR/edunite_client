"use client";
import React, { useState, useEffect } from "react";

const Carousel = () => {
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
    "https://i.ibb.co.com/F4db1XKt/DSC-0302.jpg",
    "https://i.ibb.co.com/qMrSGyCP/DSC-0351.jpg",
    "https://i.ibb.co.com/RtxPTYT/DSC-0457.jpg",
    "https://i.ibb.co.com/V0DfFK9b/DSC-0350.jpg",
    "https://i.ibb.co.com/G4fCXc1R/DSC-0185.jpg",
    "https://i.ibb.co.com/gQcY7G0/DSC-0208.jpg",
    "https://i.ibb.co.com/Mx0TPBdF/DSC-0168.jpg"
  ];

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || images.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, images.length]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  return (
    <section className="w-full relative py-6">
      <div 
        className="max-w-6xl mx-auto relative group overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-slate-800 border border-white/5 shadow-2xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Main Viewport */}
        <div className="relative h-[350px] md:h-[500px] overflow-hidden">
          {images.map((src, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-[1000ms] ease-in-out ${
                index === current 
                  ? "opacity-100 scale-100 z-10" 
                  : "opacity-0 scale-105 z-0"
              }`}
            >
              <img
                src={src}
                alt={`Update ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-[6000ms] ease-out group-hover:scale-110"
              />
              
              {/* Soft Vignette and Glass Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              {/* Bottom Info Bar */}
              <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex items-end justify-between z-20">
                <div className="space-y-1 md:space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-white/90 uppercase tracking-widest">
                      Latest Activity
                    </span>
                  </div>
                  <p className="text-white text-lg md:text-xl font-bold tracking-tight">Gallery Item {index + 1}</p>
                </div>
                
                {/* Clean, Non-Glowy Counter */}
                <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1 rounded-full">
                  <span className="text-white/80 font-mono text-sm">
                    {String(index + 1).padStart(2, '0')} <span className="opacity-40">/</span> {images.length}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tactile Navigation Buttons */}
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <NavButton onClick={prevSlide} direction="left" />
          <NavButton onClick={nextSlide} direction="right" />
        </div>

        {/* Progress Bar (Tactile) */}
        <div className="absolute bottom-0 left-0 h-1 bg-blue-500/50 z-40 transition-all duration-500 ease-linear" 
             style={{ width: `${((current + 1) / images.length) * 100}%` }} />
      </div>

      {/* External Micro-Pagination */}
      <div className="max-w-6xl mx-auto flex justify-center mt-6 gap-2 flex-wrap px-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === current 
              ? "w-8 bg-blue-500" 
              : "w-2 bg-slate-700 hover:bg-slate-600"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

// Helper Component for Navigation
const NavButton = ({ onClick, direction }) => (
  <button
    onClick={onClick}
    className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/20 active:scale-90 transition-all shadow-xl"
  >
    {direction === "left" ? (
      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
      </svg>
    ) : (
      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
      </svg>
    )}
  </button>
);

export default Carousel;