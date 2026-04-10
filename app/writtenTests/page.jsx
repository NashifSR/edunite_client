"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SectionToggle from "../Components/SectionToggle";

const categories = [
  { name: "Graphic Design", slug: "graphic_design", icon: "🎨" },
  { name: "Computer Operation", slug: "computer_operation", icon: "💻" },
  { name: "Digital Marketing", slug: "digital_marketing", icon: "📈" },
  { name: "Web Development", slug: "web_development", icon: "🌐" },
];

const WrittenTests = () => {
  const router = useRouter();
  const [section, setSection] = useState("answers");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 px-6 py-12 flex flex-col items-center">
      
      {/* Header Section */}
      <div className="max-w-2xl text-center mb-12">
        <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-slate-200/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
          Curated Examination Material
        </div>
        <h1 className="text-4xl font-black tracking-tight mb-4 text-slate-900">
          Written Test <span className="text-blue-600">Portal</span>
        </h1>
        <p className="text-slate-500 font-medium">
          Select a subject area to review past questions or check official answer keys.
        </p>
      </div>

      {/* Modern Section Toggle */}
      <div className="w-full max-w-[340px] mb-12">
        <SectionToggle defaultSection="answers" onChange={setSection} />
      </div>

      {/* Category Grid */}
      <div className="w-full max-w-5xl">
        <div className="flex items-center gap-3 mb-8">
          <div className={`h-8 w-1 rounded-full ${section === 'answers' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
          <h2 className="text-xl font-black capitalize tracking-tight">
            Browse {section}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => router.push(`/writtenTests/${cat.slug}/${section}`)}
              className="group relative bg-white border border-slate-200 rounded-[2rem] p-8 text-center transition-all duration-300 hover:border-transparent hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] active:scale-95 flex flex-col items-center"
            >
              {/* Icon / Avatar */}
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {cat.icon}
              </div>

              <span className="text-lg font-black text-slate-800 mb-2 block group-hover:text-blue-600 transition-colors">
                {cat.name}
              </span>

              <div
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-colors
                  ${
                    section === "answers"
                      ? "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white"
                      : "bg-blue-50 text-blue-600 group-hover:bg-blue-500 group-hover:text-white"
                  }`}
              >
                {section === "answers" ? "Key Available" : "Start Review"}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Subtle background decoration */}
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                <span className="text-6xl font-black italic">{cat.name.charAt(0)}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WrittenTests;