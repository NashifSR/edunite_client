import React from "react";
import Link from "next/link";

const ActionButton = ({ href, accentColor, dotColor, icon, label }) => {
  return (
    <Link href={href} className="w-full block group">
      <button 
        className={`w-full bg-slate-900/60 border border-white/[0.06] backdrop-blur-md py-3 px-5 rounded-xl flex items-center justify-between transition-all duration-300 group-hover:bg-slate-900/90 active:scale-[0.98] shadow-lg shadow-black/10 ${accentColor}`}
      >
        <div className="flex items-center gap-3">
          <span className="text-base select-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            {icon}
          </span>
          <span className="tracking-wide text-xs font-bold text-slate-100 group-hover:text-white transition-colors">
            {label}
          </span>
        </div>
        <div 
          className={`w-1.5 h-1.5 rounded-full ${dotColor} opacity-40 group-hover:opacity-100 transition-opacity duration-300 ring-4 ring-transparent group-hover:ring-current/10`} 
        />
      </button>
    </Link>
  );
};

export default ActionButton;