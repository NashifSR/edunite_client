"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SectionToggle from "@/app/Components/SectionToggle";
import ButtonDesigns from "@/app/Components/ButtonDesigns";

const categories = [
  {
    name: "Graphic Design",
    slug: "graphic_design",
    icon: "🎨",
    color: "from-violet-500 to-purple-600",
    description: "Visual communication & typography."
  },
  {
    name: "Computer Operation",
    slug: "computer_operation",
    icon: "💻",
    color: "from-blue-500 to-indigo-600",
    description: "Office & hardware management."
  },
  {
    name: "Digital Marketing",
    slug: "digital_marketing",
    icon: "📈",
    color: "from-orange-400 to-rose-500",
    description: "SEO, SMM & data strategies."
  },
  {
    name: "Web Development",
    slug: "web_development",
    icon: "🌐",
    color: "from-emerald-400 to-teal-600",
    description: "Full-stack apps & frameworks."
  },
  {
    name: "CBTA",
    slug: "CBTA",
    icon: "📜",
    color: "from-amber-400 to-orange-500",
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
    <div className="min-h-screen bg-[#f1f5f9] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Compact Header */}
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-slate-300/50 pb-6 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">System Dashboard</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Assessment<span className="text-blue-600">Portal</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
             <div className="bg-slate-200/50 p-1 rounded-lg">
                <SectionToggle
                  defaultSection="tests"
                  onChange={setSection}
                />
             </div>
          </div>
        </div>

        {/* Dense Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.slug}
              onClick={() => router.push(`/mcqTests/${cat.slug}/${section}`)}
              className="group cursor-pointer bg-white rounded-xl border border-slate-200 hover:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div className="p-5">
                {/* Header: Icon and Slug */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform`}>
                    {cat.icon}
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">
                    {cat.slug === "CBTA" ? "CERT" : "MOD"}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors truncate">
                  {cat.name}
                </h3>
                <p className="text-slate-500 text-xs leading-snug mb-4 line-clamp-2 min-h-[2rem]">
                  {cat.description}
                </p>

                {/* Footer Action */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                   <span className="text-[10px] font-black uppercase text-slate-400">
                     {section === "tests" ? "Attempt Test" : "Library"}
                   </span>
                   <svg className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                   </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compressed Info Bar */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800 rounded-xl p-4 text-white flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Available Modules</p>
              <p className="text-xl font-black">05 Units</p>
            </div>
            <div className="h-10 w-10 bg-white/10 rounded-lg flex items-center justify-center text-lg">📁</div>
          </div>
          
          <div className="bg-blue-600 rounded-xl p-4 text-white flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase font-bold text-blue-200">Question Database</p>
              <p className="text-xl font-black">400+ Qs</p>
            </div>
            <div className="h-10 w-10 bg-white/10 rounded-lg flex items-center justify-center text-lg">🧠</div>
          </div>

          <div className="bg-emerald-600 rounded-xl p-4 text-white flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase font-bold text-emerald-200">Access Status</p>
              <p className="text-xl font-black">Premium Free</p>
            </div>
            <div className="h-10 w-10 bg-white/10 rounded-lg flex items-center justify-center text-lg">✅</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default McqTests;