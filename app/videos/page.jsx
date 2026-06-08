"use client";

import React, { useState, useEffect, useMemo } from "react";

const VideoLibrary = () => {
  const allVideos = useMemo(() => [
    { title: "Excel Beginner Functions", name: "SUM – Adds a range of numbers.", url: "https://www.youtube.com/embed/-u-9f3QrdAQ" },
    { title: "Excel Beginner Functions", name: "AVERAGE – Finds the mean of a range.", url: "https://www.youtube.com/embed/QpdLjWjlHYM" },
    { title: "Excel Beginner Functions", name: "MAX, MIN – Returns highest/lowest values.", url: "https://www.youtube.com/embed/E2xl9E0lLrU" },
    { title: "Excel Beginner Functions", name: "LEN – Counts cell characters.", url: "https://www.youtube.com/embed/FooybTed-5M" },
    { title: "Excel Beginner Functions", name: "TRIM – Removes extra spaces.", url: "https://www.youtube.com/embed/lx-V_pyfDU4" },
    { title: "Excel Beginner Functions", name: "TEXTJOIN – Joins text strings.", url: "https://www.youtube.com/embed/Aqib7yjiZw4" },
    { title: "Excel Beginner Functions", name: "COUNTIF – Conditional counting.", url: "https://www.youtube.com/embed/n12-7HAXBdQ" },
    { title: "Excel Intermediate Functions", name: "IF – Basic logical test.", url: "https://www.youtube.com/embed/hX5BA8tY5jg" },
    { title: "Excel Intermediate Functions", name: "SUMIF – Add with single condition.", url: "https://www.youtube.com/embed/weFgBnZwWlk" },
    { title: "Excel Intermediate Functions", name: "SUMIFS – Add with multiple conditions.", url: "https://www.youtube.com/embed/5ccvb4TwpGc" },
    { title: "Excel Advanced Functions", name: "VLOOKUP – Table searching.", url: "https://www.youtube.com/embed/rqnIF__i5XU" },
    { title: "MS Word - Job 1", name: "Set 1 - Essentials", url: "https://www.youtube.com/embed/Kv7bMZNcDp0" },
    { title: "MS Word - Job 1", name: "Set 2 - Essentials", url: "https://www.youtube.com/embed/mlUdvGXfWew" },
    { title: "MS Excel - Job 2", name: "Set 1 - Essentials", url: "https://www.youtube.com/embed/29wHqMJh03A" },
    { title: "MS PowerPoint - Job 3", name: "Set 1 - Mastery", url: "https://www.youtube.com/embed/4YPq6F3gFB4" },
    { title: "Other Jobs", name: "Zoom Meeting Basics", url: "https://www.youtube.com/embed/mcjoZMmK4n0" },
    { title: "Other Jobs", name: "Google Forms Tutorial", url: "https://www.youtube.com/embed/lemx0LW7ABY" },
  ], []);

  const categories = useMemo(() => [...new Set(allVideos.map((v) => v.title))], [allVideos]);
  
  const [activeCategory, setActiveCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setActiveCategory(categories[0]);
  }, [categories]);

  const filteredVideos = allVideos.filter(video => 
    video.title === activeCategory && 
    video.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Structural loading shell to prevent hydration flickering
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#090d16] text-slate-200 flex items-center justify-center">
        <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Loading Library Matrix...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-200 relative flex flex-col md:flex-row">
      {/* Background Ambience Layers */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-orange-500/[0.015] blur-[150px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-emerald-500/[0.015] blur-[130px]" />
      </div>

      {/* Left Sidebar - Control Panel */}
      <aside className="w-full md:w-80 bg-[#0c1220]/60 backdrop-blur-xl border-b md:border-b-0 md:border-r border-white/[0.05] p-6 flex flex-col gap-8">
        <div>
          <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            learndesk <span className="text-[10px] bg-orange-500/10 text-orange-400 px-1.5 py-0.5 rounded border border-orange-500/20 uppercase tracking-widest font-black">Core</span>
          </h2>
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">Video Courseware Terminal</p>
        </div>

        <nav className="flex flex-col gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-left px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border ${
                activeCategory === cat 
                  ? "bg-white text-[#090d16] border-white shadow-lg shadow-white/5 font-black" 
                  : "bg-transparent text-slate-400 border-transparent hover:bg-white/[0.03] hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Workspace */}
      <main className="flex-1 p-6 md:p-10 lg:p-14 overflow-y-auto">
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 pb-6 border-b border-white/[0.04]">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight capitalize">
              {activeCategory}
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-medium">Select a system index lesson node to begin runtime streams.</p>
          </div>

          {/* Glowing Filter Search Field */}
          <div className="relative group">
            <input 
              type="text"
              placeholder="Search target lesson logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full lg:w-72 pl-9 pr-4 py-2.5 bg-slate-950/50 border border-white/[0.06] rounded-xl focus:border-orange-500/40 focus:bg-[#0c121e] text-xs text-slate-200 outline-none transition-all placeholder:text-slate-600"
            />
            <svg className="absolute left-3 top-3 w-4 h-4 text-slate-500 group-focus-within:text-orange-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </header>

        {/* Dynamic Video Grid Matrix */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredVideos.map((video, index) => (
            <div key={index} className="group flex flex-col bg-slate-900/20 backdrop-blur-xl border border-white/[0.05] focus-within:border-orange-500/30 rounded-2xl transition-all duration-300 shadow-xl overflow-hidden">
              {/* Responsive Video Window Container */}
              <div className="aspect-video relative overflow-hidden bg-slate-950/80 border-b border-white/[0.04]">
                <iframe
                  className="w-full h-full"
                  src={video.url}
                  title={video.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>

              {/* Course Detail Card Blocks */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <div className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-slate-400 text-[9px] font-black uppercase tracking-wider">
                      Module Entry {index + 1}
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-slate-100 group-hover:text-orange-400 transition-colors leading-snug tracking-tight">
                    {video.name}
                  </h3>
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.03]">
                  <a 
                    href={video.url.replace("embed/", "watch?v=")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white/[0.03] text-slate-300 border border-white/[0.06] hover:bg-white hover:text-[#090d16] hover:border-white text-center py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-1.5"
                  >
                    Watch Full Surface
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* Empty Search States */}
          {filteredVideos.length === 0 && (
            <div className="col-span-full py-16 text-center bg-slate-900/10 border border-dashed border-white/[0.06] rounded-2xl">
              <span className="text-2xl block mb-2 opacity-60">🔍</span>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">No matching lesson blocks found inside this index grid.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default VideoLibrary;