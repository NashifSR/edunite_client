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
    let message = "";
    let color = "";

    if (percentage === "100") { message = "Perfect score! Amazing job!"; color = "text-emerald-500"; }
    else if (percentage >= 80) { message = "Great work! Keep it up!"; color = "text-blue-500"; }
    else if (percentage >= 50) { message = "Good effort! Try for 80%!"; color = "text-orange-500"; }
    else { message = "Don't worry, keep practicing!"; color = "text-red-500"; }

    setResult({
      setName: selectedSet,
      correctCount,
      total: filteredQuestions.length,
      percentage,
      message,
      color
    });
  };

  const closeModal = () => {
    setResult(null);
    setMcqKey((prev) => prev + 1);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Slim Selection Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-xl font-black text-slate-900 tracking-tight capitalize">
            {cat.replace("_", " ")} <span className="text-blue-600">Assessment</span>
          </h1>

          <select
            className="w-full sm:w-64 bg-slate-100 border-none rounded-xl px-4 py-2 text-sm font-bold text-slate-700 outline-none ring-2 ring-transparent focus:ring-blue-500 transition-all cursor-pointer"
            value={selectedSet}
            onChange={(e) => setSelectedSet(e.target.value)}
          >
            <option value="">Choose Question Set</option>
            {sets.map((setName) => (
              <option key={setName} value={setName}>{setName}</option>
            ))}
          </select>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-6 mt-10">
        {!selectedSet ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-bold">Select a set to begin the test.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-2 sm:p-6">
            <McqQuestionList
              key={mcqKey}
              questions={filteredQuestions}
              onSubmit={handleSubmit}
              selectedSet={selectedSet}
            />
          </div>
        )}
      </main>

      {/* Modern Result Modal */}
      {result && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm z-50 p-4">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl text-center animate-in zoom-in duration-300">
            <div className={`text-5xl mb-4 ${result.color}`}>
              {result.percentage >= 80 ? "🏆" : "📝"}
            </div>
            
            <h2 className="text-3xl font-black text-slate-900 mb-2">Result</h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">{result.setName}</p>
            
            <div className="bg-slate-50 rounded-2xl py-6 mb-6">
              <p className="text-5xl font-black text-slate-900 mb-1">{result.percentage}%</p>
              <p className="text-sm font-bold text-slate-500">
                {result.correctCount} / {result.total} Correct
              </p>
            </div>

            <p className={`font-bold mb-8 ${result.color}`}>{result.message}</p>
            
            <button
              onClick={closeModal}
              className="w-full bg-slate-900 hover:bg-blue-600 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-blue-100"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default McqSetPage;