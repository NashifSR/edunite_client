"use client";

import React, { useState } from "react";

const SectionToggle = ({
  options = ["Answers", "Tests"],
  defaultSection = "answers",
  onChange,
}) => {
  const [selected, setSelected] = useState(defaultSection);

  const handleClick = (option) => {
    const lowerOption = option.toLowerCase();
    setSelected(lowerOption);
    if (onChange) onChange(lowerOption);
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6">
      {options.map((option) => {
        const isSelected = selected === option.toLowerCase();
        const isAnswers = option.toLowerCase() === "answers";

        return (
          <button
            key={option}
            onClick={() => handleClick(option)}
            className={`
              px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-semibold shadow 
              transition-all duration-200 transform
              ${isSelected 
                ? isAnswers 
                  ? "bg-green-500 text-white scale-105"
                  : "bg-blue-500 text-white scale-105"
                : isAnswers
                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                  : "bg-blue-100 text-blue-800 hover:bg-blue-200"
              }
              focus:outline-none focus:ring-2 focus:ring-offset-2
              ${isAnswers ? "focus:ring-green-300" : "focus:ring-blue-300"}
            `}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default SectionToggle;
