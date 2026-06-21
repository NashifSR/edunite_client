import React from "react";

const SectionHeader = ({ title }) => {
  return (
    <div className="flex items-center gap-3 mb-5 px-1">
      <div className="h-1.5 w-1.5 rounded-full bg-blue-500 ring-4 ring-blue-500/10" />
      <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
        {title}
      </h2>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-white/[0.08] via-white/[0.02] to-transparent" />
    </div>
  );
};

export default SectionHeader;