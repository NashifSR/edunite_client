"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const SetDropdown = ({ sets, selectedSet, onSelect, totalItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });

  // Dynamically calculate where the button is on the window to position the portal
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen]);

  // Recalculate positions on window resize or scroll
  useEffect(() => {
    const handlePositionUpdate = () => {
      if (isOpen && triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setCoords({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
        });
      }
    };

    window.addEventListener("resize", handlePositionUpdate);
    window.addEventListener("scroll", handlePositionUpdate, true);
    return () => {
      window.removeEventListener("resize", handlePositionUpdate);
      window.removeEventListener("scroll", handlePositionUpdate, true);
    };
  }, [isOpen]);

  return (
    <div className="relative w-full max-w-xs">
      {/* Anchor Trigger Button */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-900/90 border border-white/[0.06] text-left transition-all backdrop-blur-md shadow-lg shadow-black/10 group"
      >
        <div>
          <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest leading-none">Modules</p>
          <p className="text-sm font-bold text-white mt-1">
            {selectedSet || "Choose an Assessment"}
          </p>
        </div>
        <svg 
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-400' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Portal Overlay Content */}
      {isOpen && typeof window !== "undefined" && createPortal(
        <>
          {/* Global escape hatch backdrop click */}
          <div className="fixed inset-0 z-[9998]" onClick={() => setIsOpen(false)} />
          
          {/* Popover Menu floated out of document constraints */}
          <div 
            style={{
              position: "absolute",
              top: `${coords.top + 8}px`,
              left: `${coords.left}px`,
              width: `${coords.width}px`,
            }}
            className="bg-[#0d1321] border border-white/[0.08] rounded-xl shadow-2xl py-1.5 z-[9999] animate-in fade-in slide-in-from-top-1 duration-150"
          >
            <div className="px-3 py-1.5 text-[9px] font-black text-slate-500 uppercase tracking-widest border-b border-white/[0.03]">
              Available Pools ({sets.length})
            </div>
            
            <div className="max-h-60 overflow-y-auto scrollbar-hide py-1">
              {sets.map((setName) => (
                <button
                  key={setName}
                  onClick={() => {
                    onSelect(setName);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors flex items-center justify-between ${
                    selectedSet === setName
                      ? "bg-blue-600/10 text-blue-400 border-l-2 border-blue-500"
                      : "text-slate-300 hover:bg-white/[0.02] hover:text-white"
                  }`}
                >
                  <span>{setName}</span>
                  {selectedSet === setName && <span className="text-[10px]">●</span>}
                </button>
              ))}
            </div>

            <div className="px-3 pt-2 pb-1 text-[9px] font-medium text-slate-500 border-t border-white/[0.03]">
              Database: {totalItems} items loaded
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  );
};

export default SetDropdown;