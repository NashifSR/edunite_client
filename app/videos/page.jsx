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

  // Fix Hydration: Ensure component is mounted before setting default category
  useEffect(() => {
    setMounted(true);
    setActiveCategory(categories[0]);
  }, [categories]);

  const filteredVideos = allVideos.filter(video => 
    video.title === activeCategory && 
    video.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!mounted) return null; // Prevent flash of unstyled content/mismatch

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row">
      {/* Left Sidebar - Navigation */}
      <aside className="w-full md:w-80 bg-white border-r border-slate-200 p-6 flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-2">learndesk</h2>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Video Courseware</p>
        </div>

        <nav className="flex flex-col gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-left px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                activeCategory === cat 
                ? "bg-orange-500 text-white shadow-lg shadow-orange-200" 
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 lg:p-16">
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              {activeCategory}
            </h1>
            <p className="text-slate-500 mt-1 font-medium">Browse through your available video lessons.</p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input 
              type="text"
              placeholder="Search lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full lg:w-72 pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all shadow-sm"
            />
            <svg className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </header>

        {/* Video Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {filteredVideos.map((video, index) => (
            <div key={index} className="group flex flex-col bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
              <div className="aspect-video relative overflow-hidden bg-slate-900">
                 <iframe
                    className="w-full h-full"
                    src={video.url}
                    title={video.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                    {video.name}
                  </h3>
                  <div className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-wider">
                    Lesson {index + 1}
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <a 
                    href={video.url.replace("embed/", "watch?v=")}
                    target="_blank"
                    className="flex-1 bg-slate-900 text-white text-center py-3.5 rounded-2xl font-bold text-sm hover:bg-red-600 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Watch Full Screen
                  </a>
                </div>
              </div>
            </div>
          ))}

          {filteredVideos.length === 0 && (
            <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] border border-dashed border-slate-300">
               <span className="text-4xl">🔍</span>
               <p className="mt-4 text-slate-500 font-bold">No videos found matching your search.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default VideoLibrary;