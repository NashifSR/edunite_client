import React from "react";
import ButtonDesigns from "./ButtonDesigns";
import Link from "next/link";

const PortalLinks = () => {
  const portals = [
    {
      name: "RTO Form",
      linkUrl: "https://forms.gle/wugGSbh55kGgg5jW7",
      desc: "Registration & Training Operations",
      type: "Google Form",
    },
    {
      name: "RPL Form",
      linkUrl: "https://forms.gle/8XkNSGATDzdcGLav6",
      desc: "Recognition of Prior Learning",
      type: "Google Form",
    },
    {
      name: "LearnDesk",
      linkUrl: "https://learndesk.netlify.app/",
      desc: "E-Learning Resources & Materials",
      type: "Internal Portal",
    },
    {
      name: "UCEP TVET",
      linkUrl: "https://uceptvet.netlify.app/",
      desc: "Technical & Vocational Education",
      type: "Main Website",
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {portals.map((portal, index) => (
        <div
          key={index}
          className="group relative bg-white p-6 rounded-[2rem] border border-slate-200 transition-all duration-300 hover:border-slate-900 hover:shadow-2xl hover:shadow-slate-200/50 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                {portal.type}
              </span>
              <div className="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-blue-500 transition-colors" />
            </div>

            <h3 className="text-lg font-black text-slate-900 leading-tight mb-2">
              {portal.name}
            </h3>
            
            <p className="text-xs font-medium text-slate-500 leading-relaxed mb-6">
              {portal.desc}
            </p>
          </div>

          <Link target="_blank" href={portal.linkUrl} className="w-full">
            <ButtonDesigns 
              label={`Open ${portal.name}`} 
              variant="primary" 
              className="w-full text-[10px] font-black uppercase tracking-widest"
            />
          </Link>
          
          {/* Subtle background decoration */}
          <div className="absolute -bottom-2 -right-2 text-slate-50 opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PortalLinks;