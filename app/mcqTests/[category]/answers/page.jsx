"use client";

import React, { useState, useEffect, useMemo } from "react";
import useMCQ from "@/app/Hooks/useMcq";
import CriteriaDropdown from "@/app/Components/criteriaDropDownList";

const toSentenceCase = (str) => {
  if (!str) return "";
  const decoded = decodeURIComponent(str);
  const clean = decoded.replace(/_/g, " ").trim();
  if (clean.toLowerCase() === "cbta") return "CBTA";
  return clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
};

const McqAnswerPage = ({ params }) => {
  const resolvedParams = React.use(params);
  const cat = resolvedParams?.category;
  const { mcq = [] } = useMCQ();
  
  const [selectedSet, setSelectedSet] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 1. URL Safe Decoding and Capital Normalization Mapping
  const targetCategoryUpper = useMemo(() => {
    if (!cat) return "";
    return decodeURIComponent(cat).replace(/[\s_]/g, "").toUpperCase();
  }, [cat]);

  // 2. Global Core Category Filter
  const categoryQuestions = useMemo(() => {
    if (!mcq.length || !targetCategoryUpper) return [];
    return mcq.filter((q) => {
      if (!q.category) return false;
      return q.category.replace(/[\s_]/g, "").toUpperCase() === targetCategoryUpper;
    });
  }, [mcq, targetCategoryUpper]);

  // 3. Selective Set State Filtering (Returns all if selectedSet is falsy or "")
  const filteredQuestions = useMemo(() => {
    return selectedSet 
      ? categoryQuestions.filter((q) => q.question_set === selectedSet) 
      : categoryQuestions;
  }, [selectedSet, categoryQuestions]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-200 pb-12 relative">
      
      {/* Background Subtle Ambience */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[30%] w-[500px] h-[500px] rounded-full bg-emerald-500/[0.02] blur-[150px]" />
      </div>

      {/* Slim Header */}
      <header className="sticky top-[57px] z-30 bg-[#090d16]/80 backdrop-blur-xl border-b border-white/[0.06] px-4 py-3.5">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 block mb-0.5">Reference Desk</span>
            <h1 className="text-base font-black text-white tracking-tight leading-none">
              {toSentenceCase(cat)} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Answer Key</span>
            </h1>
          </div>

          {/* Premium Dropdown Hook Integration */}
          <CriteriaDropdown
            data={categoryQuestions}
            criteriaKey="question_set"
            selectedValue={selectedSet}
            onSelect={setSelectedSet}
            allLabel="All Sets"
            allValue=""
          />
        </div>
      </header>

      {/* MAIN LAYOUT SPACE */}
      <main className="max-w-4xl mx-auto px-4 mt-6">
        {filteredQuestions.length === 0 ? (
          /* Empty State Display Container */
          <div className="h-[40vh] flex flex-col items-center justify-center text-center bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/[0.04] p-6 shadow-xl shadow-black/10">
            <div className="w-12 h-12 bg-white/[0.03] border border-white/[0.06] rounded-xl flex items-center justify-center text-xl mb-4 shadow-inner">👁</div>
            <h2 className="text-sm font-bold text-slate-300 tracking-tight">No Questions Available</h2>
            <p className="text-slate-500 text-xs max-w-xs mt-1 leading-relaxed">No tracking records are present matching your target parameter categories.</p>
          </div>
        ) : (
          /* Structured Transparent Question Answer Ledger Block */
          <div className="flex flex-col bg-slate-900/40 backdrop-blur-md border border-white/[0.06] rounded-2xl divide-y divide-white/[0.05] overflow-hidden shadow-2xl shadow-black/30">
            {filteredQuestions.map((q, index) => (
              <div key={q.id || index} className="p-5 hover:bg-white/[0.02] transition-colors duration-150">
                
                {/* Question Row Segment */}
                <div className="flex gap-3 mb-4 items-start">
                  <span className="shrink-0 font-black text-slate-500 text-xs w-6 pt-0.5">
                    {String(index + 1).padStart(2, '0')}.
                  </span>
                  <p className="text-xs md:text-sm font-bold text-slate-100 leading-relaxed tracking-wide">
                    {q.question}
                  </p>
                </div>

                {/* Options Layout Deck */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 ml-9">
                  {q.options && q.options.map((option, i) => {
                    const isCorrect = option === q.correct_answer;
                    return (
                      <div 
                        key={i}
                        className={`text-xs py-1.5 px-3 rounded-lg flex items-center gap-2.5 transition-all duration-150 border ${
                          isCorrect 
                            ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 font-bold shadow-md shadow-emerald-950/20" 
                            : "text-slate-400 border-transparent font-medium"
                        }`}
                      >
                        {/* Option Tag Bubble */}
                        <span className={`uppercase text-[10px] w-4 h-4 flex items-center justify-center rounded font-black select-none tracking-none shrink-0 ${
                          isCorrect 
                            ? "bg-emerald-500 text-slate-950" 
                            : "bg-white/[0.04] text-slate-400 border border-white/[0.06]"
                        }`}>
                          {String.fromCharCode(65 + i)}
                        </span>
                        
                        <span className="leading-snug tracking-wide truncate">{option}</span>
                        
                        {isCorrect && (
                          <span className="text-[10px] ml-auto bg-emerald-400/20 px-1 rounded text-emerald-400 font-normal">
                            KEY ✔
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default McqAnswerPage;