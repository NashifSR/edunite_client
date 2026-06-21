"use client";

import React from "react";

const QuestionCard = ({ q, index, answer, onAnswerChange }) => {
  return (
    <div className="group bg-slate-900/30 backdrop-blur-xl border border-white/[0.05] focus-within:border-orange-500/30 rounded-2xl p-4 md:p-5 transition-all duration-200 shadow-md">
      <div className="flex items-center gap-2 flex-wrap mb-3 text-[10px] font-bold uppercase tracking-wider">
        <span className="w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.06] text-slate-300 flex items-center justify-center text-xs font-black group-focus-within:text-orange-400 group-focus-within:border-orange-500/30 transition-colors">
          {index + 1}
        </span>
        <span className="text-slate-500">ID #{q.id}</span>
        {q.keywords && q.keywords.length > 0 && (
          <>
            <span className="text-white/20">•</span>
            <span className="text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded border border-orange-500/20">
              {q.keywords.length} Target Tokens
            </span>
          </>
        )}
      </div>

      <h3 className="text-sm md:text-[15px] font-bold text-slate-100 tracking-tight leading-relaxed mb-3">
        {q.question}
      </h3>

      <textarea
        value={answer}
        onChange={(e) => onAnswerChange(q.id, e.target.value)}
        placeholder="Type architectural input answer details..."
        className="w-full min-h-[110px] rounded-xl border border-white/[0.06] bg-slate-950/40 px-4 py-3 text-xs md:text-sm text-slate-200 leading-relaxed outline-none focus:border-orange-500/40 focus:bg-[#0c121e] resize-none transition-all placeholder:text-slate-600"
      />
    </div>
  );
};

export default QuestionCard;