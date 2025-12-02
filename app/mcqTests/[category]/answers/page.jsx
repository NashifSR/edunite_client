"use client";

import React, { useState } from "react";
import useMCQ from "@/app/Hooks/useMcq";

const McqAnswerPage = ({ params }) => {
  const { category: cat } = React.use(params);
  const { mcq } = useMCQ();
  const mcqQuestionSet = mcq?.[cat] || [];

  console.log("testing",mcqQuestionSet)

  // Get unique set names
  const sets = [...new Set(mcqQuestionSet.map((item) => item.question_set))];

  const [selectedSet, setSelectedSet] = useState("");

  // Filter questions for the selected set
  const filteredQuestions = selectedSet
    ? mcqQuestionSet.filter((q) => q.question_set === selectedSet)
    : [];

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

      {/* Display questions and answers */}
      {selectedSet && (
        <div className="w-full max-w-2xl flex flex-col gap-6">
          {filteredQuestions.map((q, index) => (
            <div
              key={q.id}
              className="border p-4 rounded shadow bg-gray-50"
            >
              <p className="font-semibold mb-2">
                Q{index + 1}: {q.question}
              </p>
              <p className="text-blue-600 font-medium">
                Answer: {q.correct_answer}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default McqAnswerPage;
