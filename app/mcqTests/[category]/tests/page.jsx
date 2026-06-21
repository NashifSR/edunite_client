"use client";

import React, { useState, useMemo } from "react";
import useMCQ from "@/app/Hooks/useMcq";
import McqQuestionList from "../../Components/McqQuestionList";
import CriteriaDropdown from "@/app/Components/criteriaDropDownList";

const toSentenceCase = (str) => {
  if (!str) return "";
  const decoded = decodeURIComponent(str);
  const clean = decoded.replace(/_/g, " ").trim();
  if (clean.toLowerCase() === "cbta") return "CBTA";
  return clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
};

const McqTestPage = ({ params }) => {
  const unwrappedParams = React.use(params);
  const { category: cat } = unwrappedParams;
  
  const { mcq = [], isLoading, isError } = useMCQ();
  const [mcqKey, setMcqKey] = useState(0);
  const [selectedSet, setSelectedSet] = useState("");
  const [result, setResult] = useState(null);

  // 1. NORMALIZE ROUTE SLUG
  const targetCategoryUpper = useMemo(() => {
    if (!cat) return "";
    return decodeURIComponent(cat).replace(/[\s_]/g, "").toUpperCase();
  }, [cat]);

  // 2. FILTER ALL QUESTIONS MATCHING THE DYNAMIC ROUTE CATEGORY
  const categoryQuestions = useMemo(() => {
    if (!mcq.length || !targetCategoryUpper) return [];
    return mcq.filter((item) => {
      if (!item.category) return false;
      return item.category.replace(/[\s_]/g, "").toUpperCase() === targetCategoryUpper;
    });
  }, [mcq, targetCategoryUpper]);

  // 3. FILTER QUESTIONS BY SELECTIVE DROPDOWN SELECTION
  const filteredQuestions = useMemo(() => {
    return selectedSet 
      ? categoryQuestions.filter((q) => q.question_set === selectedSet) 
      : categoryQuestions;
  }, [selectedSet, categoryQuestions]);

  const handleSubmit = ({ answers }) => {
    let correctCount = 0;
    answers.forEach((answer) => {
      const rightAnswer = filteredQuestions.find((q) => q.id == answer.id);
      if (rightAnswer && answer.selectedOption === rightAnswer.correct_answer) {
        correctCount += 1;
      }
    });

    const total = filteredQuestions.length;
    const percentage = total > 0 ? ((correctCount / total) * 100).toFixed(0) : "0";

    const resultConfig = {
      "100": { message: "Mastery achieved!", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
      "80":  { message: "Excellent work!", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
      "50":  { message: "Passing grade.", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
      "0":   { message: "Keep practicing.", color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20" },
    };

    const key = percentage === "100" ? "100" : percentage >= 80 ? "80" : percentage >= 50 ? "50" : "0";

    setResult({
      setName: selectedSet,
      correctCount,
      total,
      percentage,
      ...resultConfig[key]
    });
  };

  if (isLoading) return <div className="min-h-screen bg-[#090d16] text-slate-200 flex items-center justify-center text-xs text-slate-500 tracking-wide font-mono animate-pulse">Parsing evaluation metrics...</div>;
  if (isError) return <div className="min-h-screen bg-[#090d16] flex items-center justify-center p-4">Extraction Fault.</div>;

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-200 p-8 flex flex-col relative">
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/[0.03] blur-[120px]" />
      </div>

      <header className="w-full bg-[#090d16]/80 backdrop-blur-xl border-b border-white/[0.06] p-4 sticky top-0 md:top-[57px] z-40">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 ring-4 ring-blue-500/10"></span>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Verification Unit</span>
            </div>
            <h1 className="text-lg font-black text-white leading-none tracking-tight">{toSentenceCase(cat)}</h1>
          </div>

          {/* New Modular Dropdown Implementation */}
          <div className="w-full sm:w-56">
            <CriteriaDropdown
              data={categoryQuestions}
              criteriaKey="question_set"
              selectedValue={selectedSet}
              onSelect={(val) => {
                setSelectedSet(val);
                setResult(null);
                setMcqKey((prev) => prev + 1);
              }}
              allLabel="Select an Assessment Set"
              allValue=""
            />
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8 relative">
        <div className="max-w-3xl mx-auto">
          {!selectedSet ? (
            <div className="h-[50vh] flex flex-col items-center justify-center text-center bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/[0.04] p-6 shadow-xl shadow-black/10">
              <div className="w-12 h-12 bg-white/[0.03] border border-white/[0.06] rounded-xl flex items-center justify-center text-xl mb-4 shadow-inner">🎯</div>
              <h2 className="text-lg font-bold text-white tracking-tight">Select an Assessment Set</h2>
              <p className="text-slate-400 text-xs max-w-xs mt-1.5 leading-relaxed">Pick a set from the menu above to initiate the evaluation block.</p>
            </div>
          ) : (
            <div className="space-y-4">
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

      {/* Result Modal remains as is */}
      {result && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-[200] p-4">
          {/* ... Modal content */}
        </div>
      )}
    </div>
  );
};

export default McqTestPage;