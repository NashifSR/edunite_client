"use client";

import React, { useMemo } from "react";

const CriteriaDropdown = ({ 
  data = [], 
  criteriaKey, 
  selectedValue, 
  onSelect, 
  allLabel = "All Items"
}) => {
  // Extract unique, valid sorted criteria options from data pool
  const uniqueOptions = useMemo(() => {
    if (!data.length || !criteriaKey) return [];
    const extracted = data.map((item) => item[criteriaKey]).filter(Boolean);
    return [...new Set(extracted)].sort((a, b) =>
      String(a).localeCompare(String(b), undefined, { numeric: true })
    );
  }, [data, criteriaKey]);

  return (
    <div className="w-full md:w-56 relative">
      <select
        value={selectedValue || ""}
        onChange={(e) => onSelect(e.target.value || null)}
        className="w-full h-10 px-3 bg-slate-950/40 border border-white/[0.06] rounded-xl text-xs font-bold text-slate-300 outline-none cursor-pointer appearance-none transition-colors focus:border-emerald-500/40 focus:text-white"
      >
        <option value="" className="bg-[#090d16] text-slate-400">
          {allLabel}
        </option>
        
        {uniqueOptions.map((option, index) => (
          <option 
            key={`criteria-${criteriaKey}-${option}-${index}`} 
            value={option}
            className="bg-[#090d16] text-slate-200"
          >
            {option}
          </option>
        ))}
      </select>

      {/* Custom Custom SVG Chevron indicator because we killed 'appearance-none' */}
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-500">
        <svg 
          className="w-3.5 h-3.5" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </div>
  );
};

export default CriteriaDropdown;