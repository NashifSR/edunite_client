"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import SectionToggle from "../SharedComponents/SectionToggle";
import useShortQuestions from "../Hooks/useShortQuestions";
import { withAuth } from "../SharedComponents/withAuth";

const WrittenTests = () => {
  const router = useRouter();
  const [section, setSection] = useState("answers");
  const { shortQuestions = [], loading, error } = useShortQuestions();

  // ─── DIAGNOSTIC BACKEND DATA TRACKING LOGS ──────────────────────────────────
  console.group(shortQuestions)
  console.log("Is Loading State Active?:");
  
  if (shortQuestions && shortQuestions.length > 0) {
    console.log("First Object Blueprint Reference Sample:", shortQuestions[0]);
  }
  console.groupEnd();
  // ────────────────────────────────────────────────────────────────────────────

  const dynamicCategories = useMemo(() => {
    if (!shortQuestions || shortQuestions.length === 0) return [];

    const counts = shortQuestions.reduce((acc, item) => {
      const slug = item.category || "where!";
      acc[slug] = (acc[slug] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(counts).map((slug) => ({
      slug,
      name: slug.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      count: counts[slug],
    }));
  }, [shortQuestions]);

  const isAnswers = section === "answers";

  // 1. Error Boundary Display Node
  if (error) {
    return (
      <div className="min-h-screen bg-[#090d16] text-slate-200 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-red-950/20 border border-red-500/30 rounded-2xl p-6 text-center shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4 text-red-400 font-mono text-xl font-bold">
            !
          </div>
          <h2 className="text-base font-black text-white tracking-wide uppercase">Pipeline Error</h2>
          <p className="text-xs text-slate-400 mt-2 font-mono break-words">
            {error?.message || "Failed to establish a handshaking connection with data services."}
          </p>
        </div>
      </div>
    );
  }

  // 2. Loading State Node
  if (loading) {
    return (
      <div className="min-h-screen bg-[#090d16] text-slate-200 flex items-center justify-center">
        <div className="text-xs text-slate-500 tracking-wide font-mono animate-pulse">
          Aggregating workspace categories...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-200 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-white">Written Test Dashboard</h1>
          </div>
          <div className="w-80 bg-slate-900 p-1.5 rounded-2xl border border-white/[0.04]">
            <SectionToggle defaultSection="answers" onChange={setSection} />
          </div>
        </div>

        {dynamicCategories.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/[0.05] rounded-2xl">
            <p className="text-xs text-slate-500 font-mono">No category assignments found in active database collections.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dynamicCategories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => router.push(`/writtenTests/${cat.slug}/${section}`)}
                className={`group relative bg-slate-900/40 border border-white/[0.05] rounded-2xl p-5 hover:bg-slate-900/80 transition-all text-left flex flex-col justify-between ${
                  isAnswers ? "hover:border-emerald-500/30" : "hover:border-blue-500/30"
                }`}
              >
                <div className="flex justify-between items-start w-full mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-100 group-hover:text-white flex items-center gap-2">
                      {cat.name}
                      <span className="text-[10px] bg-white/[0.04] px-1.5 py-0.5 rounded text-slate-400 border border-white/[0.05]">
                        {cat.count}
                      </span>
                    </h3>
                  </div>
                </div>

                <div className="flex justify-between items-center w-full mt-4 pt-2 border-t border-white/[0.03] text-[10px] font-bold">
                  <span className={`px-2 py-0.5 rounded border ${
                    isAnswers ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                  }`}>
                    {isAnswers ? "Answer Keys" : "Questions"}
                  </span>
                  <span className="text-slate-500 group-hover:text-slate-300 uppercase tracking-wider">Launch</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(WrittenTests);