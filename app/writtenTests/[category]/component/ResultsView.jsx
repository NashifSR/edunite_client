"use client";

import React from "react";

const ResultsView = ({ randomQuestions, answers, results, copyFn, copied }) => {
  const totalQuestions = randomQuestions.length;
  const fullyCorrect = Object.values(results).filter((r) => r.correct).length;
  const totalScore = Object.values(results).reduce((acc, curr) => acc + curr.score, 0);
  const totalPossible = Object.values(results).reduce((acc, curr) => acc + curr.total, 0);
  const finalPercentage = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-200 relative pb-24">
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[30%] w-[600px] h-[600px] rounded-full bg-emerald-500/[0.02] blur-[150px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-orange-500/[0.02] blur-[130px]" />
      </div>

      <header className="sticky top-0 z-50 bg-[#090d16]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-base md:text-lg font-black text-white tracking-tight">Quiz Results</h1>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mt-0.5">Keyword evaluation logic</p>
          </div>
          <div className="text-right">
            <p className="text-lg md:text-xl font-black text-emerald-400">{finalPercentage}%</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{fullyCorrect}/{totalQuestions} Correct</p>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 pt-6">
        <button onClick={copyFn} className="h-10 px-4 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:text-white transition-all text-xs font-bold uppercase tracking-wider text-slate-300 shadow-md">
          {copied ? "Copied to Clipboard!" : "Copy Full Breakdown"}
        </button>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-4 space-y-4">
        {randomQuestions.map((q, index) => {
          const result = results[q.id] || { score: 0, total: 0, percentage: 0, matched: [], missing: [] };
          return (
            <div key={q.id} className="group bg-slate-900/30 backdrop-blur-xl border border-white/[0.05] hover:border-white/[0.08] rounded-2xl p-4 md:p-5 transition-all duration-200 shadow-lg">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] text-slate-300 flex items-center justify-center text-xs font-black shrink-0 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-sm md:text-[15px] font-bold text-slate-100 tracking-tight leading-relaxed">{q.question}</h2>
                  <div className="flex items-center gap-2 mt-2 flex-wrap text-[10px] font-bold uppercase tracking-wider">
                    <span className="text-slate-500">ID #{q.id}</span>
                    <span className="text-white/20">•</span>
                    <span className="text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded border border-orange-500/20">{result.score}/{result.total} Score</span>
                    <span className="text-white/20">•</span>
                    <span className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">{result.percentage}% Match</span>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-1.5">Your Answer</p>
                <div className="border border-white/[0.06] rounded-xl px-3.5 py-2.5 text-xs md:text-sm leading-relaxed text-slate-300 bg-slate-950/40">
                  {answers[q.id] || <span className="text-red-400 italic">No answer submitted</span>}
                </div>
              </div>

              <div className="mb-3">
                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-1.5">Expected Answer</p>
                <div className="border border-white/[0.03] rounded-xl px-3.5 py-2.5 text-xs md:text-sm leading-relaxed text-slate-300 bg-emerald-500/[0.02] relative overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-emerald-500/30">
                  {q.answer?.en}
                </div>
              </div>

              {q.keywords && q.keywords.length > 0 && (
                <div className="grid md:grid-cols-2 gap-4 pt-1 border-t border-white/[0.04]">
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-2">Matched Keywords</p>
                    <div className="flex flex-wrap gap-1.5">
                      {result.matched.length > 0 ? (
                        result.matched.map((word) => (
                          <span key={word} className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wide">
                            {word}
                          </span>
                        ))
                      ) : <span className="text-[11px] italic text-slate-500">None</span>}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-2">Missing Keywords</p>
                    <div className="flex flex-wrap gap-1.5">
                      {result.missing.length > 0 ? (
                        result.missing.map((word) => (
                          <span key={word} className="px-2 py-0.5 rounded-md border border-orange-500/20 bg-orange-500/10 text-orange-400 text-[10px] font-bold uppercase tracking-wide">
                            {word}
                          </span>
                        ))
                      ) : <span className="text-[11px] italic text-emerald-400 font-bold">Perfect match (None missing)</span>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <div className="grid sm:grid-cols-2 gap-3 pt-4">
          <button onClick={copyFn} className="h-11 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-xs font-black uppercase tracking-wider text-slate-200 transition-all active:scale-98">
            {copied ? "Copied" : "Copy Diagnostics"}
          </button>
          <button onClick={() => window.location.reload()} className="h-11 rounded-xl bg-orange-500 hover:bg-orange-400 text-black text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-orange-500/10 active:scale-98">
            Try Another Session
          </button>
        </div>
      </main>
    </div>
  );
};

export default ResultsView;