"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import SectionToggle from "../Components/SectionToggle";

const categories = [
  {
    name: "Graphic Design",
    slug: "graphic_design",
    icon: "🎨",
    desc: "Photoshop, Illustrator, Branding",
  },
  {
    name: "Computer Operation",
    slug: "computer_operation",
    icon: "💻",
    desc: "MS Office, Typing, Internet",
  },
  {
    name: "Digital Marketing",
    slug: "digital_marketing",
    icon: "📈",
    desc: "SEO, Ads, Social Media",
  },
  {
    name: "Web Development",
    slug: "web_development",
    icon: "🌐",
    desc: "HTML, CSS, JS, MERN",
  },
  {
    name: "CBTA",
    slug: "CBTA",
    icon: "📜",
    desc: "Assessment & Competency",
  },
];

const WrittenTests = () => {
  const router = useRouter();
  const [section, setSection] = useState("answers");

  // Dynamic style states depending on selected section toggle type
  const isAnswers = section === "answers";
  const activeBgClass = isAnswers ? "bg-emerald-500" : "bg-blue-500";
  const activeBorderHover = isAnswers ? "hover:border-emerald-500/30" : "hover:border-blue-500/30";
  const iconGradient = isAnswers 
    ? "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400" 
    : "from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400";

  // Calculate actual total items dynamically from categories array data
  const totalItemsCount = useMemo(() => {
    return categories.reduce((sum, cat) => sum + (cat.count || 0), 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-200 px-4 py-8 relative">
      
      {/* Background Ambient Blur Blobs */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className={`absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full transition-all duration-700 blur-[130px] ${isAnswers ? 'bg-emerald-600/[0.03]' : 'bg-blue-600/[0.03]'}`} />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] rounded-full bg-indigo-600/[0.02] blur-[130px]" />
      </div>

      <div className="max-w-6xl mx-auto">

        {/* Dashboard Control Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.02] border border-white/[0.06] text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 mb-3">
              <div className={`h-1.5 w-1.5 rounded-full ring-4 transition-all duration-500 ${activeBgClass} ${isAnswers ? 'ring-emerald-500/10' : 'ring-blue-500/10'}`} />
              Examination Portal
            </div>

            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-none">
              Written Test <span className={`text-transparent bg-clip-text bg-gradient-to-r transition-all duration-500 ${isAnswers ? 'from-emerald-400 to-teal-400' : 'from-blue-400 to-cyan-400'}`}>Dashboard</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 mt-3 max-w-xl font-medium leading-relaxed">
              Browse structured qualification question banks, dynamic student answer sheets, and curriculum review materials sorted by technical category.
            </p>
          </div>

          {/* Section Selection Toggle Controller Container */}
          <div className="w-full max-w-[320px] bg-slate-900/60 p-1.5 rounded-2xl border border-white/[0.04]">
            <SectionToggle
              defaultSection="answers"
              onChange={setSection}
            />
          </div>
        </div>

        {/* Status Deck Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 py-4 border-y border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className={`h-8 w-1 rounded-full transition-all duration-500 ${activeBgClass}`} />
            <div>
              <h2 className="text-base font-bold text-white capitalize tracking-tight leading-none">
                {section} View Deck
              </h2>
              <p className="text-[11px] font-semibold text-slate-500 mt-1">
                {categories.length} operational branches initialized
              </p>
            </div>
          </div>

          {/* Clean Real Stats Counters */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900/40 backdrop-blur-md border border-white/[0.04] rounded-xl px-4 py-2.5 min-w-[100px]">
              <p className="text-[9px] uppercase font-black tracking-wider text-slate-500">Categories</p>
              <p className="text-lg font-black text-white mt-0.5">{categories.length}</p>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-md border border-white/[0.04] rounded-xl px-4 py-2.5 min-w-[100px]">
              <p className="text-[9px] uppercase font-black tracking-wider text-slate-500">Total Items</p>
              <p className="text-lg font-black text-white mt-0.5">{totalItemsCount}</p>
            </div>
          </div>
        </div>

        {/* Dark High-Contrast Category Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => router.push(`/writtenTests/${cat.slug}/${section}`)}
              className={`group relative bg-slate-900/40 backdrop-blur-xl border border-white/[0.05] rounded-2xl p-5 ${activeBorderHover} hover:bg-slate-900/80 transition-all duration-300 active:scale-[0.99] text-left flex flex-col justify-between shadow-xl shadow-black/10`}
            >
              {/* Card Meta Content Header Row */}
              <div className="flex items-start justify-between mb-5 w-full">
                <div className="flex items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br border flex items-center justify-center text-xl transition-all duration-300 shadow-md shadow-black/10 ${iconGradient}`}>
                    <span className="select-none">{cat.icon}</span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-100 tracking-tight transition-colors group-hover:text-white">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5 leading-snug line-clamp-1">
                      {cat.desc}
                    </p>
                  </div>
                </div>

                <svg
                  className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-all duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>

              {/* Card Footer Tag Indicators */}
              <div className="flex items-center justify-between w-full mt-auto pt-2 border-t border-white/[0.03]">
                <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wide">

                  <span className={`px-2 py-0.5 rounded-md border transition-all duration-500
                    ${isAnswers 
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                      : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                    }`}
                  >
                    {isAnswers ? "Answer Keys" : "Questions"}
                  </span>
                </div>

                <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 group-hover:text-slate-300 transition-colors">
                  Launch
                </div>
              </div>

              {/* Smooth Background Inner Hover Glow Accent */}
              <div
                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-[-1]
                  ${isAnswers 
                    ? "bg-gradient-to-br from-emerald-500/[0.02] to-transparent" 
                    : "bg-gradient-to-br from-blue-500/[0.02] to-transparent"
                  }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WrittenTests;