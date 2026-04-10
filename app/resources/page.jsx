"use client";
import React, { useState } from "react";

const Resources = () => {
  const categories = [
    {
      title: "Typing & Practice",
      icon: "🧠",
      color: "from-blue-500 to-indigo-600",
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
      color: "from-emerald-500 to-teal-600",
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
      color: "from-purple-500 to-pink-600",
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
      color: "from-orange-500 to-red-600",
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
      color: "from-slate-700 to-slate-900",
      links: [
        { label: "GCF Global – Basics", url: "https://edu.gcfglobal.org/en/computerbasics/" },
        { label: "Typing.com – Keyboard", url: "https://www.typing.com/" },
        { label: "HowToGeek – Tech Tips", url: "https://www.howtogeek.com/" },
      ],
    },
    {
      title: "Design Downloads",
      icon: "🎁",
      color: "from-blue-400 to-cyan-600",
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
      color: "from-red-500 to-rose-700",
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
      color: "from-yellow-500 to-orange-600",
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
      color: "from-indigo-500 to-blue-700",
      links: [
        { label: "NSDA Certificate", url: "https://www.skillsportal.gov.bd/#/home/tci/tci-shared-list" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-200 py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Area */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight mb-4">
            Curated <span className="text-blue-600 italic">Resources</span>
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto font-medium">
            A hand-picked collection of tools and platforms to accelerate your learning and creative workflow.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 border border-white shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${category.color} text-white shadow-lg transform group-hover:rotate-12 transition-transform`}>
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <h2 className="text-xl font-bold text-slate-800">
                  {category.title}
                </h2>
              </div>

              <div className="space-y-3">
                {category.links.map((link, j) => (
                  <a
                    key={j}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-100/50 hover:bg-blue-600 group/item transition-all duration-200"
                  >
                    <span className="text-slate-600 group-hover/item:text-white font-semibold text-sm">
                      {link.label}
                    </span>
                    <svg
                      className="w-4 h-4 text-slate-400 group-hover/item:text-white transition-transform group-hover/item:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-20 text-center py-10 border-t border-slate-300">
          <p className="text-slate-400 text-sm font-medium italic">
            💡 Pro Tip: Bookmark this page (Ctrl+D) for quick access to your toolkit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Resources;