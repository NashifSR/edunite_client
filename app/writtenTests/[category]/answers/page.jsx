"use client";

import React, { useState, useMemo } from "react";
import useShortQuestions from "@/app/Hooks/useShortQuestions";
import SearchBox from "@/app/SharedComponents/SearchBox";
import CriteriaDropdown from "@/app/Components/criteriaDropDownList";

const toSentenceCase = (str) => {
  if (!str) return "";
  const decoded = decodeURIComponent(str);
  const clean = decoded.replace(/_/g, " ").trim();
  if (clean.toLowerCase() === "cbta") return "CBTA";
  return clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
};

const WrittenAnswerPage = ({ params }) => {
  const resolvedParams = React.use(params);
  const cat = resolvedParams?.category;
  
  const { shortQuestions = [] } = useShortQuestions();

  const [selectedUnit, setSelectedUnit] = useState(null);
  const [showEnglish, setShowEnglish] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // 1. URL Safe Decoding and Capital Normalization Mapping
  const targetCategoryUpper = useMemo(() => {
    if (!cat) return "";
    return decodeURIComponent(cat).replace(/[\s_]/g, "").toUpperCase();
  }, [cat]);

  // 2. Global Core Category Filter
  const categoryQuestions = useMemo(() => {
    if (!shortQuestions.length || !targetCategoryUpper) return [];
    return shortQuestions.filter((q) => {
      if (!q.category) return false;
      return q.category.replace(/[\s_]/g, "").toUpperCase() === targetCategoryUpper;
    });
  }, [shortQuestions, targetCategoryUpper]);

  // 3. Selective State Filtering
  const filteredQuestions = useMemo(() => {
    return selectedUnit
      ? categoryQuestions.filter((q) => q.unit === selectedUnit)
      : categoryQuestions;
  }, [selectedUnit, categoryQuestions]);

  // 4. Client Metric Search Query Filter
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

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-200 relative pb-12">
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[30%] w-[600px] h-[600px] rounded-full bg-emerald-500/[0.02] blur-[150px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/[0.02] blur-[130px]" />
      </div>

      <header className="sticky top-0 z-50 bg-[#090d16]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4 border-b border-white/[0.04] pb-3">
            <div className="min-w-0">
              <h1 className="text-base md:text-xl font-black text-white tracking-tight truncate min-h-[24px]">
                {toSentenceCase(cat)}
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

          <div className="flex flex-col gap-3 pt-3 md:flex-row md:items-center">
            <div className="w-full md:w-80 bg-slate-950/40 rounded-xl border border-white/[0.06] shadow-inner focus-within:border-emerald-500/40 transition-colors">
              <SearchBox
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search index keywords or ID..."
                onClear={() => setSearchQuery("")}
              />
            </div>

            {/* Clean Dropdown Deployment Hook */}
            <CriteriaDropdown 
              data={categoryQuestions}
              criteriaKey="unit"
              selectedValue={selectedUnit}
              onSelect={setSelectedUnit}
              allLabel="All Units"
            />
          </div>
        </div>
      </header>

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