"use client";
import React from "react";

const Resources = () => {
  const categories = [
    {
      title: "Typing & Practice",
      icon: "🧠",
      color: "from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400",
      links: [
        { label: "Keybr – Smart Practice", url: "https://www.keybr.com/" },
        { label: "TypingClub – Learn Touch", url: "https://www.typingclub.com/" },
        { label: "10FastFingers – Speed Tests", url: "https://10fastfingers.com/" },
        { label: "Monkeytype – Custom Typing", url: "https://monkeytype.com/" },
      ],
    },
    {
      title: "Google Tools & Forms",
      icon: "📄",
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400",
      links: [
        { label: "Google Forms", url: "https://forms.google.com/" },
        { label: "Google Docs", url: "https://docs.google.com/" },
        { label: "Google Drive", url: "https://drive.google.com/" },
        { label: "Google Slides", url: "https://slides.google.com/" },
      ],
    },
    {
      title: "Graphic Inspiration",
      icon: "🎨",
      color: "from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-400",
      links: [
        { label: "Behance – Portfolios", url: "https://www.behance.net/" },
        { label: "Pinterest – Design Ideas", url: "https://www.pinterest.com/" },
        { label: "Dribbble – UI/UX Showcase", url: "https://dribbble.com/" },
        { label: "Awwwards – Web Design", url: "https://www.awwwards.com/" },
      ],
    },
    {
      title: "Design Tools",
      icon: "🛠️",
      color: "from-orange-500/20 to-red-500/10 border-orange-500/30 text-orange-400",
      links: [
        { label: "Canva – Design Tool", url: "https://www.canva.com/" },
        { label: "Figma – Interface Design", url: "https://www.figma.com/" },
        { label: "Coolors – Color Palettes", url: "https://coolors.co/" },
        { label: "Unsplash – Stock Photos", url: "https://unsplash.com/" },
      ],
    },
    {
      title: "Computer Basics",
      icon: "💻",
      color: "from-slate-500/20 to-slate-600/10 border-slate-500/30 text-slate-400",
      links: [
        { label: "GCF Global – Basics", url: "https://edu.gcfglobal.org/en/computerbasics/" },
        { label: "Typing.com – Keyboard", url: "https://www.typing.com/" },
        { label: "HowToGeek – Tech Tips", url: "https://www.howtogeek.com/" },
      ],
    },
    {
      title: "Design Downloads",
      icon: "🎁",
      color: "from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400",
      links: [
        { label: "Freepik – Vectors & PSD", url: "https://www.freepik.com/" },
        { label: "Mockup World – Free PSD", url: "https://www.mockupworld.co/" },
        { label: "Flaticon – Icon Library", url: "https://www.flaticon.com/" },
        { label: "Google Fonts", url: "https://fonts.google.com/" },
      ],
    },
    {
      title: "Video Resources",
      icon: "🎬",
      color: "from-red-500/20 to-rose-500/10 border-red-500/30 text-red-400",
      links: [
        { label: "Mixkit – Video Clips", url: "https://mixkit.co/" },
        { label: "Opus Pro – AI Captions", url: "https://www.opus.pro/captions" },
        { label: "Jitter Video – Motion", url: "https://jitter.video/" },
        { label: "Coverr – Stock Video", url: "https://coverr.co/" },
      ],
    },
    {
      title: "Audio & Music",
      icon: "🎵",
      color: "from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400",
      links: [
        { label: "Adobe Podcast – Audio Fix", url: "https://podcast.adobe.com/en" },
        { label: "Uppbeat – Music", url: "https://uppbeat.io/" },
        { label: "ZapSplat – Free SFX", url: "https://www.zapsplat.com/" },
        { label: "NCS – No Copyright", url: "https://ncs.io/" },
      ],
    },
    {
      title: "Useful Links",
      icon: "🔗",
      color: "from-indigo-500/20 to-blue-500/10 border-indigo-500/30 text-indigo-400",
      links: [
        { label: "NSDA Certificate", url: "https://www.skillsportal.gov.bd/#/home/tci/tci-shared-list" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-200 py-16 px-4 sm:px-6 relative">
      
      {/* Background Subtle Ambiance */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-blue-600/[0.04] blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] rounded-full bg-indigo-600/[0.03] blur-[130px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        
        {/* Sleek Minimalist Header Area */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-3 bg-white/[0.02] border border-white/[0.06] px-3 py-1 rounded-full backdrop-blur-md">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 ring-4 ring-blue-500/10" />
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Toolkit Deck</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
            Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Resources</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto font-medium text-xs sm:text-sm leading-relaxed">
            A hand-picked collection of tools and platforms to accelerate your learning curve and optimize your creative workflow.
          </p>
        </div>

        {/* High-Contrast Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((category, i) => (
            <div
              key={i}
              className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-white/[0.05] hover:border-blue-500/30 hover:bg-slate-900/80 transition-all duration-300 shadow-xl shadow-black/20 flex flex-col group"
            >
              {/* Category Header Row */}
              <div className="flex items-center gap-3.5 mb-5">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br border flex items-center justify-center shadow-md shadow-black/10 group-hover:scale-105 transition-all duration-300 ${category.color}`}>
                  <span className="text-xl select-none">{category.icon}</span>
                </div>
                <h2 className="text-base font-bold text-slate-100 tracking-tight">
                  {category.title}
                </h2>
              </div>

              {/* Resource Links Block */}
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

        {/* Low-profile Footer Note */}
        <div className="mt-16 text-center py-6 border-t border-white/[0.06]">
          <p className="text-slate-500 text-xs font-semibold tracking-wide">
            💡 Pro Tip: Bookmark this dashboard page (<kbd className="bg-slate-900 px-1 py-0.5 rounded border border-white/10 text-[10px]">Ctrl</kbd> + <kbd className="bg-slate-900 px-1 py-0.5 rounded border border-white/10 text-[10px]">D</kbd>) for instant toolkit access.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Resources;