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
      <div className="max-w-md mx-auto my-16 bg-white rounded-3xl border border-slate-100 p-8 shadow-xl shadow-slate-100/50 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl mb-6 font-bold text-lg">
          ?
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-2">Ready to Start?</h2>
        <p className="text-slate-500 text-sm leading-relaxed mb-8">
          Choose your pace below. We'll generate a custom timer based on the <span className="font-semibold text-slate-700">{questions.length} questions</span> in this pool.
        </p>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {[15, 30, 45].map((sec) => (
            <button
              key={sec}
              onClick={() => setTimerOption(sec)}
              className={`group flex flex-col items-center py-4 rounded-xl border transition-all ${timerOption === sec
                ? "border-indigo-600 bg-indigo-50/40 shadow-sm"
                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                }`}
            >
              <span className={`text-lg font-bold ${timerOption === sec ? "text-indigo-600" : "text-slate-700"}`}>
                {sec}s
              </span>
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">
                Per Q
              </span>
            </button>
          ))}
        </div>

        <button
          disabled={!timerOption}
          onClick={() => setQuizStarted(true)}
          className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 text-white font-semibold py-3.5 rounded-xl transition-all active:scale-[0.98]"
        >
          Begin Now
        </button>
      </div>
    );
  }

  // --- ACTIVE QUIZ PHASE ---
  const isTimeCritical = timeLeft < 30;

  return (
    <div className="max-w-3xl mx-auto pb-36">
      {/* Refined Sticky Header */}
      <div className="top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 py-4 px-6 flex items-center justify-between">
        <div className="space-y-0.5">
          <p className="text-[10px] font-semibold text-indigo-600 uppercase tracking-widest">Active Assessment</p>
          <h2 className="text-lg font-bold text-slate-800">{selectedSet}</h2>
        </div>


      </div>

      {/* Questions Feed */}
      <div className="divide-y divide-slate-100 px-6">
        {questions.map((q, index) => (
          <div key={q.id} className="py-10 first:pt-8 last:pb-10">
            <QuestionCards
              question={q}
              index={index}
              selectedOption={answers[q.id]}
              onSelect={handleOptionChange}
            />
          </div>
        ))}
      </div>

      {/* Floating Action Dock */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-50">
        <div className="bg-slate-900/95 p-2 rounded-2xl shadow-xl shadow-slate-900/20 flex items-center justify-between gap-4 backdrop-blur-md">
          <div className="flex items-center gap-3 pl-4">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <p className="text-[9px] font-medium text-slate-400 uppercase tracking-wider">Progress</p>
              <p className="text-white font-bold text-sm leading-none mt-0.5">
                {Object.keys(answers).length} <span className="text-slate-500 font-normal mx-0.5">/</span> {questions.length}
              </p>
            </div>
          </div>

          <button
            onClick={handleFinalSubmit}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all active:scale-[0.97]"
          >
            Finish & Submit
          </button>
          <div className="flex flex-col items-end">
            <div className={`px-3 py-1 rounded-lg font-mono text-xl font-bold tabular-nums transition-all ${isTimeCritical
              ? "text-rose-600 bg-rose-50 animate-pulse"
              : "text-slate-700 bg-slate-50"
              }`}>
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default McqQuestionList;