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
    <div className="min-h-screen p-8 text-black flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-6 capitalize">
        {cat} - Written Questions
      </h1>

      {/* Unit buttons */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {units.map((unit, index) => (
          <ButtonDesigns
            key={index}
            label={unit}
            variant={selectedUnit === unit ? "primary" : "soft"}
            onClick={() => setSelectedUnit(unit)}
          />
        ))}
      </div>

      {/* Search box */}
      {selectedUnit && (
        <SearchBox
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by question or ID..."
          onClear={() => setSearchQuery("")}
        />
      )}

      {/* Language toggle */}
      {selectedUnit && (
        <div className="mb-6">
          <ButtonDesigns
            label={`${showEnglish ? "Bangla" : "English"}`}
            variant="outline"
            onClick={() => setShowEnglish(!showEnglish)}
          />
        </div>
      )}

      {/* Questions */}
      <div className="w-full max-w-2xl space-y-4">
        <p className="text-center font-bold underline underline-offset-8">
          Total{" "}
          <span className="font-bold text-xl text-red-400">
            {searchedQuestions.length}
          </span>{" "}
          Questions in this Category
        </p>
        {searchedQuestions.length > 0 ? (
          searchedQuestions.map((q, index) => (
            <div
              key={q.id}
              className={`border p-4 rounded shadow bg-white ${
                showEnglish == "Bangla" ? "bg-black text-white" : "bg-white"
              }`}
            >
              <p className="font-semibold">
                <span className="text-sm font-light">Id:{q.id} -</span> Q-
                {index + 1}: {q.question}
              </p>
              <div className="mt-2 text-gray-700">
                <p>
                  <strong>Answer ({showEnglish ? "EN" : "BN"}):</strong>{" "}
                  {showEnglish ? q.answer.en : q.answer.bn}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No questions found.</p>
        )}
      </div>
    </div>
  );
};

export default WrittenAnswerPage;
