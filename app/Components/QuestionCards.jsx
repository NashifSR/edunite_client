import React from 'react';

const QuestionCards = ({ question, index, selectedOption, onSelect }) => {
  return (
    <div className="py-2 transition-all group/card">
      {/* Compact Question Header */}
      <div className="flex gap-3 mb-3">
        <span className="shrink-0 flex items-center justify-center font-black text-slate-400 text-xs w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 group-hover/card:text-blue-600 group-hover/card:border-blue-200 transition-colors">
          {index + 1}
        </span>
        <h3 className="text-sm font-bold text-slate-900 leading-snug pt-1">
          {question.question}
        </h3>
      </div>

      {/* Compact Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-0 sm:ml-10">
        {question.options.map((option, i) => {
          const isSelected = selectedOption === option;
          
          return (
            <label 
              key={i} 
              className={`
                group relative flex items-center gap-2.5 p-2 rounded-xl cursor-pointer border transition-all
                ${isSelected 
                  ? "border-blue-600 bg-blue-50/50 shadow-sm" 
                  : "border-slate-200 bg-white hover:border-slate-400"
                }
              `}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                checked={isSelected}
                onChange={() => onSelect(question.id, option)}
                className="sr-only"
              />

              {/* Compact Letter Indicator */}
              <span className={`
                uppercase w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-md text-[10px] font-black transition-all
                ${isSelected 
                  ? "bg-blue-600 text-white" 
                  : "bg-slate-200 text-slate-700 group-hover:bg-slate-300"
                }
              `}>
                {String.fromCharCode(65 + i)}
              </span>

              {/* High Contrast Option Text */}
              <span className={`text-xs leading-tight transition-colors ${
                isSelected ? "text-blue-700 font-bold" : "text-slate-900 font-medium"
              }`}>
                {option}
              </span>

              {/* Minimal Selection Dot */}
              {isSelected && (
                <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCards;