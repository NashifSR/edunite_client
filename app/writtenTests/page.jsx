"use client";

import React, { useState } from "react";
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 px-4 py-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/60 text-[10px] font-black uppercase tracking-[0.18em] text-slate-600 mb-3">
              Examination Portal
            </div>

            <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-none">
              Written Test Dashboard
            </h1>

            <p className="text-sm text-slate-500 mt-3 max-w-xl">
              Browse question banks, answer sheets, and review materials by category.
            </p>
          </div>

          {/* Toggle */}
          <div className="w-full max-w-[320px]">
            <SectionToggle
              defaultSection="answers"
              onChange={setSection}
            />
          </div>
        </div>

        {/* Stats + Section Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          
          <div className="flex items-center gap-3">
            <div
              className={`h-8 w-1 rounded-full ${
                section === "answers"
                  ? "bg-emerald-500"
                  : "bg-blue-500"
              }`}
            />

            <div>
              <h2 className="text-lg font-black capitalize leading-none">
                {section}
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                {categories.length} categories available
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 min-w-[90px]">
              <p className="text-[10px] uppercase font-black tracking-wider text-slate-400">
                Categories
              </p>
              <p className="text-xl font-black">
                {categories.length}
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 min-w-[90px]">
              <p className="text-[10px] uppercase font-black tracking-wider text-slate-400">
                Tests
              </p>
              <p className="text-xl font-black">
                423
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 min-w-[90px]">
              <p className="text-[10px] uppercase font-black tracking-wider text-slate-400">
                Updated
              </p>
              <p className="text-xl font-black">
                2026
              </p>
            </div>
          </div>
        </div>

        {/* Compact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() =>
                router.push(`/writtenTests/${cat.slug}/${section}`)
              }
              className="group relative bg-white border border-slate-200 rounded-3xl p-5 hover:border-slate-300 hover:shadow-lg transition-all duration-300 active:scale-[0.98] text-left"
            >

              {/* Top Row */}
              <div className="flex items-start justify-between mb-4">
                
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                    {cat.icon}
                  </div>

                  <div>
                    <h3 className="text-base font-black leading-tight group-hover:text-blue-600 transition-colors">
                      {cat.name}
                    </h3>

                    <p className="text-xs text-slate-500 mt-1">
                      {cat.desc}
                    </p>
                  </div>
                </div>

                <svg
                  className="w-5 h-5 text-slate-300 group-hover:text-slate-500 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>

              {/* Bottom Row */}
              <div className="flex items-center justify-between">
                
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-bold text-slate-700">
                    {cat.count} Items
                  </span>

                  <span
                    className={`px-2.5 py-1 rounded-lg font-bold
                      ${
                        section === "answers"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-blue-50 text-blue-600"
                      }`}
                  >
                    {section === "answers"
                      ? "Answer Keys"
                      : "Questions"}
                  </span>
                </div>

                <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 group-hover:text-slate-600 transition-colors">
                  Open
                </div>
              </div>

              {/* Hover Glow */}
              <div
                className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none
                  ${
                    section === "answers"
                      ? "bg-gradient-to-br from-emerald-500/[0.03]"
                      : "bg-gradient-to-br from-blue-500/[0.03]"
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