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

  const categoryQuestions = useMemo(() => shortQuestions?.[cat] || [], [shortQuestions, cat]);
  const units = useMemo(() => [...new Set(categoryQuestions.map((q) => q.unit))], [categoryQuestions]);

  const filteredQuestions = useMemo(() =>
    selectedUnit ? categoryQuestions.filter((q) => q.unit === selectedUnit) : [],
    [selectedUnit, categoryQuestions]
  );

  const searchedQuestions = useMemo(() =>
    filteredQuestions.filter(
      (q) =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.id.toString() === searchQuery
    ),
    [filteredQuestions, searchQuery]
  );

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Ultra-Slim Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-2.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-x-4">

          {/* 1. Title - Added flex items-center to match sibling height */}
          <div className="flex items-center min-w-0">
            <h1 className="text-md font-black text-slate-900 capitalize truncate tracking-tight">
              {cat.replaceAll("_", " ")}
            </h1>
          </div>

          {/* 2. Search Container - Grouped Right */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:block w-32 md:w-48 lg:w-64">
              <SearchBox
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search..."
                onClear={() => setSearchQuery("")}
              />
            </div>
          </div>

          {/* 3. Language Toggle */}
          <div className="shrink-0 flex items-center">
            {selectedUnit && (
              <button
                onClick={() => setShowEnglish(!showEnglish)}
                className="whitespace-nowrap px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black rounded-full transition-all duration-200 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-100 active:scale-95 border border-transparent"
              >
                {showEnglish ? "EN → BN" : "BN → EN"}
              </button>
            )}
          </div>

        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-6">
        {/* Unit Selection Chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {units.map((unit, index) => (
            <button
              key={index}
              onClick={() => setSelectedUnit(unit)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedUnit === unit
                ? "bg-slate-900 text-white shadow-md"
                : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100"
                }`}
            >
              {unit}
            </button>
          ))}
        </div>

        {!selectedUnit ? (
          <p className="text-center text-slate-400 text-sm mt-20">Select a unit to view questions.</p>
        ) : (
          <div className="space-y-6">
            {/* Mobile Search - only shows when unit selected */}
            <div className="sm:hidden mb-4">
              <SearchBox
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search questions..."
                onClear={() => setSearchQuery("")}
              />
            </div>

            {searchedQuestions.length > 0 ? (
              searchedQuestions.map((q, index) => (
                <div key={q.id} className="group">
                  {/* Question Header */}
                  <div className="flex gap-3 mb-2">
                    <span className="text-slate-300 font-black text-sm pt-0.5">
                      {index + 1}.
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-800 leading-snug">
                      {q.question}
                    </h3>
                  </div>

                  {/* Clean Answer Block */}
                  <div className="ml-7 py-2 text-sm sm:text-base text-slate-600 border-l-2 border-slate-100 pl-4 group-hover:border-emerald-400 transition-colors">
                    {showEnglish ? q.answer.en : q.answer.bn}
                    <span className="block text-[9px] font-bold text-slate-300 mt-2 uppercase tracking-tighter">
                      REF ID: #{q.id}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-400 text-sm py-10">No matches found.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default WrittenAnswerPage;