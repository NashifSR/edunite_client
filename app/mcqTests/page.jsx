"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import SectionToggle from "../SharedComponents/SectionToggle";
import useMCQ from "../Hooks/useMcq";

// Fallback metadata lookups to keep your visual design styles intact for dynamic slugs
const CATEGORY_THEMES = {
  graphic_design: {
    icon: "🎨",
    color: "from-violet-500/20 to-purple-500/10 border-purple-500/30 text-purple-400",
    desc: "Visual communication & typography structures."
  },
  computer_operation: {
    icon: "💻",
    color: "from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400",
    desc: "Office suites, operating systems & hardware workflows."
  },
  digital_marketing: {
    icon: "📈",
    color: "from-orange-500/20 to-rose-500/10 border-orange-500/30 text-orange-400",
    desc: "Search engine optimization & audience data strategies."
  },
  web_development: {
    icon: "🌐",
    color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400",
    desc: "Full-stack client architectures & api backend runtimes."
  },
  cbta: {
    icon: "📜",
    color: "from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400",
    desc: "Competency-Based Training & Assessment standard methods."
  },
  unassigned: {
    icon: "📁",
    color: "from-slate-500/20 to-slate-600/10 border-slate-500/30 text-slate-400",
    desc: "Unclassified repository elements."
  }
};

const McqTests = () => {
  const router = useRouter();
  const [section, setSection] = useState("tests");
  const [mounted, setMounted] = useState(false);
  
  // Connect hook to live pipeline
  const { mcq = [], isLoading, isError, error } = useMCQ();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Compute categories dynamically from active database collection data
  const dynamicCategories = useMemo(() => {
    if (!mcq || mcq.length === 0) return [];

    const counts = mcq.reduce((acc, item) => {
      // Normalize to lowercase to protect against casing variations in the DB (e.g., "CBTA" vs "cbta")
      const slug = item.category ? String(item.category).toLowerCase().trim() : "unassigned";
      acc[slug] = (acc[slug] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(counts).map((slug) => {
      const theme = CATEGORY_THEMES[slug] || CATEGORY_THEMES.unassigned;
      
      // Re-format slug cleanly for UI display headings
      const humanReadableName = slug === "cbta" 
        ? "CBTA" 
        : slug.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

      return {
        slug,
        name: humanReadableName,
        icon: theme.icon,
        color: theme.color,
        description: theme.desc,
        count: counts[slug]
      };
    });
  }, [mcq]);

  if (!mounted) return null;

  // 1. Pipeline Error Containment Node
  if (isError) {
    return (
      <div className="min-h-screen bg-[#090d16] text-slate-200 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-red-950/20 border border-red-500/30 rounded-2xl p-6 text-center shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4 text-red-400 font-mono text-xl font-bold">!</div>
          <h2 className="text-base font-black text-white tracking-wide uppercase">Pipeline Extraction Error</h2>
          <p className="text-xs text-slate-400 mt-2 font-mono break-words">
            {error?.message || "Failed to load MCQ structural items from data layer."}
          </p>
        </div>
      </div>
    );
  }

  // 2. Async Loading State Node
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#090d16] text-slate-200 flex items-center justify-center">
        <div className="text-xs text-slate-500 tracking-wide font-mono animate-pulse">
          Aggregating interactive MCQ frameworks...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-200 py-10 px-4 sm:px-6">
      {/* Background Subtle Radial Glows */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/[0.05] blur-[150px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-slate-600/[0.03] blur-[130px]" />
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
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

          <div className="flex items-center bg-slate-900/90 border border-white/[0.06] p-1 rounded-xl backdrop-blur-md">
            <SectionToggle defaultSection="tests" onChange={setSection} />
          </div>
        </div>

        {/* Dynamic Category High-Contrast Grid */}
        {dynamicCategories.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/[0.05] rounded-2xl">
            <p className="text-xs text-slate-500 font-mono">No MCQ entries populated inside current collections.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dynamicCategories.map((cat) => (
              <div
                key={cat.slug}
                onClick={() => router.push(`/mcqTests/${cat.slug}/${section}`)}
                className="group cursor-pointer bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/[0.06] hover:border-blue-500/40 hover:bg-slate-900/90 transition-all duration-300 shadow-xl shadow-black/20 flex flex-col justify-between overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br border ${cat.color} flex items-center justify-center text-lg shadow-inner group-hover:scale-105 transition-transform duration-300`}>
                      {cat.icon}
                    </div>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-400 border border-white/[0.06] tracking-wide">
                      {cat.count} Items
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-100 mb-1.5 group-hover:text-blue-400 transition-colors duration-200 tracking-tight truncate">
                    {cat.name}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 min-h-[2.5rem]">
                    {cat.description}
                  </p>
                </div>

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
        )}

        {/* Dynamic Telemetry Stats Status Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="bg-slate-900/40 backdrop-blur-md border border-white/[0.04] rounded-2xl p-4 flex items-center justify-between shadow-lg shadow-black/10">
            <div>
              <p className="text-[10px] uppercase font-black tracking-widest text-slate-500">Active Clusters</p>
              <p className="text-lg font-black text-white mt-0.5">{dynamicCategories.length} Tracks</p>
            </div>
            <div className="h-9 w-9 bg-white/[0.04] border border-white/[0.06] rounded-xl flex items-center justify-center text-sm shadow-md">📁</div>
          </div>
          
          <div className="bg-slate-900/40 backdrop-blur-md border border-white/[0.04] rounded-2xl p-4 flex items-center justify-between shadow-lg shadow-black/10">
            <div>
              <p className="text-[10px] uppercase font-black tracking-widest text-slate-500">Total Dataset Pool</p>
              <p className="text-lg font-black text-blue-400 mt-0.5">{mcq.length} Questions</p>
            </div>
            <div className="h-9 w-9 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center text-sm shadow-md">🧠</div>
          </div>

          <div className="bg-slate-900/40 backdrop-blur-md border border-white/[0.04] rounded-2xl p-4 flex items-center justify-between shadow-lg shadow-black/10">
            <div>
              <p className="text-[10px] uppercase font-black tracking-widest text-slate-500">Access Node Status</p>
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