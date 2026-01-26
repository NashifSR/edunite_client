"use client";

import React, { useState, useEffect } from "react";
import useShortQuestions from "@/app/Hooks/useShortQuestions";
import ButtonDesigns from "@/app/Components/ButtonDesigns";

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

  const categoryQuestions = shortQuestions?.[cat] || [];
  const units = [...new Set(categoryQuestions.map((q) => q.unit))];

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

  return (
    <div className="min-h-screen bg-white text-black px-4 py-6 sm:px-8 flex flex-col items-center">

      {/* Title */}
      <h1 className="text-xl sm:text-2xl font-semibold mb-6 capitalize text-center">
        {cat.replaceAll("_", " ")} — Questions
      </h1>

      {/* Unit selection */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6 w-full max-w-4xl">
        {units.map((unit) => (
          <ButtonDesigns
            key={unit}
            label={unit}
            variant={selectedUnit === unit ? "primary" : "soft"}
            onClick={() => handleUnitSelect(unit)}
          />
        ))}
      </div>

      {/* Time selection */}
      {selectedUnit && !quizStarted && !quizSubmitted && (
        <div className="flex flex-col items-center gap-4 mb-6 w-full max-w-md text-center">
          <p className="font-medium">Select time per question</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
            {[60, 90, 120, 180].map((sec) => (
              <ButtonDesigns
                key={sec}
                label={`${sec / 60} min`}
                variant={timePerQuestion === sec ? "primary" : "soft"}
                onClick={() => setTimePerQuestion(sec)}
              />
            ))}
          </div>

          <ButtonDesigns
            label="Start Quiz"
            variant="success"
            onClick={startQuiz}
          />
        </div>
      )}

      {/* Quiz questions */}
      {quizStarted && randomQuestions.length > 0 && (
        <div className="w-full max-w-3xl space-y-6">

          {/* Timer */}
          <div className="sticky top-0 bg-white z-10 py-2">
            <p className="font-semibold text-right text-sm sm:text-base">
              ⏱ Time left: {Math.floor(timeLeft / 60)}:
              {String(timeLeft % 60).padStart(2, "0")}
            </p>
          </div>

          {randomQuestions.map((q, index) => (
            <div
              key={q.id}
              className="border p-4 sm:p-5 rounded-xl shadow-sm bg-white"
            >
              <p className="font-semibold text-sm sm:text-base">
                Q{index + 1} (ID: {q.id}): {q.question}
              </p>

              <textarea
                className="mt-3 w-full p-3 border rounded-lg resize-none
                  focus:outline-none focus:ring-2 focus:ring-blue-300
                  text-sm sm:text-base"
                rows={4}
                placeholder="Type your answer here..."
                value={answers[q.id] || ""}
                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                disabled={quizSubmitted}
              />
            </div>
          ))}

          {!quizSubmitted && (
            <div className="flex justify-center pt-4">
              <ButtonDesigns
                label="Submit Quiz"
                variant="success"
                onClick={submitQuiz}
              />
            </div>
          )}
        </div>
      )}

      {/* Submission message */}
      {quizSubmitted && (
        <div className="mt-6 p-4 rounded-xl bg-green-100 w-full max-w-md text-center">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">
            ✅ Quiz Submitted!
          </h2>
          <p>You answered {Object.keys(answers).length} questions.</p>
        </div>
      )}
    </div>
  );
};

export default QuestionPage;
