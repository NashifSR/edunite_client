"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import useShortQuestions from "@/app/Hooks/useShortQuestions";
import SetupView from "../component/SetupView";
import QuizActiveView from "../component/QuizActiveView";
import CriteriaDropdown from "@/app/Components/criteriaDropDownList";

const toSentenceCase = (str) => {
  if (!str) return "";
  const decoded = decodeURIComponent(str);
  const clean = decoded.replace(/_/g, " ").trim();
  if (clean.toLowerCase() === "cbta") return "CBTA";
  return clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
};

const QuestionPage = ({ params }) => {
  const resolvedParams = React.use(params);
  const cat = resolvedParams?.category;
  const { shortQuestions = [] } = useShortQuestions();

  const [selectedUnit, setSelectedUnit] = useState(null);
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timePerQuestion, setTimePerQuestion] = useState(60);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. URL Safe Decoding and Capital Normalization Mapping
  const targetCategoryUpper = useMemo(() => {
    if (!cat) return "";
    return decodeURIComponent(cat).replace(/[\s_]/g, "").toUpperCase();
  }, [cat]);

  // 2. Global Core Category Filter
  const categoryQuestions = useMemo(() => {
    if (!shortQuestions.length || !targetCategoryUpper) return [];
    return shortQuestions.filter((q) => {
      if (!q.category) return false;
      return q.category.replace(/[\s_]/g, "").toUpperCase() === targetCategoryUpper;
    });
  }, [shortQuestions, targetCategoryUpper]);

  const resetQuizState = useCallback(() => {
    setSelectedUnit(null);
    setRandomQuestions([]);
    setAnswers({});
    setTimeLeft(0);
    setQuizStarted(false);
    setQuizSubmitted(false);
  }, []);

  const handleUnitSelect = (unit) => {
    if (!unit) {
      resetQuizState();
      return;
    }
    
    const unitQuestions = categoryQuestions.filter((q) => q.unit === unit);
    const shuffled = [...unitQuestions].sort(() => 0.5 - Math.random()).slice(0, 10);

    setSelectedUnit(unit);
    setRandomQuestions(shuffled);
    setAnswers({});
    setQuizStarted(false);
    setQuizSubmitted(false);
    setTimeLeft(timePerQuestion * shuffled.length);
  };

  const handleAnswerChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const submitQuiz = useCallback(async () => {
    if (isSubmitting) return;

    const confirmSubmit = window.confirm(
      "Are you sure you want to finalize? Your short answer scripts will be compiled and sent to the evaluation queue."
    );

    if (!confirmSubmit) return;

    setIsSubmitting(true);

    const payload = {
      username: "Ahmed Nashif", 
      email: "ahmed@example.com",
      category: cat,
      unit: selectedUnit,
      results: randomQuestions.map((q) => ({
        questionId: q._id, 
        localId: q.id,     
        question: q.question,
        userAnswer: answers[q._id] ? String(answers[q._id]).trim() : "", 
        expectedKeywords: q.keywords || [],
        expectedAnswer: q.answer?.en || ""
      }))
    };

    try {
      const response = await axios.post("http://localhost:5000/api/tvet/quiz/submit-written", payload);
      
      if (response.data.success) {
        alert("Written scripts successfully submitted to the evaluation grid!");
      }
      
      resetQuizState();

    } catch (err) {
      console.error("Pipeline handshaking error:", err);
      alert("Submission failed. Check network connection.");
    } finally {
      setIsSubmitting(false);
    }
  }, [randomQuestions, answers, cat, selectedUnit, isSubmitting, resetQuizState]);

  useEffect(() => {
    if (!quizStarted || quizSubmitted || timeLeft <= 0) return;
    if (timeLeft === 1) { submitQuiz(); return; }

    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, quizStarted, quizSubmitted, submitQuiz]);

  if (!cat) return null;

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-200 relative pb-28">
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[30%] w-[600px] h-[600px] rounded-full bg-emerald-500/[0.02] blur-[150px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/[0.02] blur-[130px]" />
      </div>

      <header className="sticky top-0 z-50 bg-[#090d16]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-base md:text-xl font-black text-white tracking-tight truncate">
                {toSentenceCase(cat)}
              </h1>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <span className="text-orange-400 font-black">Short Answer Sandbox</span>
                {selectedUnit && (
                  <>
                    <span className="text-white/20">•</span>
                    <span className="text-slate-200">{selectedUnit}</span>
                  </>
                )}
              </div>
            </div>
            {quizStarted && (
              <div className="h-9 px-3.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center text-xs font-mono font-black">
                {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
              </div>
            )}
          </div>

          {/* Clean Dropdown Reused Here */}
          {!quizStarted && (
            <div className="pt-3 max-w-xs">
              <CriteriaDropdown
                data={categoryQuestions}
                criteriaKey="unit"
                selectedValue={selectedUnit}
                onSelect={handleUnitSelect}
                allLabel="Select a Unit"
                accentColorClass="border-orange-500/40 text-orange-400 bg-orange-500/10"
              />
            </div>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {!quizStarted ? (
          <SetupView 
            selectedUnit={selectedUnit} 
            randomQuestions={randomQuestions} 
            timePerQuestion={timePerQuestion} 
            setTimePerQuestion={setTimePerQuestion} 
            startQuiz={() => setQuizStarted(true)} 
          />
        ) : (
          <QuizActiveView 
            randomQuestions={randomQuestions} 
            answers={answers} 
            handleAnswerChange={handleAnswerChange} 
          />
        )}
      </main>

      {quizStarted && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[94%] max-w-lg z-50">
          <div className="bg-slate-950/80 backdrop-blur-xl border border-white/[0.1] rounded-2xl px-4 py-3 flex items-center justify-between shadow-2xl shadow-black/80">
            <div>
              <p className="text-[9px] uppercase font-black text-slate-500 tracking-wider">Progress Node</p>
              <p className="text-xs font-bold text-white mt-0.5">
                {Object.values(answers).filter(val => val && val.trim() !== "").length} <span className="text-slate-600">/</span> {randomQuestions.length}
              </p>
            </div>
            <button 
              onClick={submitQuiz} 
              disabled={isSubmitting}
              className="h-9 px-4 rounded-xl bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-black text-xs font-black uppercase tracking-wider transition-all active:scale-95"
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