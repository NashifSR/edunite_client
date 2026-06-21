"use client";

import React from "react";

const SetupView = ({ selectedUnit, randomQuestions, timePerQuestion, setTimePerQuestion, startQuiz }) => {
  if (!selectedUnit) {
    return (
      <div className="max-w-md mx-auto mt-6 border border-white/[0.06] bg-slate-900/20 backdrop-blur-xl rounded-2xl p-12 text-center shadow-xl">
        <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-xl text-orange-400 mx-auto mb-4">📝</div>
        <h2 className="text-sm font-bold text-white tracking-tight">Select a Vector Unit</h2>
        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">Choose an available block above to construct a random dynamic trial.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-6 bg-slate-900/30 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-5 shadow-xl">
      <div className="grid grid-cols-3 gap-2.5 mb-5 text-center">
        <div className="bg-slate-950/40 border border-white/[0.04] rounded-xl p-3">
          <p className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Questions</p>
          <p className="text-base font-black text-white mt-0.5">{randomQuestions.length}</p>
        </div>
        <div className="bg-slate-950/40 border border-white/[0.04] rounded-xl p-3 min-w-0">
          <p className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Unit</p>
          <p className="text-xs font-bold text-white truncate mt-1">{selectedUnit}</p>
        </div>
        <div className="bg-slate-950/40 border border-white/[0.04] rounded-xl p-3">
          <p className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Limit</p>
          <p className="text-base font-black text-white mt-0.5">{Math.floor((timePerQuestion * randomQuestions.length) / 60)}m</p>
        </div>
      </div>

      <div className="mb-5">
        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Configure Cadence</p>
        <div className="grid grid-cols-4 gap-2">
          {[60, 90, 120, 180].map((sec) => (
            <button
              key={sec}
              onClick={() => setTimePerQuestion(sec)}
              className={`h-9 rounded-xl text-[11px] font-bold border transition-all ${
                timePerQuestion === sec ? "bg-orange-500/10 text-orange-400 border-orange-500/40" : "bg-white/[0.02] text-slate-400 border-white/[0.05] hover:text-white"
              }`}
            >
              {sec / 60}m/q
            </button>
          ))}
        </div>
      </div>

      <button onClick={startQuiz} className="w-full h-11 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#090d16] text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/10 active:scale-98">
        Initiate Simulator
      </button>
    </div>
  );
};

export default SetupView;