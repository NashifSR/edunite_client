import Link from "next/link";
import React from "react";

const Resources = () => {
  const categories = [
    { title: "Graphic Design" },
    { title: "Web Development" },
    { title: "Digital Marketing" },
    { title: "Computer Basics" },
    { title: "CBT & A (Pedagogy lvl 4)" },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl py-12 px-6">
      {/* High-Contrast Section Header */}
      <h2 className="text-2xl md:text-3xl font-black mb-8 text-center text-white tracking-tight">
        📚 Explore Courses
      </h2>
      
      {/* High-Contrast Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {categories.map((cat, i) => (
          <div 
            key={i} 
            className="group relative bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-white/10 text-center cursor-pointer transition-all duration-300 hover:border-blue-500/40 hover:bg-slate-900/95 shadow-lg hover:shadow-black/40 flex items-center justify-center min-h-[120px]"
          >
            {/* Left Accent Accent Line on Hover */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-blue-500 rounded-r-md group-hover:h-1/2 transition-all duration-300" />

            {/* Crystal Clear Course Title */}
            <h3 className="text-lg font-bold text-slate-100 group-hover:text-blue-400 transition-colors duration-200 tracking-tight">
              {cat.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;