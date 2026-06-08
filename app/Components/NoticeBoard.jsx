"use client";
import React, { useState, useEffect } from "react";
import useNotice from "../Hooks/useNotice";

const NoticeBoard = () => {
  const { notice, isLoading, isError } = useNotice();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isLoading || isError || !notice?.length) return null;

  const latest = notice[notice.length - 1];

  const getFormattedTime = () => {
    return new Date(latest.time).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div
      className={`
        fixed top-24 right-0 z-50 transition-all duration-300 ease-in-out 
        bg-slate-900/90 backdrop-blur-xl border border-r-0 border-white/10
        shadow-xl shadow-black/40 rounded-l-xl cursor-pointer overflow-hidden
        ${isOpen ? "w-80 p-5 translate-x-0" : "w-12 h-12 p-0 translate-x-0 flex items-center justify-center hover:bg-slate-800/90"}
      `}
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? (
        <div className="w-full space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2 text-amber-400">
              <span className="text-base animate-pulse">📢</span>
              <h3 className="font-bold text-xs uppercase tracking-wider text-white">
                Latest Notice
              </h3>
            </div>
            {/* Close hint */}
            <span className="text-[10px] font-bold text-slate-400 uppercase bg-white/5 px-2 py-0.5 rounded border border-white/5">
              Hide
            </span>
          </div>

          {/* Message Content */}
          <p className="text-sm text-slate-200 font-medium leading-relaxed break-words">
            {latest.message}
          </p>

          {/* Meta Info */}
          <div className="pt-1 text-xs text-slate-400 border-t border-white/5 flex items-center justify-between gap-2 flex-wrap">
            <span className="font-semibold text-slate-300">— {latest.author}</span>
            <span className="text-[11px] text-slate-500 font-mono">
              {mounted ? getFormattedTime() : "Loading time..."}
            </span>
          </div>
        </div>
      ) : (
        /* Minimalist Closed Tab State */
        <div className="relative flex items-center justify-center w-full h-full text-lg group">
          <span className="animate-bounce">📢</span>
          {/* Unread dot indicator */}
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-slate-900" />
        </div>
      )}
    </div>
  );
};

export default NoticeBoard;