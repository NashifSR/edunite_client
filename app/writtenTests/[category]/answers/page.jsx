"use client";

import React, { useState, useMemo, useEffect } from "react";
import useShortQuestions from "@/app/Hooks/useShortQuestions";
import SearchBox from "@/app/Components/SearchBox";

const WrittenAnswerPage = ({ params }) => {
  // Safe unwrap of dynamic Next async route parameters
  const resolvedParams = React.use(params);
  const cat = resolvedParams?.category;
  
  const { shortQuestions } = useShortQuestions();

  const [selectedUnit, setSelectedUnit] = useState(null);
  const [showEnglish, setShowEnglish] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  // Strictly enforce client-side matching on first paint pass
  useEffect(() => {
    setMounted(true);
  }, []);

  const categoryQuestions = useMemo(
    () => (cat && shortQuestions?.[cat]) || [],
    [shortQuestions, cat]
  );

  const units = useMemo(
    () => [...new Set(categoryQuestions.map((q) => q.unit))].filter(Boolean),
    [categoryQuestions]
  );

  const filteredQuestions = useMemo(
    () =>
      selectedUnit
        ? categoryQuestions.filter((q) => q.unit === selectedUnit)
        : categoryQuestions,
    [selectedUnit, categoryQuestions]
  );

  const searchedQuestions = useMemo(() => {
    const cleanedQuery = searchQuery.trim().toLowerCase();

    if (!cleanedQuery) return filteredQuestions;

    return filteredQuestions.filter((q) => {
      const questionText = q.question?.toLowerCase() || "";
      const questionId = q.id?.toString() || "";
      const answerEnText = q.answer?.en?.toLowerCase() || "";
      const answerBnText = q.answer?.bn?.toLowerCase() || "";

      return (
        questionText.includes(cleanedQuery) ||
        questionId === cleanedQuery ||
        answerEnText.includes(cleanedQuery) ||
        answerBnText.includes(cleanedQuery)
      );
    });
  }, [filteredQuestions, searchQuery]);

  const displayTitle = useMemo(() => {
    if (!cat) return "";
    return cat.replaceAll("_", " ");
  }, [cat]);

  // Render a clean fallback matching the SSR tree structure exactly
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#090d16] text-slate-200 relative pb-12 flex items-center justify-center">
        <div className="text-center text-xs text-slate-500 py-12">Loading workspace...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-200 relative pb-12">

      {/* Background Ambient Cyber Glows */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[30%] w-[600px] h-[600px] rounded-full bg-emerald-500/[0.02] blur-[150px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/[0.02] blur-[130px]" />
      </div>

      {/* STICKY BLUR CORE HEADER */}
      <header className="sticky top-0 z-50 bg-[#090d16]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 py-3">

          {/* Row 1: Title & Language Toggles */}
          <div className="flex items-center justify-between gap-4 border-b border-white/[0.04] pb-3">
            <div className="min-w-0">
              <h1 className="text-base md:text-xl font-black text-white capitalize tracking-tight truncate min-h-[24px]">
                {displayTitle}
              </h1>

              <div className="flex items-center gap-2 mt-0.5 flex-wrap text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <span className="text-emerald-400 font-black">Written Answers</span>
                <span className="text-white/20">•</span>
                <span className="text-slate-300">{selectedUnit || "All Units"}</span>
                <span className="text-white/20">•</span>
                <span className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-black">
                  {searchedQuestions.length} Matches
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowEnglish(!showEnglish)}
              className="h-9 px-4 rounded-xl text-[10px] font-black uppercase bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-[#090d16] transition-all shadow-lg shadow-emerald-500/10 active:scale-95 whitespace-nowrap"
            >
              Lang: {showEnglish ? "EN" : "BN"}
            </button>
          </div>

          {/* Row 2: CLEAN RESPONSIVE SEARCH & FILTER CONTROLS */}
          <div className="flex flex-col gap-3 pt-3 md:flex-row md:items-center">

            {/* SEARCH CONTAINER WITH BOUNDED MAX-WIDTH ON DESKTOP */}
            <div className="w-full md:w-80 bg-slate-950/40 rounded-xl border border-white/[0.06] shadow-inner focus-within:border-emerald-500/40 transition-colors">
              <SearchBox
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search index keywords or ID..."
                onClear={() => setSearchQuery("")}
              />
            </div>

            {/* HORIZONTAL UNIT SCROLLER FILTER */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5 flex-1 w-full">
              <button
                onClick={() => setSelectedUnit(null)}
                className={`px-3.5 py-2 rounded-xl text-[11px] font-bold border whitespace-nowrap transition-all ${
                  selectedUnit === null
                    ? "bg-white text-[#090d16] border-white shadow-lg shadow-white/5"
                    : "bg-white/[0.02] text-slate-400 border-white/[0.05] hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                All Units
              </button>

              {units.map((unit, index) => (
                <button
                  key={`unit-filter-${unit}-${index}`}
                  onClick={() => setSelectedUnit(unit)}
                  className={`px-3.5 py-2 rounded-xl text-[11px] font-bold border whitespace-nowrap transition-all ${
                    selectedUnit === unit
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/40 shadow-lg shadow-emerald-500/5"
                      : "bg-white/[0.02] text-slate-400 border-white/[0.05] hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>

        </div>
      </header>

      {/* CORE VIEWPORT MAIN */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {searchedQuestions.length > 0 ? (
          <div className="space-y-3">
            {searchedQuestions.map((q, index) => (
              <div
                key={`question-${q.id || "fallback"}-${index}`}
                className="group bg-slate-900/30 backdrop-blur-xl border border-white/[0.05] hover:border-white/[0.1] rounded-2xl p-4 transition-all duration-200 shadow-md"
              >
                <div className="flex items-center justify-between mb-3 w-full">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.06] text-slate-300 flex items-center justify-center text-[10px] font-black group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors">
                      {index + 1}
                    </span>

                    <span className="px-2 py-0.5 rounded-md bg-white/[0.02] border border-white/[0.04] text-slate-400 text-[9px] font-bold tracking-wide">
                      ID #{q.id}
                    </span>

                    <span className="px-2 py-0.5 rounded-md bg-white/[0.02] border border-white/[0.04] text-slate-400 text-[9px] font-bold tracking-wide max-w-[180px] truncate">
                      {q.unit}
                    </span>

                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-black tracking-wider">
                      {showEnglish ? "EN" : "BN"}
                    </span>
                  </div>

                  <svg
                    className="w-3.5 h-3.5 text-slate-600 transition-transform duration-200 group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>

                <h3 className="text-sm md:text-[15px] font-bold text-slate-100 tracking-tight leading-relaxed mb-3">
                  {q.question}
                </h3>

                <div className="rounded-xl border border-white/[0.03] px-3.5 py-3 text-xs md:text-sm leading-relaxed font-medium text-slate-300 bg-slate-950/40 relative overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-emerald-500/40">
                  {showEnglish ? q.answer?.en : q.answer?.bn}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-white/[0.05] bg-slate-900/20 backdrop-blur-xl rounded-2xl p-12 text-center max-w-sm mx-auto mt-12 shadow-xl shadow-black/20">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-xl text-orange-400 mx-auto mb-4">
              🔍
            </div>
            <h2 className="text-sm font-bold text-white tracking-tight">No Dynamic Logs Found</h2>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              No matching database registers found targeting query: <code className="text-orange-400 font-mono">"{searchQuery}"</code>
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default WrittenAnswerPage;