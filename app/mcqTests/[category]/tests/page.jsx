"use client";

import React, { useState, useEffect, useMemo } from "react";
import McqQuestionList from "@/app/Components/McqQuestionList";
import useMCQ from "@/app/Hooks/useMcq";

const McqSetPage = ({ params }) => {
  const { category: cat } = React.use(params);
  const { mcq } = useMCQ();
  const [mcqKey, setMcqKey] = useState(0);
  const [selectedSet, setSelectedSet] = useState("");
  const [result, setResult] = useState(null);
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

  const handleSubmit = ({ answers }) => {
    let correctCount = 0;
    answers.forEach((answer) => {
      const rightAnswer = filteredQuestions.find((q) => q.id == answer.id);
      if (rightAnswer && answer.selectedOption === rightAnswer.correct_answer) {
        correctCount += 1;
      }
    });

    const percentage = ((correctCount / filteredQuestions.length) * 100).toFixed(0);
    
    // High-contrast, theme-appropriate modal configs
    const resultConfig = {
      "100": { message: "Mastery achieved!", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
      "80": { message: "Excellent work!", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
      "50": { message: "Passing grade.", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
      "0": { message: "Keep practicing.", color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20" },
    };

    const key = percentage === "100" ? "100" : percentage >= 80 ? "80" : percentage >= 50 ? "50" : "0";

    setResult({
      setName: selectedSet,
      correctCount,
      total: filteredQuestions.length,
      percentage,
      ...resultConfig[key]
    });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-200 flex flex-col md:flex-row relative">
      
      {/* Background Subtle Glows */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/[0.03] blur-[120px]" />
      </div>

      {/* SIDEBAR: Ultra-Sleek Glass Selection */}
      <aside className="w-full md:w-80 bg-[#090d16]/80 backdrop-blur-xl border-b md:border-b-0 md:border-r border-white/[0.06] p-5 md:p-6 flex flex-col sticky top-0 md:top-[57px] z-40 md:h-[calc(100vh-57px)]">
        <div className="mb-4 md:mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 ring-4 ring-blue-500/10"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Verification</span>
          </div>
          <h1 className="text-xl font-black text-white leading-tight capitalize tracking-tight">
            {cat.replace("_", " ")}
          </h1>
        </div>

        {/* Action Options List */}
        <div className="flex md:flex-col overflow-x-auto md:overflow-y-auto gap-2 pb-2 md:pb-4 scrollbar-hide">
          <p className="hidden md:block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Available Sets</p>
          
          {sets.map((setName) => (
            <button
              key={setName}
              onClick={() => {
                setSelectedSet(setName);
                setResult(null);
                setMcqKey(prev => prev + 1);
              }}
              className={`whitespace-nowrap px-4 py-2.5 md:py-3 rounded-xl border transition-all duration-300 flex items-center justify-between group flex-shrink-0 md:flex-shrink ${
                selectedSet === setName 
                  ? "bg-blue-600/10 border-blue-500/40 text-blue-400 shadow-lg shadow-black/20" 
                  : "bg-slate-900/40 border-white/[0.04] text-slate-300 hover:border-white/[0.1] hover:bg-slate-900/80"
              }`}
            >
              <span className="text-xs font-bold tracking-wide">{setName}</span>
              <svg className={`hidden md:block w-3.5 h-3.5 ml-2 transition-transform duration-200 group-hover:translate-x-0.5 ${selectedSet === setName ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>

        {/* Database Stats Plate */}
        <div className="hidden md:block mt-auto pt-4 border-t border-white/[0.06]">
          <div className="bg-slate-900/60 border border-white/[0.04] rounded-xl p-3.5 flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Database</p>
              <p className="text-xs font-bold text-slate-300 mt-0.5">{mcqQuestionSet.length} Items Loaded</p>
            </div>
            <span className="text-sm select-none">📁</span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT WORKSPACE */}
      <main className="flex-1 p-4 md:p-8 relative">
        <div className="max-w-3xl mx-auto">
          {!selectedSet ? (
            /* Empty State Container */
            <div className="h-[45vh] md:h-[60vh] flex flex-col items-center justify-center text-center bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/[0.04] p-6 mt-2 shadow-xl shadow-black/10">
              <div className="w-12 h-12 bg-white/[0.03] border border-white/[0.06] rounded-xl flex items-center justify-center text-xl mb-4 shadow-inner">👆</div>
              <h2 className="text-lg font-bold text-white tracking-tight">Select an Assessment Set</h2>
              <p className="text-slate-400 text-xs max-w-xs mt-1.5 leading-relaxed">Pick one of the available question structures listed in the module deck to clear the unit.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Active Header Dashboard Banner */}
              <div className="hidden md:flex bg-slate-900/60 backdrop-blur-md rounded-2xl border border-white/[0.05] p-4 items-center justify-between shadow-lg shadow-black/10">
                <div>
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Active Test</p>
                  <h2 className="text-base font-bold text-white tracking-tight mt-0.5">{selectedSet}</h2>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Items</p>
                  <p className="text-base font-black text-slate-200 mt-0.5">{filteredQuestions.length} Qs</p>
                </div>
              </div>

              {/* Question Form Stream Component Wrapper */}
              <div className="bg-slate-900/20 rounded-2xl border border-white/[0.04] overflow-hidden shadow-2xl shadow-black/20">
                <McqQuestionList
                  key={mcqKey}
                  questions={filteredQuestions}
                  onSubmit={handleSubmit}
                  selectedSet={selectedSet}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Evaluation Results Modal Layer */}
      {result && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-[200] p-4 animate-fade-in">
          <div className="bg-slate-900 border border-white/[0.08] rounded-2xl p-1 shadow-2xl max-w-sm w-full overflow-hidden shadow-black/80">
            <div className={`${result.bg} border p-6 rounded-xl text-center backdrop-blur-xl flex flex-col items-center justify-center`}>
              <h2 className="text-4xl font-black text-white tracking-tight">{result.percentage}%</h2>
              <p className={`text-xs font-bold uppercase tracking-wider mt-1.5 mb-6 ${result.color}`}>{result.message}</p>
              
              <button
                onClick={() => { setResult(null); setMcqKey(prev => prev + 1); }}
                className="w-full bg-white text-slate-950 font-black text-xs uppercase tracking-widest py-3.5 rounded-xl hover:bg-slate-200 transition-colors duration-200 active:scale-[0.99]"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default McqSetPage;