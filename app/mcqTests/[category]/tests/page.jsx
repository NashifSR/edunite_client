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
    const resultConfig = {
      "100": { message: "Mastery achieved!", color: "text-emerald-500", bg: "bg-emerald-50" },
      "80": { message: "Excellent work!", color: "text-blue-500", bg: "bg-blue-50" },
      "50": { message: "Passing grade.", color: "text-orange-500", bg: "bg-orange-50" },
      "0": { message: "Keep practicing.", color: "text-red-500", bg: "bg-red-50" },
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
    <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row">
      
      {/* SIDEBAR: Responsive Selection */}
      <aside className="w-full md:w-80 bg-white border-b md:border-r border-slate-200 p-5 md:p-6 flex flex-col sticky top-0 z-50 md:h-screen">
        <div className="mb-4 md:mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="text-[9px] font-black uppercase tracking-tighter text-slate-400">Verification</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 leading-tight capitalize">
            {cat.replace("_", " ")}
          </h1>
        </div>

        {/* Scrollable Container for Mobile (Horizontal) and Desktop (Vertical) */}
        <div className="flex md:flex-col overflow-x-auto md:overflow-y-auto gap-2 pb-2 md:pb-0 scrollbar-hide">
          <p className="hidden md:block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Available Sets</p>
          
          {sets.map((setName) => (
            <button
              key={setName}
              onClick={() => {
                setSelectedSet(setName);
                setResult(null);
                setMcqKey(prev => prev + 1);
              }}
              className={`whitespace-nowrap px-4 py-2.5 md:py-3 rounded-xl border transition-all duration-200 flex items-center justify-between group flex-shrink-0 md:flex-shrink ${
                selectedSet === setName 
                ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100" 
                : "bg-white border-slate-100 text-slate-600 hover:border-blue-300 hover:bg-slate-50"
              }`}
            >
              <span className="text-xs md:text-sm font-bold">{setName}</span>
              <svg className={`hidden md:block w-4 h-4 ml-2 ${selectedSet === setName ? "text-white" : "text-slate-300 group-hover:text-blue-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>

        {/* Hidden on Mobile to save space */}
        <div className="hidden md:block mt-auto pt-6 border-t border-slate-100">
            <div className="bg-slate-900 rounded-2xl p-4 text-white">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Database</p>
                <p className="text-sm font-bold">{mcqQuestionSet.length} Questions Loaded</p>
            </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 md:p-10 relative">
        <div className="max-w-4xl mx-auto">
          {!selectedSet ? (
            <div className="h-[50vh] md:h-[60vh] flex flex-col items-center justify-center text-center bg-white rounded-[2.5rem] border border-slate-200 shadow-sm px-6 mt-4">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl mb-4">👆</div>
              <h2 className="text-xl font-black text-slate-800">Select a Set</h2>
              <p className="text-slate-500 text-sm max-w-xs mt-2">Pick a category above to start the assessment.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Active Header (Optional - Can hide on mobile if redundant) */}
              <div className="hidden md:flex bg-white rounded-2xl border border-slate-200 p-4 items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Active Test</p>
                  <h2 className="text-lg font-black text-slate-900">{selectedSet}</h2>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Items</p>
                  <p className="text-lg font-black text-slate-900">{filteredQuestions.length}</p>
                </div>
              </div>

              {/* Question List Container */}
              <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
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

      {/* Result Modal remains the same */}
      {result && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-md z-[100] p-4">
          {/* ... Modal Content ... */}
          <div className="bg-white rounded-[3rem] p-1 shadow-2xl max-w-sm w-full">
            <div className={`${result.bg} p-8 rounded-[2.8rem] text-center`}>
              <h2 className="text-4xl font-black text-slate-900">{result.percentage}%</h2>
              <p className={`text-sm font-bold mb-6 ${result.color}`}>{result.message}</p>
              <button
                onClick={() => { setResult(null); setMcqKey(prev => prev + 1); }}
                className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl"
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