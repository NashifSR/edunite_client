"use client";

import React, { useState } from "react";
import McqQuestionList from "@/app/Components/McqQuestionList";
import useMCQ from "@/app/Hooks/useMcq";

const McqSetPage = ({ params }) => {
  const { category: cat } = React.use(params);
  const { mcq } = useMCQ();
  const mcqQuestionSet = mcq?.[cat] || [];

  // Get unique set names
  const sets = [...new Set(mcqQuestionSet.map((item) => item.question_set))];

  const [selectedSet, setSelectedSet] = useState("");

  // Filter questions for the selected set
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

    // ---------------------------
    const percentage = (
      (correctCount / filteredQuestions.length) *
      100
    ).toFixed(0);
    let message = `🎉 Congratulations! 🎉\n\n`;
    message += `Set: ${selectedSet}\n`;
    message += `You answered ${correctCount} out of ${filteredQuestions.length} questions correctly.\n`;
    message += `Your score: ${percentage}%\n\n`;

    if (percentage === "100") {
      message += "💯 Perfect score! Amazing job!";
    } else if (percentage >= 80) {
      message += "👏 Great work! Keep it up!";
    } else if (percentage >= 50) {
      message += "🙂 Good effort! You can do even better next time!";
    } else {
      message += "😅 Don't worry, try again and you'll improve!";
    }

    alert(message);
    // ---------------------------

    // Refresh page
    window.location.reload();
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
            questions={filteredQuestions}
            onSubmit={handleSubmit}
            selectedSet={selectedSet}
          />
        </div>
      )}
    </div>
  );
};

export default McqSetPage;
