"use client";

import React, { useState, useMemo } from "react";
import useShortQuestions from "@/app/Hooks/useShortQuestions";
import SearchBox from "@/app/Components/SearchBox";

const WrittenAnswerPage = ({ params }) => {
  const { category: cat } = React.use(params);
  const { shortQuestions } = useShortQuestions();

  const [selectedUnit, setSelectedUnit] = useState(null);
  const [showEnglish, setShowEnglish] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const categoryQuestions = useMemo(
    () => shortQuestions?.[cat] || [],
    [shortQuestions, cat]
  );

  const units = useMemo(
    () => [...new Set(categoryQuestions.map((q) => q.unit))],
    [categoryQuestions]
  );

  const filteredQuestions = useMemo(
    () =>
      selectedUnit
        ? categoryQuestions.filter((q) => q.unit === selectedUnit)
        : [],
    [selectedUnit, categoryQuestions]
  );

  const searchedQuestions = useMemo(
    () =>
      filteredQuestions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.id.toString() === searchQuery
      ),
    [filteredQuestions, searchQuery]
  );

  return (
    <div className="min-h-screen bg-white text-black">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/10">
        <div className="max-w-7xl mx-auto px-3 py-2">

          <div className="flex items-center justify-between gap-3">

            <div className="min-w-0">
              <h1 className="text-base md:text-lg font-black capitalize truncate">
                {cat.replaceAll("_", " ")}
              </h1>

              <div className="flex items-center gap-2 mt-1 flex-wrap text-[10px] font-black uppercase tracking-wider">
                <span>Written Answers</span>

                {selectedUnit && (
                  <>
                    <span className="text-black/30">•</span>
                    <span>{selectedUnit}</span>
                    <span className="text-black/30">•</span>
                    <span>{searchedQuestions.length}</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">

              <div className="hidden md:block w-60">
                <SearchBox
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search..."
                  onClear={() => setSearchQuery("")}
                />
              </div>

              {selectedUnit && (
                <button
                  onClick={() => setShowEnglish(!showEnglish)}
                  className="h-10 px-4 rounded-xl text-[11px] font-black uppercase bg-black text-white active:scale-95"
                >
                  {showEnglish ? "EN" : "BN"}
                </button>
              )}
            </div>
          </div>

          {/* UNITS */}
          <div className="flex gap-2 overflow-x-auto pt-3 no-scrollbar">

            <button
              onClick={() => setSelectedUnit(null)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-black border whitespace-nowrap transition-all ${
                selectedUnit === null
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-black/10 hover:bg-black/5"
              }`}
            >
              All Units
            </button>

            {units.map((unit, index) => (
              <button
                key={index}
                onClick={() => setSelectedUnit(unit)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-black border whitespace-nowrap transition-all ${
                  selectedUnit === unit
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-black/10 hover:bg-black/5"
                }`}
              >
                {unit}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 py-4">

        {/* MOBILE SEARCH */}
        <div className="md:hidden mb-4">
          <SearchBox
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search question..."
            onClear={() => setSearchQuery("")}
          />
        </div>

        {/* EMPTY STATE */}
        {!selectedUnit ? (

          <div className="border border-black/10 rounded-2xl p-10 text-center">
            <div className="text-4xl mb-3">📘</div>
            <h2 className="text-lg font-black">Select a Unit</h2>
            <p className="text-sm text-black/60 mt-1">
              Choose a unit from above.
            </p>
          </div>

        ) : searchedQuestions.length > 0 ? (

          /* QUESTIONS */
          <div className="space-y-2">

            {searchedQuestions.map((q, index) => (
              <div
                key={q.id}
                className="border border-black/10 rounded-2xl p-3 hover:border-black/30 transition-all"
              >

                {/* META */}
                <div className="flex items-center justify-between mb-2">

                  <div className="flex items-center gap-2 flex-wrap">

                    <span className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center text-[11px] font-black">
                      {index + 1}
                    </span>

                    <span className="px-2 py-1 rounded-lg bg-black/5 text-black text-[10px] font-black uppercase">
                      ID #{q.id}
                    </span>

                    <span className="px-2 py-1 rounded-lg bg-black/5 text-black text-[10px] font-black uppercase">
                      {q.unit}
                    </span>

                    <span className="px-2 py-1 rounded-lg bg-orange-100 text-orange-600 text-[10px] font-black uppercase">
                      {showEnglish ? "EN" : "BN"}
                    </span>

                  </div>

                  <span className="text-black/40 text-xs">→</span>
                </div>

                {/* QUESTION */}
                <h3 className="text-sm md:text-[15px] font-black leading-relaxed mb-3">
                  {q.question}
                </h3>

                {/* ANSWER */}
                <div className="rounded-xl border border-black/10 px-3 py-2.5 text-sm leading-relaxed font-medium bg-black/[0.03]">
                  {showEnglish ? q.answer.en : q.answer.bn}
                </div>
              </div>
            ))}
          </div>

        ) : (

          <div className="border border-black/10 bg-black/[0.03] rounded-2xl p-10 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <h2 className="text-lg font-black">No Results</h2>
            <p className="text-sm text-black/60 mt-1">
              Try another keyword or unit.
            </p>
          </div>

        )}
      </main>
    </div>
  );
};

export default WrittenAnswerPage;