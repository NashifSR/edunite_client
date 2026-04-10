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
    <div className="min-h-screen bg-white pb-10">
      {/* Slim Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <h1 className="text-lg font-bold text-slate-900 capitalize leading-none">
            {cat.replace("_", " ")} <span className="text-emerald-600">Key</span>
          </h1>

          <select
            className="bg-slate-100 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 outline-none border border-slate-200"
            value={selectedSet}
            onChange={(e) => setSelectedSet(e.target.value)}
          >
            <option value="">Select Set</option>
            {sets.map((setName) => (
              <option key={setName} value={setName}>{setName}</option>
            ))}
          </select>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-6">
        {!selectedSet ? (
          <p className="text-center text-slate-400 text-sm mt-20">Select a set to view answers.</p>
        ) : (
          <div className="flex flex-col border border-slate-200 rounded-lg divide-y divide-slate-200">
            {filteredQuestions.map((q, index) => (
              <div key={q.id} className="p-4 hover:bg-slate-50 transition-colors">
                {/* Question Line */}
                <div className="flex gap-3 mb-3">
                  <span className="shrink-0 font-black text-slate-400 text-sm w-6">
                    {index + 1}.
                  </span>
                  <p className="text-sm font-semibold text-slate-800 leading-snug">
                    {q.question}
                  </p>
                </div>

                {/* Options Grid - Compact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 ml-9">
                  {q.options.map((option, i) => {
                    const isCorrect = option === q.correct_answer;
                    return (
                      <div 
                        key={i}
                        className={`text-xs py-1 flex items-center gap-2 ${
                          isCorrect ? "text-emerald-600 font-bold" : "text-slate-400 font-medium"
                        }`}
                      >
                        <span className={`uppercase w-4 h-4 flex items-center justify-center rounded ${isCorrect ? "bg-emerald-600 text-white" : "bg-slate-100"}`}>
                          {String.fromCharCode(65 + i)}
                        </span>
                        {option}
                        {isCorrect && <span className="text-[10px] ml-1">✔</span>}
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