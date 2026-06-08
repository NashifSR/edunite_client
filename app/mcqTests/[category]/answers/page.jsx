"use client";

import React, { useState, useEffect, useMemo } from "react";
import useMCQ from "@/app/Hooks/useMcq";

const McqAnswerPage = ({ params }) => {
  const { category: cat } = React.use(params);
  const { mcq } = useMCQ();
  
  const [selectedSet, setSelectedSet] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const mcqQuestionSet = useMemo(() => mcq?.[cat] || [], [mcq, cat]);
  const sets = useMemo(() => [...new Set(mcqQuestionSet.map((item) => item.question_set))], [mcqQuestionSet]);

  const filteredQuestions = useMemo(() => 
    selectedSet ? mcqQuestionSet.filter((q) => q.question_set === selectedSet) : [],
    [selectedSet, mcqQuestionSet]
  );

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-200 pb-12 relative">
      
      {/* Background Subtle Ambience */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[30%] w-[500px] h-[500px] rounded-full bg-emerald-500/[0.02] blur-[150px]" />
      </div>

      {/* Slim Header - Synced exactly with Navbar sticky layout */}
      <header className="sticky top-[57px] z-30 bg-[#090d16]/80 backdrop-blur-xl border-b border-white/[0.06] px-4 py-3.5">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 block mb-0.5">Reference Desk</span>
            <h1 className="text-base font-black text-white capitalize tracking-tight leading-none">
              {cat.replace("_", " ")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Answer Key</span>
            </h1>
          </div>

          {/* Premium Modern Select Component */}
          <div className="relative group">
            <select
              className="bg-slate-900/90 hover:bg-slate-900 border border-white/[0.08] hover:border-white/[0.15] text-slate-200 rounded-xl px-4 py-2 text-xs font-bold outline-none transition-all duration-200 cursor-pointer appearance-none pr-8 min-w-[130px]"
              value={selectedSet}
              onChange={(e) => setSelectedSet(e.target.value)}
            >
              <option value="" className="bg-[#090d16]">Select Set</option>
              {sets.map((setName) => (
                <option key={setName} value={setName} className="bg-[#090d16]">{setName}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-slate-200 transition-colors text-[10px]">
              ▼
            </div>
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT SPACE */}
      <main className="max-w-4xl mx-auto px-4 mt-6">
        {!selectedSet ? (
          /* Empty State Display Container */
          <div className="h-[40vh] flex flex-col items-center justify-center text-center bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/[0.04] p-6 shadow-xl shadow-black/10">
            <div className="w-12 h-12 bg-white/[0.03] border border-white/[0.06] rounded-xl flex items-center justify-center text-xl mb-4 shadow-inner">👁</div>
            <h2 className="text-sm font-bold text-slate-300 tracking-tight">Awaiting Set Selection</h2>
            <p className="text-slate-500 text-xs max-w-xs mt-1 leading-relaxed">Choose an available evaluation set tracking map from the dashboard drop deck above to audit standard core options.</p>
          </div>
        ) : (
          /* Structured Transparent Question Answer Ledger Block */
          <div className="flex flex-col bg-slate-900/40 backdrop-blur-md border border-white/[0.06] rounded-2xl divide-y divide-white/[0.05] overflow-hidden shadow-2xl shadow-black/30">
            {filteredQuestions.map((q, index) => (
              <div key={q.id} className="p-5 hover:bg-white/[0.02] transition-colors duration-150">
                
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
                  {q.options.map((option, i) => {
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