"use client";
import React from "react";

const CourseResources = () => {
  const categories = [
    {
      title: "Computer Operation",
      icon: "💻",
      color: "from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400",
      links: [
        { label: "Word - NSDA L3", url: "https://drive.google.com/drive/folders/1L9Bo2UU-5fZ0FHvAieoCWdAJY15CG2FO?usp=drive_link" },
        { label: "Excel - NSDA L3", url: "https://drive.google.com/drive/folders/16nEBzvodsEQ9CgjkahdeRpd23EUJFKnP?usp=drive_link" },
        { label: "PowerPoint - NSDA L3", url: "https://drive.google.com/drive/folders/1bXfvxLf-5yQeWiM38bJSwi7B38X8Dl8S?usp=drive_link" },
        { label: "Legacy - BTEB L1 & L3", url: "https://drive.google.com/drive/folders/1TowMF08sVIEOEjn-l11cNQKscsuF17Uk?usp=drive_link" },
      ],
    },
    {
      title: "Graphic Design",
      icon: "🎨",
      color: "from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-400",
      links: [
        { label: "PhotoShop Samples", url: "https://drive.google.com/drive/folders/1jEmwD4RMzRur0tCzd5odwU98VXsqjr5R" },
        { label: "Illustrator Samples", url: "https://drive.google.com/drive/folders/1PanwUyp_STuL-oJa1cKgOL6YrtwEjBSN?usp=sharing" },
        { label: "NSDA Assessment Sample", url: "https://drive.google.com/drive/folders/193hKjOSIx-wgoLqWWKPrvoUaxwa4WSQa?usp=drive_link" },
      ],
    },
    {
      title: "Digital Marketing",
      icon: "📈",
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400",
      links: [
        { label: "Social Media", url: "#" },
        { label: "Search Engine Optimization", url: "#" },
        { label: "Keyword Research", url: "#" },
        { label: "Market Research", url: "#" },
      ],
    },
    {
      title: "Web Development",
      icon: "🌐",
      color: "from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400",
      links: [
        { label: "HTML & CSS Practice", url: "#" },
        { label: "Figma Designs", url: "#" },
        { label: "JavaScript Resources", url: "#" },
        { label: "Complete Frontend Designs", url: "#" },
      ],
    },
    {
      title: "Software Suite",
      icon: "🛠️",
      color: "from-orange-500/20 to-amber-500/10 border-orange-500/30 text-orange-400",
      links: [
        { label: "Essential Softwares", url: "https://drive.google.com/drive/folders/1aOx3vP_jab-ZF7To7SlHO2ri3uoK1l4M?usp=sharing" },
      ],
    },
    {
      title: "Storage",
      icon: "☁️",
      color: "from-slate-500/20 to-slate-600/10 border-slate-500/30 text-slate-400",
      links: [
        { label: "Emergency Upload", url: "https://drive.google.com/drive/folders/1gN_24S0CKNHluu5wnq4aHFdPhF2vzNlJ?usp=sharing" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-200 py-16 px-4 sm:px-6 relative">
      
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[15%] w-[600px] h-[600px] rounded-full bg-blue-600/[0.03] blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[15%] w-[500px] h-[500px] rounded-full bg-indigo-600/[0.03] blur-[130px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        
        {/* Sleek Header Section */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-3 bg-white/[0.02] border border-white/[0.06] px-3 py-1 rounded-full backdrop-blur-md">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 ring-4 ring-blue-500/10" />
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Knowledge Base</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
            Course <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Resources</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto font-medium text-xs sm:text-sm leading-relaxed">
            Access blueprints, sample materials, assessment folders, and essential software sets curated for your training path.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((category, i) => (
            <div
              key={i}
              className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-white/[0.05] hover:border-blue-500/30 hover:bg-slate-900/80 transition-all duration-300 shadow-xl shadow-black/20 flex flex-col group"
            >
              {/* Category Identity */}
              <div className="flex items-center gap-3.5 mb-5">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br border flex items-center justify-center shadow-md shadow-black/10 group-hover:scale-105 transition-all duration-300 ${category.color}`}>
                  <span className="text-xl select-none">{category.icon}</span>
                </div>
                <h2 className="text-base font-bold text-slate-100 tracking-tight">
                  {category.title}
                </h2>
              </div>

              {/* Links List */}
              <div className="space-y-2 mt-auto">
                {category.links.map((link, j) => (
                  <a
                    key={j}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-blue-600 border border-white/[0.04] hover:border-blue-500/50 group/item transition-all duration-200"
                  >
                    <span className="text-slate-300 group-hover/item:text-white font-bold text-xs tracking-wide">
                      {link.label}
                    </span>
                    <svg
                      className="w-3.5 h-3.5 text-slate-500 group-hover/item:text-white transition-all duration-200 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Clean Footer Note */}
        <div className="mt-16 text-center py-6 border-t border-white/[0.06]">
          <p className="text-slate-500 text-xs font-semibold tracking-wide">
            📁 Cloud assets synchronized automatically with primary drive storage repositories.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseResources;