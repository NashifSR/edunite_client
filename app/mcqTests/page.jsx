"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SectionToggle from "@/app/Components/SectionToggle";

const categories = [
  {
    name: "Graphic Design",
    slug: "graphic_design",
    icon: "🎨",
    color: "from-violet-500/20 to-purple-500/10 border-purple-500/30 text-purple-400",
    description: "Visual communication & typography."
  },
  {
    name: "Computer Operation",
    slug: "computer_operation",
    icon: "💻",
    color: "from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400",
    description: "Office & hardware management."
  },
  {
    name: "Digital Marketing",
    slug: "digital_marketing",
    icon: "📈",
    color: "from-orange-500/20 to-rose-500/10 border-orange-500/30 text-orange-400",
    description: "SEO, SMM & data strategies."
  },
  {
    name: "Web Development",
    slug: "web_development",
    icon: "🌐",
    color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400",
    description: "Full-stack apps & frameworks."
  },
  {
    name: "CBTA",
    slug: "CBTA",
    icon: "📜",
    color: "from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400",
    description: "Training & Assessment methods."
  },
];

const McqTests = () => {
  const router = useRouter();
  const [section, setSection] = useState("tests");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-200 py-10 px-4 sm:px-6">
      
      {/* Background Subtle Radial Glows */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/[0.05] blur-[150px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-slate-600/[0.03] blur-[130px]" />
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Sleek Minimalist Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/[0.06] pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500 ring-4 ring-blue-500/10" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">System Dashboard</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Assessment<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Portal</span>
            </h1>
          </div>

          {/* Section Toggle Wrapper */}
          <div className="flex items-center bg-slate-900/90 border border-white/[0.06] p-1 rounded-xl backdrop-blur-md">
            <SectionToggle
              defaultSection="tests"
              onChange={setSection}
            />
          </div>
        </div>

        {/* High-Contrast Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.slug}
              onClick={() => router.push(`/mcqTests/${cat.slug}/${section}`)}
              className="group cursor-pointer bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/[0.06] hover:border-blue-500/40 hover:bg-slate-900/90 transition-all duration-300 shadow-xl shadow-black/20 flex flex-col justify-between overflow-hidden"
            >
              <div className="p-5">
                {/* Card Top Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br border ${cat.color} flex items-center justify-center text-lg shadow-inner group-hover:scale-105 transition-transform duration-300`}>
                    {cat.icon}
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-400 border border-white/[0.06] uppercase tracking-wider">
                    {cat.slug === "CBTA" ? "CERT" : "MOD"}
                  </span>
                </div>

                {/* Main Content Info */}
                <h3 className="text-base font-bold text-slate-100 mb-1.5 group-hover:text-blue-400 transition-colors duration-200 tracking-tight truncate">
                  {cat.name}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 min-h-[2.5rem]">
                  {cat.description}
                </p>
              </div>

              {/* Card Footer Action Strip */}
              <div className="flex items-center justify-between mx-5 py-3.5 border-t border-white/[0.04]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-slate-300 transition-colors">
                  {section === "tests" ? "Attempt Test" : "Library Content"}
                </span>
                <svg className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Compressed Dark Glass Stats System Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          
          <div className="bg-slate-900/40 backdrop-blur-md border border-white/[0.04] rounded-2xl p-4 flex items-center justify-between shadow-lg shadow-black/10">
            <div>
              <p className="text-[10px] uppercase font-black tracking-widest text-slate-500">Available Modules</p>
              <p className="text-lg font-black text-white mt-0.5">05 Units</p>
            </div>
            <div className="h-9 w-9 bg-white/[0.04] border border-white/[0.06] rounded-xl flex items-center justify-center text-sm shadow-md">📁</div>
          </div>
          
          <div className="bg-slate-900/40 backdrop-blur-md border border-white/[0.04] rounded-2xl p-4 flex items-center justify-between shadow-lg shadow-black/10">
            <div>
              <p className="text-[10px] uppercase font-black tracking-widest text-slate-500">Question Database</p>
              <p className="text-lg font-black text-blue-400 mt-0.5">400+ Questions</p>
            </div>
            <div className="h-9 w-9 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center text-sm shadow-md">🧠</div>
          </div>

          <div className="bg-slate-900/40 backdrop-blur-md border border-white/[0.04] rounded-2xl p-4 flex items-center justify-between shadow-lg shadow-black/10">
            <div>
              <p className="text-[10px] uppercase font-black tracking-widest text-slate-500">Access Status</p>
              <p className="text-lg font-black text-emerald-400 mt-0.5">Premium Free</p>
            </div>
            <div className="h-9 w-9 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center text-sm shadow-md">✅</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default McqTests;