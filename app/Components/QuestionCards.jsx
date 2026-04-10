import React from 'react';

const QuestionCards = ({ question, index, selectedOption, onSelect }) => {
  return (
    <div className="py-2 transition-all">
      {/* Question Line - Compact */}
      <div className="flex gap-3 mb-3">
        <span className="shrink-0 font-black text-slate-400 text-sm w-6">
          {index + 1}.
        </span>
        <p className="text-sm font-semibold text-slate-800 leading-snug">
          {question.question}
        </p>
      </div>

      {/* Options Grid - Matches Answer Page Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 ml-9">
        {question.options.map((option, i) => {
          const isSelected = selectedOption === option;
          
          return (
            <label 
              key={i} 
              className={`group flex items-center gap-2 py-1 cursor-pointer transition-colors ${
                isSelected ? "text-blue-600 font-bold" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                checked={isSelected}
                onChange={() => onSelect(question.id, option)}
                className="hidden" // No native radio circle
              />

              {/* Compact Letter Indicator */}
              <span className={`
                uppercase w-5 h-5 flex items-center justify-center rounded text-[10px] font-black transition-all
                ${isSelected 
                  ? "bg-blue-600 text-white shadow-sm" 
                  : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                }
              `}>
                {String.fromCharCode(65 + i)}
              </span>

              {/* Option Text */}
              <span className="text-xs">{option}</span>
              
              {isSelected && <span className="text-[10px] animate-pulse">●</span>}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCards;