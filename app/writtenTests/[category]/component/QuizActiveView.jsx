"use client";

import React from "react";
import QuestionCard from "./QuestionCard";

const QuizActiveView = ({ randomQuestions, answers, handleAnswerChange, copyFn, copied }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={copyFn}
          className="h-9 px-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-[10px] font-bold uppercase tracking-wider text-slate-300 transition-all"
        >
          {copied ? "Copied" : "Copy Matrix"}
        </button>
      </div>

      <div className="space-y-4">
        {randomQuestions.map((q, index) => (
          <QuestionCard
            key={q.id}
            q={q}
            index={index}
            answer={answers[q.id] || ""}
            onAnswerChange={handleAnswerChange}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizActiveView;