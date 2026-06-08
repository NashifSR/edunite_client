"use client";

import React, { useState, useEffect, useMemo } from "react";
import useShortQuestions from "@/app/Hooks/useShortQuestions";

const QuestionPage = ({ params }) => {
  // Safe unwrap of dynamic Next async route parameters
  const resolvedParams = React.use(params);
  const cat = resolvedParams?.category;

  const { shortQuestions } = useShortQuestions();

  const [selectedUnit, setSelectedUnit] = useState(null);
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [timePerQuestion, setTimePerQuestion] = useState(60);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Enforce hydration matching
  useEffect(() => {
    setMounted(true);
  }, []);

  // ================= DATA =================

  const categoryQuestions = useMemo(
    () => (cat && shortQuestions?.[cat]) || [],
    [shortQuestions, cat]
  );

  const units = useMemo(
    () => [...new Set(categoryQuestions.map((q) => q.unit))].filter(Boolean),
    [categoryQuestions]
  );

  // ================= HELPERS =================

  const getRandomQuestions = (questions) => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
  };

  const normalizeText = (text) => {
    return text
      ?.toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .trim();
  };

  // ================= HANDLERS =================

  const handleUnitSelect = (unit) => {
    const unitQuestions = categoryQuestions.filter(
      (q) => q.unit === unit
    );

    const randomQs = getRandomQuestions(unitQuestions);

    setSelectedUnit(unit);
    setRandomQuestions(randomQs);
    setAnswers({});
    setResults({});
    setQuizStarted(false);
    setQuizSubmitted(false);
    setTimeLeft(timePerQuestion * randomQs.length);
  };

  const handleAnswerChange = (id, value) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // ================= COPY QUESTIONS =================

  const copyQuestionsAndAnswers = async () => {
    const formattedText = randomQuestions
      .map((q, index) => {
        return `
Question ${index + 1}
Question: ${q.question}

My Answer:
${answers[q.id] || "No Answer"}

Expected Answer:
${q.answer?.en || ""}

Keywords:
${q.keywords?.join(", ") || "None"}
        `;
      })
      .join("\n------------------------\n");

    try {
      await navigator.clipboard.writeText(formattedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  // ================= EVALUATION =================

  const evaluateAnswers = () => {
    const evaluated = {};

    randomQuestions.forEach((q) => {
      const userAnswer = normalizeText(answers[q.id] || "");
      const keywords = q.keywords ?? [];

      const matchedKeywords = keywords.filter((keyword) =>
        userAnswer.includes(normalizeText(keyword))
      );

      const missingKeywords = keywords.filter(
        (keyword) => !matchedKeywords.includes(keyword)
      );

      const score = matchedKeywords.length;
      const total = keywords.length;

      const percentage =
        total > 0 ? Math.round((score / total) * 100) : 0;

      evaluated[q.id] = {
        matched: matchedKeywords,
        missing: missingKeywords,
        score,
        total,
        percentage,
        correct: total > 0 ? score === total : true,
        partial: score > 0 && score < total,
      };
    });

    setResults(evaluated);
  };

  // ================= TIMER =================

  useEffect(() => {
    if (!quizStarted || quizSubmitted || timeLeft <= 0) return;

    if (timeLeft === 1) {
      submitQuiz();
    }

    const timer = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, quizStarted, quizSubmitted]);

  // ================= QUIZ =================

  const startQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(timePerQuestion * randomQuestions.length);
  };

  const submitQuiz = () => {
    evaluateAnswers();
    setQuizSubmitted(true);
    setQuizStarted(false);
  };

  // Safe fallback shell to prevent flickering or mismatches
  if (!mounted || !cat) {
    return (
      <div className="min-h-screen bg-[#090d16] text-slate-200 relative pb-12 flex items-center justify-center">
        <div className="text-center text-xs text-slate-500 py-12 tracking-wide">Loading workspace terminal...</div>
      </div>
    );
  }

  // ================= RESULT PAGE =================

  if (quizSubmitted) {
    const totalQuestions = randomQuestions.length;
    const fullyCorrect = Object.values(results).filter((r) => r.correct).length;
    const totalScore = Object.values(results).reduce((acc, curr) => acc + curr.score, 0);
    const totalPossible = Object.values(results).reduce((acc, curr) => acc + curr.total, 0);

    const finalPercentage =
      totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;

    return (
      <div className="min-h-screen bg-[#090d16] text-slate-200 relative pb-24">
        {/* Background Gradients */}
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
          <button
            onClick={copyQuestionsAndAnswers}
            className="h-10 px-4 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:text-white transition-all text-xs font-bold uppercase tracking-wider text-slate-300 shadow-md"
          >
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

                <div className="mb-4">
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
                        ) : (
                          <span className="text-[11px] italic text-slate-500">None</span>
                        )}
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
                        ) : (
                          <span className="text-[11px] italic text-emerald-400 font-bold">Perfect match (None missing)</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <div className="grid sm:grid-cols-2 gap-3 pt-4">
            <button
              onClick={copyQuestionsAndAnswers}
              className="h-11 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-xs font-black uppercase tracking-wider text-slate-200 transition-all active:scale-98"
            >
              {copied ? "Copied" : "Copy Diagnostics"}
            </button>
            <button
              onClick={() => window.location.reload()}
              className="h-11 rounded-xl bg-orange-500 hover:bg-orange-400 text-black text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-orange-500/10 active:scale-98"
            >
              Try Another Session
            </button>
          </div>
        </main>
      </div>
    );
  }

  // ================= QUIZ PAGE =================

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-200 relative pb-28">
      {/* Background Gradients */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[30%] w-[600px] h-[600px] rounded-full bg-emerald-500/[0.02] blur-[150px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/[0.02] blur-[130px]" />
      </div>

      <header className="sticky top-0 z-50 bg-[#090d16]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-base md:text-xl font-black text-white capitalize tracking-tight truncate">
                {cat.replaceAll("_", " ")}
              </h1>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <span className="text-orange-400 font-black">Interactive Sandbox</span>
                {selectedUnit && (
                  <>
                    <span className="text-white/20">•</span>
                    <span className="text-slate-200">{selectedUnit}</span>
                  </>
                )}
              </div>
            </div>
            {quizStarted && (
              <div className="h-9 px-3.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center text-xs font-mono font-black shadow-lg shadow-orange-500/5">
                {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
              </div>
            )}
          </div>

          {!quizStarted && (
            <div className="flex gap-2 overflow-x-auto pt-3 no-scrollbar">
              {units.map((unit) => (
                <button
                  key={unit}
                  onClick={() => handleUnitSelect(unit)}
                  className={`px-3 py-2 rounded-xl text-[11px] font-bold border whitespace-nowrap transition-all
                    ${selectedUnit === unit 
                      ? "bg-white text-[#090d16] border-white shadow-md" 
                      : "bg-white/[0.02] text-slate-400 border-white/[0.05] hover:text-white hover:bg-white/[0.05]"}`}
                >
                  {unit}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {!quizStarted ? (
          <div className="max-w-md mx-auto mt-6">
            {!selectedUnit ? (
              <div className="border border-white/[0.06] bg-slate-900/20 backdrop-blur-xl rounded-2xl p-12 text-center shadow-xl">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-xl text-orange-400 mx-auto mb-4">
                  📝
                </div>
                <h2 className="text-sm font-bold text-white tracking-tight">Select a Vector Unit</h2>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">Choose an available block above to construct a random dynamic trial.</p>
              </div>
            ) : (
              <div className="bg-slate-900/30 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-5 shadow-xl">
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
                    <p className="text-base font-black text-white mt-0.5">
                      {Math.floor((timePerQuestion * randomQuestions.length) / 60)}m
                    </p>
                  </div>
                </div>

                <div className="mb-5">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Configure Cadence</p>
                  <div className="grid grid-cols-4 gap-2">
                    {[60, 90, 120, 180].map((sec) => (
                      <button
                        key={sec}
                        onClick={() => setTimePerQuestion(sec)}
                        className={`h-9 rounded-xl text-[11px] font-bold border transition-all
                          ${timePerQuestion === sec 
                            ? "bg-orange-500/10 text-orange-400 border-orange-500/40" 
                            : "bg-white/[0.02] text-slate-400 border-white/[0.05] hover:text-white"}`}
                      >
                        {sec / 60}m/q
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={startQuiz}
                  className="w-full h-11 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#090d16] text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/10 active:scale-98"
                >
                  Initiate Simulator
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button
                onClick={copyQuestionsAndAnswers}
                className="h-9 px-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-[10px] font-bold uppercase tracking-wider text-slate-300 transition-all"
              >
                {copied ? "Copied" : "Copy Matrix"}
              </button>
            </div>

            {randomQuestions.map((q, index) => (
              <div key={q.id} className="group bg-slate-900/30 backdrop-blur-xl border border-white/[0.05] focus-within:border-orange-500/30 rounded-2xl p-4 md:p-5 transition-all duration-200 shadow-md">
                <div className="flex items-center gap-2 flex-wrap mb-3 text-[10px] font-bold uppercase tracking-wider">
                  <span className="w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.06] text-slate-300 flex items-center justify-center text-xs font-black group-focus-within:text-orange-400 group-focus-within:border-orange-500/30 transition-colors">
                    {index + 1}
                  </span>
                  <span className="text-slate-500">ID #{q.id}</span>
                  {q.keywords && (
                    <>
                      <span className="text-white/20">•</span>
                      <span className="text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded border border-orange-500/20">
                        {q.keywords.length} Target Tokens
                      </span>
                    </>
                  )}
                </div>
                <h3 className="text-sm md:text-[15px] font-bold text-slate-100 tracking-tight leading-relaxed mb-3">{q.question}</h3>
                <textarea
                  value={answers[q.id] || ""}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  placeholder="Type architectural input answer details..."
                  className="w-full min-h-[110px] rounded-xl border border-white/[0.06] bg-slate-950/40 px-4 py-3 text-xs md:text-sm text-slate-200 leading-relaxed outline-none focus:border-orange-500/40 focus:bg-[#0c121e] resize-none transition-all placeholder:text-slate-600"
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {quizStarted && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[94%] max-w-lg z-50">
          <div className="bg-slate-950/80 backdrop-blur-xl border border-white/[0.1] rounded-2xl px-4 py-3 flex items-center justify-between shadow-2xl shadow-black/80">
            <div>
              <p className="text-[9px] uppercase font-black text-slate-500 tracking-wider">Progress Node</p>
              <p className="text-xs font-bold text-white mt-0.5">{Object.keys(answers).length} <span className="text-slate-600">/</span> {randomQuestions.length}</p>
            </div>
            <button
              onClick={submitQuiz}
              className="h-9 px-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-black text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-orange-500/10 active:scale-95"
            >
              Submit Engine
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionPage;