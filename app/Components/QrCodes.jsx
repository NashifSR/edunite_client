import React from "react";
import ButtonDesigns from "./ButtonDesigns";
import Link from "next/link";

const PortalLinks = () => {
  const portals = [
    {
      name: "RTO Form",
      linkUrl: "https://forms.gle/wugGSbh55kGgg5jW7",
      desc: "Registration & Training Operations Management",
      type: "Google Form",
      dotColor: "bg-blue-400",
      accentGlow: "group-hover:border-blue-500/30 group-hover:shadow-blue-500/5",
    },
    {
      name: "RPL Form",
      linkUrl: "https://forms.gle/8XkNSGATDzdcGLav6",
      desc: "Recognition of Prior Learning Assessment",
      type: "Google Form",
      dotColor: "bg-purple-400",
      accentGlow: "group-hover:border-purple-500/30 group-hover:shadow-purple-500/5",
    },
    {
      name: "LearnDesk",
      linkUrl: "https://learndesk.netlify.app/",
      desc: "E-Learning Central Resources & Materials",
      type: "Internal Portal",
      dotColor: "bg-cyan-400",
      accentGlow: "group-hover:border-cyan-500/30 group-hover:shadow-cyan-500/5",
    },
    {
      name: "UCEP TVET",
      linkUrl: "https://uceptvet.netlify.app/",
      desc: "Technical & Vocational Education Platform",
      type: "Main Website",
      dotColor: "bg-emerald-400",
      accentGlow: "group-hover:border-emerald-500/30 group-hover:shadow-emerald-500/5",
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {portals.map((portal, index) => (
        <div
          key={index}
          className={`group relative bg-slate-900/50 backdrop-blur-md p-5 rounded-xl border border-white/[0.05] transition-all duration-300 hover:bg-slate-900/80 hover:shadow-2xl flex flex-col justify-between overflow-hidden active:scale-[0.99] ${portal.accentGlow}`}
        >
          {/* Subtle Hover Ambient Background Light */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] group-hover:bg-current/[0.02] rounded-full blur-xl pointer-events-none transition-all duration-300" />

          <div>
            {/* Top Label Layer */}
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                {portal.type}
              </span>
              <div className={`w-1.5 h-1.5 rounded-full bg-white/10 ${portal.dotColor} opacity-40 group-hover:opacity-100 transition-all duration-300 ring-4 ring-transparent group-hover:ring-current/10`} />
            </div>

            {/* Header Text */}
            <h3 className="text-base font-bold text-white leading-tight mb-2 tracking-tight group-hover:text-slate-100 transition-colors">
              {portal.name}
            </h3>
            
            {/* Body Text */}
            <p className="text-xs font-medium text-slate-400 leading-relaxed mb-6">
              {portal.desc}
            </p>
          </div>

          {/* Action Call Button Container */}
          <Link target="_blank" href={portal.linkUrl} className="w-full z-10 block">
            <ButtonDesigns 
              label={`Open ${portal.name}`} 
              variant="primary" 
              className="w-full text-[11px] font-black uppercase tracking-wider py-2.5 rounded-lg transition-all"
            />
          </Link>

          {/* Premium Tech-Style Accent Corner Overlay instead of the big bulky icon */}
          <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/0 group-hover:border-white/20 rounded-tr-xl transition-all duration-300" />
          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/0 group-hover:border-white/20 rounded-bl-xl transition-all duration-300" />
        </div>
      ))}
    </div>
  );
};

export default PortalLinks;