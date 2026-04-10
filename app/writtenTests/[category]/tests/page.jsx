"use client";

import React, { useState, useEffect, useMemo } from "react";
import useShortQuestions from "@/app/Hooks/useShortQuestions";

const QuestionPage = ({ params }) => {
  const { category: cat } = React.use(params);
  const { shortQuestions } = useShortQuestions();

  const [selectedUnit, setSelectedUnit] = useState(null);
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timePerQuestion, setTimePerQuestion] = useState(60);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Memoize category data to prevent recalculation on every timer tick
  const categoryQuestions = useMemo(() => shortQuestions?.[cat] || [], [shortQuestions, cat]);
  const units = useMemo(() => [...new Set(categoryQuestions.map((q) => q.unit))], [categoryQuestions]);

  const getRandomQuestions = (questions) => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
  };

  const handleUnitSelect = (unit) => {
    const unitQuestions = categoryQuestions.filter((q) => q.unit === unit);
    const randomQs = getRandomQuestions(unitQuestions);

    setSelectedUnit(unit);
    setRandomQuestions(randomQs);
    setAnswers({});
    setQuizStarted(false);
    setQuizSubmitted(false);
    setTimeLeft(timePerQuestion * randomQs.length);
  };

  const handleAnswerChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    if (!quizStarted || quizSubmitted || timeLeft <= 0) return;
    
    // Auto-submit if time runs out
    if (timeLeft === 1) {
       submitQuiz();
    }

    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, quizStarted, quizSubmitted]);

  const startQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(timePerQuestion * randomQuestions.length);
  };

  const submitQuiz = () => {
    setQuizSubmitted(true);
    setQuizStarted(false);
  };

  if (quizSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl max-w-sm w-full text-center">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
            ✓
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Submission Successful</h2>
          <p className="text-slate-500 mb-8 font-medium">
            You completed {Object.keys(answers).length} out of {randomQuestions.length} questions.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black transition-transform active:scale-95 shadow-lg shadow-slate-200"
          >
            Try Another Set
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* Dynamic Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-black text-slate-900 capitalize tracking-tight">
              {cat.replaceAll("_", " ")}
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Practice Session</p>
          </div>
          
          {quizStarted && (
            <div className={`px-4 py-1.5 rounded-xl font-mono text-sm font-black transition-colors ${
              timeLeft < 60 ? "bg-red-50 text-red-600 animate-pulse" : "bg-slate-900 text-white"
            }`}>
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
            </div>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 mt-8">
        {!quizStarted ? (
          <div className="flex flex-col items-center">
            {/* Unit Picker */}
            <div className="w-full flex flex-wrap justify-center gap-2 mb-10">
              {units.map((unit) => (
                <button
                  key={`unit-${unit}`} // Added unique key
                  onClick={() => handleUnitSelect(unit)}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all border-2 ${
                    selectedUnit === unit 
                    ? "bg-white border-blue-500 text-blue-600 shadow-sm" 
                    : "bg-slate-100 border-transparent text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>

            {selectedUnit && (
              <div className="w-full max-w-md bg-white border border-slate-200 p-8 rounded-[2.5rem] text-center shadow-sm">
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-6 italic">Set Timer (Per Question)</p>
                <div className="grid grid-cols-4 gap-2 mb-8">
                  {[60, 90, 120, 180].map((sec) => (
                    <button
                      key={`timer-${sec}`} // Added unique key
                      onClick={() => setTimePerQuestion(sec)}
                      className={`py-3 rounded-xl text-[10px] font-black transition-all ${
                        timePerQuestion === sec ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-400"
                      }`}
                    >
                      {sec / 60}m
                    </button>
                  ))}
                </div>
                <button 
                  onClick={startQuiz}
                  className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black shadow-lg shadow-emerald-100 hover:bg-emerald-600 transition-all active:scale-95"
                >
                  Launch Quiz
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {randomQuestions.map((q, index) => (
              <div key={`question-${q.id}`} className="bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-8">
                <div className="flex gap-4 mb-4">
                  <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-400 text-[10px] font-black">
                    #{index + 1}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 leading-snug">
                    {q.question}
                  </h3>
                </div>
                
                <textarea
                  className="w-full p-5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base text-slate-700 placeholder:text-slate-300 transition-all min-h-[120px] resize-none"
                  placeholder="Draft your answer here..."
                  value={answers[q.id] || ""}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Persistent Bottom Controls */}
      {quizStarted && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
          <div className="bg-slate-900/90 backdrop-blur-xl p-2 rounded-[2rem] shadow-2xl flex items-center justify-between border border-white/10 px-4">
             <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Progress</span>
                <span className="text-white font-black text-sm">{Object.keys(answers).length} / {randomQuestions.length}</span>
             </div>
             <button 
                onClick={submitQuiz}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-2xl text-xs font-black shadow-lg transition-all active:scale-95"
             >
                Submit Now
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionPage;