"use client";

import React, { useState, useEffect, useRef } from "react";
import QuestionCards from "./QuestionCards";

const McqQuestionList = ({ questions, selectedSet, onSubmit }) => {
  const [answers, setAnswers] = useState({});
  const [timerOption, setTimerOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerOption) setTimeLeft(timerOption * questions.length);
  }, [timerOption, questions.length]);

  useEffect(() => {
    if (!quizStarted || timeLeft <= 0) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [quizStarted, timeLeft]);

  const handleOptionChange = (id, option) =>
    setAnswers((prev) => ({ ...prev, [id]: option }));

  const handleFinalSubmit = () => {
    const submittedData = Object.entries(answers).map(([id, selectedOption]) => ({
      id: Number(id),
      selectedOption,
    }));
    onSubmit({ selectedSet, answers: submittedData });
    clearInterval(timerRef.current);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!questions.length) return null;

  // --- SETUP PHASE ---
  if (!quizStarted) {
    return (
      <div className="max-w-md mx-auto my-16 bg-white rounded-[2rem] border border-slate-200 p-10 shadow-sm text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-xl mb-6 shadow-lg shadow-blue-100">
          <span className="text-xl font-bold">?</span>
        </div>
        
        <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Ready to Start?</h2>
        <p className="text-slate-500 leading-relaxed mb-10">
          Choose how much time you need. We'll set the timer based on the <span className="font-bold text-slate-700">{questions.length} questions</span> in this set.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-10">
          {[15, 30, 45].map((sec) => (
            <button
              key={sec}
              onClick={() => setTimerOption(sec)}
              className={`group flex flex-col items-center py-5 rounded-2xl border-2 transition-all duration-200 ${
                timerOption === sec
                  ? "border-blue-600 bg-blue-50/50"
                  : "border-slate-100 bg-white hover:border-slate-300"
              }`}
            >
              <span className={`text-xl font-black ${timerOption === sec ? "text-blue-600" : "text-slate-900"}`}>
                {sec}s
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Pace
              </span>
            </button>
          ))}
        </div>

        <button
          disabled={!timerOption}
          onClick={() => setQuizStarted(true)}
          className="w-full bg-slate-900 hover:bg-black disabled:bg-slate-200 text-white font-bold py-4 rounded-2xl transition-transform active:scale-95 shadow-xl shadow-slate-200"
        >
          Begin Now
        </button>
      </div>
    );
  }

  // --- ACTIVE QUIZ PHASE ---
  return (
    <div className="max-w-4xl mx-auto pb-32">
      {/* Refined Sticky Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 py-5 px-8 flex items-center justify-between">
        <div className="space-y-0.5">
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">Active Assessment</p>
          <h2 className="text-xl font-extrabold text-slate-900">{selectedSet}</h2>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Time Left</span>
          <div className={`px-4 py-1 rounded-lg font-mono text-2xl font-black tabular-nums transition-colors ${
            timeLeft < 30 ? "text-red-600 bg-red-50 animate-pulse" : "text-slate-900"
          }`}>
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Questions Feed */}
      <div className="bg-white border-x border-slate-100">
        {questions.map((q, index) => (
          <div key={q.id} className="p-10 md:p-14 border-b border-slate-100 hover:bg-slate-50/40 transition-colors">
            <div className="flex gap-8">
              <div className="flex-1">
                <QuestionCards
                  question={q}
                  index={index}
                  selectedOption={answers[q.id]}
                  onSelect={handleOptionChange}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Completion Dock */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[95%] max-w-lg z-50">
        <div className="bg-white border border-slate-200/60 p-3 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center justify-between gap-6 backdrop-blur-xl bg-white/90">
          <div className="flex items-center gap-4 pl-6">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Completion</p>
              <p className="text-slate-900 font-black leading-tight">
                {Object.keys(answers).length} <span className="text-slate-300 mx-1">/</span> {questions.length}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleFinalSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-extrabold text-sm transition-all active:scale-95 shadow-lg shadow-blue-200"
          >
            Finish & Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default McqQuestionList;