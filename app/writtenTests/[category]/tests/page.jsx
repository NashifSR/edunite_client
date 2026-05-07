"use client";

import React, { useState, useEffect, useMemo } from "react";
import useShortQuestions from "@/app/Hooks/useShortQuestions";

const QuestionPage = ({ params }) => {
  const { category: cat } = React.use(params);
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

  // ================= DATA =================

  const categoryQuestions = useMemo(
    () => shortQuestions?.[cat] || [],
    [shortQuestions, cat]
  );

  const units = useMemo(
    () => [...new Set(categoryQuestions.map((q) => q.unit))],
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
      // Defensive: Default to empty array if keywords is missing
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
        correct: total > 0 ? score === total : true, // If no keywords, mark as correct
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

  // ================= RESULT PAGE =================

  if (quizSubmitted) {
    const totalQuestions = randomQuestions.length;
    const fullyCorrect = Object.values(results).filter((r) => r.correct).length;
    const totalScore = Object.values(results).reduce((acc, curr) => acc + curr.score, 0);
    const totalPossible = Object.values(results).reduce((acc, curr) => acc + curr.total, 0);

    const finalPercentage =
      totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;

    return (
      <div className="min-h-screen bg-white text-black pb-24">
        <header className="sticky top-0 z-50 bg-white border-b border-black/10">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-medium">Quiz Result</h1>
              <p className="text-xs text-black/50 mt-1">Keyword based evaluation</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-medium">{finalPercentage}%</p>
              <p className="text-xs text-black/50">{fullyCorrect}/{totalQuestions} Correct</p>
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-4 pt-4">
          <button
            onClick={copyQuestionsAndAnswers}
            className="h-11 px-5 rounded-2xl border border-black/10 hover:bg-black/5 transition-all text-sm"
          >
            {copied ? "Copied to Clipboard" : "Copy Questions & Answers"}
          </button>
        </div>

        <main className="max-w-5xl mx-auto px-4 py-4 space-y-3">
          {randomQuestions.map((q, index) => {
            const result = results[q.id];
            return (
              <div key={q.id} className="border border-black/10 rounded-2xl p-4">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center text-xs shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-[15px] leading-relaxed font-medium">{q.question}</h2>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className="text-[11px] text-black/40">#{q.id}</span>
                      <span className="text-[11px] text-orange-600">{result.score}/{result.total}</span>
                      <span className="text-[11px] text-black/40">{result.percentage}% Match</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-[11px] uppercase text-black/40 mb-1">Your Answer</p>
                  <div className="border border-black/10 rounded-xl p-3 text-sm leading-relaxed">
                    {answers[q.id] || "No answer"}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-[11px] uppercase text-black/40 mb-1">Expected Answer</p>
                  <div className="border border-black/10 rounded-xl p-3 text-sm leading-relaxed bg-black/[0.02]">
                    {q.answer?.en}
                  </div>
                </div>

                {/* KEYWORDS BLOCK: Only render if keywords exist */}
                {q.keywords && q.keywords.length > 0 && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-[11px] uppercase text-black/40 mb-2">Matched Keywords</p>
                      <div className="flex flex-wrap gap-2">
                        {result.matched.length > 0 ? (
                          result.matched.map((word) => (
                            <span key={word} className="px-2 py-1 rounded-md bg-black text-white text-[11px]">
                              {word}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-black/40">None</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase text-black/40 mb-2">Missing Keywords</p>
                      <div className="flex flex-wrap gap-2">
                        {result.missing.length > 0 ? (
                          result.missing.map((word) => (
                            <span key={word} className="px-2 py-1 rounded-md border border-orange-200 bg-orange-50 text-orange-700 text-[11px]">
                              {word}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-black/40">None</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <div className="grid sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={copyQuestionsAndAnswers}
              className="h-11 rounded-2xl border border-black/10 hover:bg-black/5 text-sm transition-all"
            >
              {copied ? "Copied" : "Copy Questions & Answers"}
            </button>
            <button
              onClick={() => window.location.reload()}
              className="h-11 rounded-2xl bg-black text-white text-sm hover:bg-orange-500 transition-all"
            >
              Try Another Quiz
            </button>
          </div>
        </main>
      </div>
    );
  }

  // ================= QUIZ PAGE =================

  return (
    <div className="min-h-screen bg-white text-black pb-28">
      <header className="sticky top-0 z-50 bg-white border-b border-black/10">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-lg font-medium capitalize truncate">
                {cat.replaceAll("_", " ")}
              </h1>
              <div className="flex items-center gap-2 mt-1 flex-wrap text-xs text-black/50">
                <span>Practice Quiz</span>
                {selectedUnit && (
                  <>
                    <span>•</span>
                    <span>{selectedUnit}</span>
                  </>
                )}
              </div>
            </div>
            {quizStarted && (
              <div className="h-10 px-4 rounded-xl bg-black text-white flex items-center justify-center text-sm">
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
                  className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap border transition-all
                    ${selectedUnit === unit ? "bg-black text-white border-black" : "border-black/10 hover:bg-black/5"}`}
                >
                  {unit}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-4">
        {!quizStarted ? (
          <div className="max-w-md mx-auto">
            {!selectedUnit ? (
              <div className="border border-dashed border-black/10 rounded-3xl p-10 text-center">
                <div className="text-4xl mb-3">📝</div>
                <h2 className="text-lg font-medium mb-2">Select a Unit</h2>
                <p className="text-sm text-black/50">Generate a random practice quiz.</p>
              </div>
            ) : (
              <div className="border border-black/10 rounded-3xl p-5">
                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="border border-black/10 rounded-2xl p-3">
                    <p className="text-[10px] uppercase text-black/40">Questions</p>
                    <p className="text-lg font-medium mt-1">{randomQuestions.length}</p>
                  </div>
                  <div className="border border-black/10 rounded-2xl p-3">
                    <p className="text-[10px] uppercase text-black/40">Unit</p>
                    <p className="text-sm font-medium truncate mt-1">{selectedUnit}</p>
                  </div>
                  <div className="border border-black/10 rounded-2xl p-3">
                    <p className="text-[10px] uppercase text-black/40">Time</p>
                    <p className="text-lg font-medium mt-1">
                      {Math.floor((timePerQuestion * randomQuestions.length) / 60)}m
                    </p>
                  </div>
                </div>

                <div className="mb-5">
                  <p className="text-[11px] uppercase text-black/40 mb-2">Time Per Question</p>
                  <div className="grid grid-cols-4 gap-2">
                    {[60, 90, 120, 180].map((sec) => (
                      <button
                        key={sec}
                        onClick={() => setTimePerQuestion(sec)}
                        className={`h-10 rounded-xl text-xs border transition-all
                          ${timePerQuestion === sec ? "bg-black text-white border-black" : "border-black/10 hover:bg-black/5"}`}
                      >
                        {sec / 60}m
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={startQuiz}
                  className="w-full h-11 rounded-2xl bg-orange-500 text-white text-sm hover:bg-orange-600 transition-all"
                >
                  Start Quiz
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-end">
              <button
                onClick={copyQuestionsAndAnswers}
                className="h-10 px-4 rounded-xl border border-black/10 hover:bg-black/5 text-xs transition-all"
              >
                {copied ? "Copied" : "Copy Questions"}
              </button>
            </div>

            {randomQuestions.map((q, index) => (
              <div key={q.id} className="border border-black/10 rounded-2xl p-4">
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <span className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center text-xs">
                    {index + 1}
                  </span>
                  <span className="text-[11px] text-black/50">#{q.id}</span>
                  {/* Badge: Only show if keywords exists */}
                  {q.keywords && (
                    <span className="text-[11px] text-orange-600">
                      {q.keywords.length} keywords
                    </span>
                  )}
                </div>
                <h3 className="text-[15px] leading-relaxed font-medium mb-3">{q.question}</h3>
                <textarea
                  value={answers[q.id] || ""}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  placeholder="Write your answer..."
                  className="w-full min-h-[110px] rounded-2xl border border-black/10 bg-black/[0.02] px-4 py-3 text-sm leading-relaxed outline-none focus:border-orange-400 focus:bg-white resize-none transition-all"
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {quizStarted && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[94%] max-w-lg z-50">
          <div className="bg-black text-white rounded-3xl px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase text-white/50">Progress</p>
              <p className="text-sm">{Object.keys(answers).length} / {randomQuestions.length}</p>
            </div>
            <button
              onClick={submitQuiz}
              className="h-10 px-5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white text-xs transition-all"
            >
              Submit Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionPage;