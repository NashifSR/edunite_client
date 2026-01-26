"use client";

import React, { useState } from "react";
import useShortQuestions from "@/app/Hooks/useShortQuestions";
import ButtonDesigns from "@/app/Components/ButtonDesigns";
import SearchBox from "@/app/Components/SearchBox";

const WrittenAnswerPage = ({ params }) => {
  const { category: cat } = React.use(params);
  const { shortQuestions } = useShortQuestions();

  const [selectedUnit, setSelectedUnit] = useState(null);
  const [showEnglish, setShowEnglish] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const categoryQuestions = shortQuestions?.[cat] || [];
  const units = [...new Set(categoryQuestions.map((q) => q.unit))];

  const filteredQuestions = selectedUnit
    ? categoryQuestions.filter((q) => q.unit === selectedUnit)
    : [];

  const searchedQuestions = filteredQuestions.filter(
    (q) =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.id.toString() === searchQuery
  );

  return (
    <div className="min-h-screen bg-white text-black px-4 py-6 sm:px-8 flex flex-col items-center">

      {/* Title */}
      <h1 className="text-xl sm:text-2xl font-semibold mb-6 capitalize text-center">
        {cat.replaceAll("_", " ")} — Written Questions
      </h1>

      {/* Unit buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6 w-full max-w-4xl">
        {units.map((unit, index) => (
          <ButtonDesigns
            key={index}
            label={unit}
            variant={selectedUnit === unit ? "primary" : "soft"}
            onClick={() => setSelectedUnit(unit)}
          />
        ))}
      </div>

      {/* Search */}
      {selectedUnit && (
        <div className="w-full max-w-md mb-4">
          <SearchBox
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by question or ID..."
            onClear={() => setSearchQuery("")}
          />
        </div>
      )}

      {/* Language toggle */}
      {selectedUnit && (
        <div className="mb-6">
          <ButtonDesigns
            label={showEnglish ? "Switch to Bangla" : "Switch to English"}
            variant="outline"
            onClick={() => setShowEnglish(!showEnglish)}
          />
        </div>
      )}

      {/* Questions */}
      <div className="w-full max-w-3xl space-y-4">
        {selectedUnit && (
          <p className="text-center font-bold underline underline-offset-8 mb-4">
            Total{" "}
            <span className="text-lg sm:text-xl text-red-500">
              {searchedQuestions.length}
            </span>{" "}
            Questions
          </p>
        )}

        {searchedQuestions.length > 0 ? (
          searchedQuestions.map((q, index) => (
            <div
              key={q.id}
              className="border p-4 sm:p-5 rounded-xl shadow-sm bg-white"
            >
              <p className="font-semibold text-sm sm:text-base">
                <span className="text-xs font-light text-gray-500">
                  ID: {q.id} —
                </span>{" "}
                Q{index + 1}: {q.question}
              </p>

              <div className="mt-2 text-sm sm:text-base text-gray-700">
                <strong>
                  Answer ({showEnglish ? "EN" : "BN"}):
                </strong>{" "}
                {showEnglish ? q.answer.en : q.answer.bn}
              </div>
            </div>
          ))
        ) : (
          selectedUnit && (
            <p className="text-gray-500 text-center">
              No questions found.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default WrittenAnswerPage;
