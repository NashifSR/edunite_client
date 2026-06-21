"use client";

import React from "react";

const SearchBox = ({ value, onChange, placeholder = "Search...", onClear }) => {
  return (
    <div className="relative w-full flex items-center h-10">
      {/* Search Lens Icon */}
      <div className="absolute left-3.5 pointer-events-none text-slate-500 flex items-center justify-center">
        <svg 
          className="w-3.5 h-3.5" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
        </svg>
      </div>

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full pl-9 pr-10 bg-transparent text-xs font-bold text-slate-200 placeholder-slate-500 outline-none rounded-xl transition-colors"
      />

      {/* Clear Button - Absolute pinned inside input bounds */}
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 w-5 h-5 flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors active:scale-95"
        >
          <svg 
            className="w-2.5 h-2.5" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBox;