"use client";

import React, { useState, useEffect, useRef } from "react";
import QuestionCards from "./QuestionCards";
import ButtonDesigns from "@/app/Components/ButtonDesigns";

const McqQuestionList = ({ questions, selectedSet, onSubmit }) => {
  const [answers, setAnswers] = useState({});
  const [timerOption, setTimerOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerOption && timerOption > 0) {
      setTimeLeft(timerOption * questions.length);
    }
  }, [timerOption, questions.length]);

  useEffect(() => {
    if (!quizStarted || !timerOption || timeLeft <= 0) return;

    timerRef.current = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);

    if (timeLeft === 1) {
      handleAutoSubmit();
    }

    return () => clearTimeout(timerRef.current);
  }, [timeLeft, quizStarted, timerOption]);

  const handleOptionChange = (id, option) =>
    setAnswers((prev) => ({ ...prev, [id]: option }));

  const handleSubmit = () => {
    if (onSubmit) {
      const submittedData = Object.entries(answers).map(([id, selectedOption]) => ({
        id: Number(id),
        selectedOption,
      }));
      onSubmit({ selectedSet, answers: submittedData });
    }
    clearTimeout(timerRef.current);
  };

  const handleAutoSubmit = () => {
    clearTimeout(timerRef.current);
    handleSubmit();
  };

  if (!questions.length) return null;

  // INITIAL STATE: Time Selection
  if (!quizStarted) {
    return (
      <div className="flex flex-col items-center py-12 px-6 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-2xl mb-4">
          ⏱️
        </div>
        <h2 className="text-xl font-black text-slate-800 mb-2">Quiz Setup</h2>
        <p className="text-slate-500 text-sm mb-8 text-center max-w-xs">
          Choose your pace. The timer will adjust based on the number of questions.
        </p>
        
        <div className="flex gap-3 mb-10">
          {[10, 15, 20].map((sec) => (
            <button
              key={sec}
              onClick={() => setTimerOption(sec)}
              className={`px-6 py-3 rounded-2xl font-bold transition-all border-2 ${
                timerOption === sec 
                ? "bg-slate-900 border-slate-900 text-white shadow-lg scale-105" 
                : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
              }`}
            >
              {sec}s <span className="text-[10px] block opacity-60 font-medium">per question</span>
            </button>
          ))}
        </div>

        {timerOption && (
          <button
            onClick={() => setQuizStarted(true)}
            className="w-full max-w-xs bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-emerald-100 transition-all flex items-center justify-center gap-2 group"
          >
            Start Assessment
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        )}
      </div>
    );
  }

  // ACTIVE STATE: Quiz Mode
  return (
    <div className="w-full space-y-4 pb-32">
      {/* Integrated Timer Header */}
      <div className="sticky top-[73px] z-40 bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl p-4 mb-8 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Live Session</span>
        </div>
        
        <div className={`px-4 py-1.5 rounded-xl font-mono text-lg font-black transition-colors ${
          timeLeft < 30 ? "bg-red-50 text-red-600 animate-pulse" : "bg-slate-900 text-white"
        }`}>
          {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
        </div>
      </div>

      {/* Questions Container */}
      <div className="flex flex-col border border-slate-200 rounded-[2rem] bg-white overflow-hidden divide-y divide-slate-100">
        {questions.map((q, index) => (
          <div key={q.id} className="p-6 sm:p-8 hover:bg-slate-50/50 transition-colors">
            <QuestionCards
              question={q}
              index={index}
              selectedOption={answers[q.id]}
              onSelect={handleOptionChange}
            />
          </div>
        ))}
      </div>

      {/* Control Dock (Sticky Bottom) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
        <div className="bg-slate-900/90 backdrop-blur-xl p-2 rounded-3xl shadow-2xl flex items-center gap-2 border border-white/10">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-2xl text-xs font-bold transition-colors"
          >
            ↑ Top
          </button>
          
          <button
            onClick={handleSubmit}
            className="flex-[2] bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-2xl text-sm font-black shadow-lg shadow-emerald-900/20 transition-all active:scale-95"
          >
            Finish & Submit
          </button>

          <button
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-2xl text-xs font-bold transition-colors"
          >
            ↓ End
          </button>
        </div>
      </div>
    </div>
  );
};

export default McqQuestionList;