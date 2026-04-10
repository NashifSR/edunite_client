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
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, images.length]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  return (
    <section className="w-full relative px-4 md:px-0">
      <div 
        className="max-w-6xl mx-auto relative group overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Main Viewport */}
        <div className="relative h-[400px] md:h-[550px] overflow-hidden">
          {images.map((src, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
                index === current 
                  ? "opacity-100 translate-x-0 scale-100 z-10" 
                  : "opacity-0 translate-x-12 scale-110 z-0"
              }`}
            >
              <img
                src={src}
                alt={`Update ${index + 1}`}
                className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-[5000ms]"
              />
              
              {/* Intelligent Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/60 via-transparent to-black/20" />
              
              {/* Bottom Info Bar */}
              <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between z-20">
                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-[10px] font-black text-white uppercase tracking-[0.2em]">
                    Visual Update
                  </span>
                  <p className="text-white/70 text-sm font-medium">Gallery Archive {index + 1}</p>
                </div>
                
                <div className="text-white/40 font-black text-5xl md:text-7xl tracking-tighter opacity-20 italic">
                  #{String(index + 1).padStart(2, '0')}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Glass Navigation */}
        <div className="absolute top-1/2 -translate-y-1/2 inset-x-6 flex justify-between items-center z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          <button
            onClick={prevSlide}
            className="pointer-events-auto p-4 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full text-white hover:bg-white/30 hover:scale-110 transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            onClick={nextSlide}
            className="pointer-events-auto p-4 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full text-white hover:bg-white/30 hover:scale-110 transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* Timer Progress Ring (Bottom Right) */}
        <div className="absolute bottom-10 right-10 z-30 hidden md:flex items-center gap-4">
             <div className="flex gap-1.5">
                {images.slice(0, 5).map((_, i) => (
                    <div key={i} className={`h-1 rounded-full transition-all duration-500 ${current % 5 === i ? "w-8 bg-white" : "w-2 bg-white/30"}`} />
                ))}
             </div>
        </div>
      </div>

      {/* External Scroll Indicators (Modern Dot Array) */}
      <div className="max-w-6xl mx-auto flex justify-center mt-8 gap-1.5 overflow-x-auto py-2 no-scrollbar">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1 rounded-full transition-all duration-700 shrink-0 ${
              index === current 
              ? "w-8 bg-slate-900 shadow-xl" 
              : "w-1 bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;