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
    },
    {
      name: "RPL Form",
      linkUrl: "https://forms.gle/8XkNSGATDzdcGLav6",
      desc: "Recognition of Prior Learning Assessment",
      type: "Google Form",
    },
    {
      name: "LearnDesk",
      linkUrl: "https://learndesk.netlify.app/",
      desc: "E-Learning Central Resources & Materials",
      type: "Internal Portal",
    },
    {
      name: "UCEP TVET",
      linkUrl: "https://uceptvet.netlify.app/",
      desc: "Technical & Vocational Education Platform",
      type: "Main Website",
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {portals.map((portal, index) => (
        <div
          key={index}
          className="group relative bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 transition-all duration-300 hover:border-blue-500/40 hover:bg-slate-900/95 hover:shadow-xl hover:shadow-black/40 flex flex-col justify-between overflow-hidden"
        >
          <div>
            {/* Top Label Layer */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {portal.type}
              </span>
              <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-blue-400 transition-colors duration-300 ring-4 ring-transparent group-hover:ring-blue-500/10" />
            </div>

            {/* Header Text */}
            <h3 className="text-lg font-bold text-white leading-tight mb-2 tracking-tight group-hover:text-blue-400 transition-colors">
              {portal.name}
            </h3>
            
            {/* Body Text */}
            <p className="text-xs font-medium text-slate-300 leading-relaxed mb-6">
              {portal.desc}
            </p>
          </div>

          {/* Action Call */}
          <Link target="_blank" href={portal.linkUrl} className="w-full z-10">
            <ButtonDesigns 
              label={`Open ${portal.name}`} 
              variant="primary" 
              className="w-full text-xs font-bold uppercase tracking-wider py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all"
            />
          </Link>
          
          {/* High-Contrast Integrated Background Decoration */}
          <div className="absolute -bottom-3 -right-3 text-white opacity-[0.02] pointer-events-none group-hover:opacity-[0.06] group-hover:scale-110 transition-all duration-300">
            <svg width="96" height="96" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PortalLinks;