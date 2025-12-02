"use client";

import React, { useState } from "react";
import McqQuestionList from "@/app/Components/McqQuestionList";
import useMCQ from "@/app/Hooks/useMcq";

const McqSetPage = ({ params }) => {
  const [mcqKey, setMcqKey] = useState(0); // key to reset McqQuestionList
  const [selectedSet, setSelectedSet] = useState("");
  const [result, setResult] = useState(null); // For modal
  const { category: cat } = React.use(params);
  const { mcq } = useMCQ();

  const mcqQuestionSet = mcq?.[cat] || [];

  const sets = [...new Set(mcqQuestionSet.map((item) => item.question_set))];

  const filteredQuestions = selectedSet
    ? mcqQuestionSet.filter((q) => q.question_set === selectedSet)
    : [];

  const handleSubmit = ({ answers }) => {
    let correctCount = 0;

    answers.forEach((answer) => {
      const rightAnswer = filteredQuestions.find((q) => q.id == answer.id);
      if (rightAnswer && answer.selectedOption === rightAnswer.correct_answer) {
        correctCount += 1;
      }
    });

    const percentage = (
      (correctCount / filteredQuestions.length) *
      100
    ).toFixed(0);
    let message = "";

    if (percentage === "100") message = "💯 Perfect score! Amazing job!";
    else if (percentage >= 80) message = "👏 Great work! Keep it up!";
    else if (percentage >= 50)
      message = "🙂 Good effort! You can do even better next time!";
    else message = "😅 Don't worry, try again and you'll improve!";

    // Set modal result
    setResult({
      setName: selectedSet,
      correctCount,
      total: filteredQuestions.length,
      percentage,
      message,
    });
  };

  const closeModal = () => {
    setResult(null); // Close the modal
    setSelectedSet((prev) => prev); // Keep the same set
    setMcqKey((prev) => prev + 1); // Force re-render of McqQuestionList
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center bg-white text-black gap-8">
      <h1 className="text-3xl font-bold mb-4 capitalize">{cat}</h1>

      {/* Set selection */}
      <div className="flex flex-col items-center w-full max-w-md gap-4 mb-6">
        <p className="text-lg font-medium">Select a question set:</p>
        <select
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={selectedSet}
          onChange={(e) => setSelectedSet(e.target.value)}
        >
          <option value="" disabled>
            -- Choose a set --
          </option>
          {sets.map((setName) => (
            <option key={setName} value={setName}>
              {setName}
            </option>
          ))}
        </select>
      </div>

      {/* MCQ questions */}
      {selectedSet && (
        <div className="w-full max-w-2xl flex flex-col gap-6">
          <McqQuestionList
            key={mcqKey} // forces rerender and clears answers
            questions={filteredQuestions}
            onSubmit={handleSubmit}
            selectedSet={selectedSet}
          />
        </div>
      )}

      {/* Result Modal */}
      {result && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">🎉 Result 🎉</h2>
            <p className="mb-2">
              Set: <span className="font-semibold">{result.setName}</span>
            </p>
            <p className="mb-2">
              Score: {result.correctCount} / {result.total} ({result.percentage}
              %)
            </p>
            <p className="mt-4 text-lg">{result.message}</p>
            <button
              onClick={closeModal}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-lg transition transform hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default McqSetPage;
