"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SectionToggle from "@/app/Components/SectionToggle";
import ButtonDesigns from "@/app/Components/ButtonDesigns";

const categories = [
  {
    name: "Graphic Design",
    slug: "graphic_design",
    icon: "🎨",
    color: "from-purple-500 to-indigo-600",
    description: "Photoshop, Illustrator & Theory"
  },
  {
    name: "Computer Operation",
    slug: "computer_operation",
    icon: "💻",
    color: "from-blue-500 to-cyan-600",
    description: "Office, Windows & Hardware"
  },
  {
    name: "Digital Marketing",
    slug: "digital_marketing",
    icon: "📈",
    color: "from-orange-500 to-red-600",
    description: "SEO, SMM & Content Strategy"
  },
  {
    name: "Web Development",
    slug: "web_development",
    icon: "🌐",
    color: "from-emerald-500 to-teal-600",
    description: "HTML, CSS & Programming"
  },
];

const McqTests = () => {
  const router = useRouter();
  const [section, setSection] = useState("tests");
  const [mounted, setMounted] = useState(false);

  // Fix hydration issues by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight mb-4">
            Assessment <span className="text-blue-600 italic">Center</span>
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto font-medium">
            Test your knowledge or review previous questions to sharpen your skills in your chosen field.
          </p>
        </div>

        {/* Custom Styled Toggle Area */}
        <div className="flex justify-center mb-16">
          <div className="relative inline-flex bg-slate-100/50 p-1.5 rounded-2xl backdrop-blur-sm">
            <SectionToggle
              defaultSection="tests"
              onChange={setSection}
              className="flex gap-1"
            />
          </div>
        </div>

        {/* Section Title */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-slate-200"></div>
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
            Select {section === "tests" ? "a Test" : "a Question Bank"}
          </h2>
          <div className="h-px flex-1 bg-slate-200"></div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.slug}
              className="group relative bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden hover:border-blue-400 transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-1"
            >
              <button
                onClick={() => router.push(`/mcqTests/${cat.slug}/${section}`)}
                className="w-full text-left p-8 sm:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-8"
              >
                {/* Icon Circle */}
                <div className={`shrink-0 w-20 h-20 rounded-3xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-3xl shadow-lg transform group-hover:rotate-6 transition-transform`}>
                  {cat.icon}
                </div>

                {/* Content */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="mb-1">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md bg-slate-100 text-slate-500`}>
                      {cat.slug.replace('_', ' ')}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mb-2 leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-slate-500 text-sm font-medium mb-6">
                    {cat.description}
                  </p>

                  <div className="flex items-center justify-center sm:justify-start">
                    <ButtonDesigns
                      label={section === "tests" ? "Start Assessment" : "Explore Library"}
                      variant={section === "tests" ? "danger" : "soft"}
                    />
                  </div>
                </div>

                {/* Decorative Arrow */}
                <div className="hidden sm:flex self-center w-12 h-12 rounded-full border border-slate-100 items-center justify-center text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Stats / Motivation Footer */}
        <div className="mt-16 bg-slate-800 rounded-[3rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold">Ready to evaluate your progress?</h4>
            <p className="text-slate-400 text-sm">Every test is an opportunity to learn what you don't know yet.</p>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-2xl font-black text-blue-400">100%</p>
              <p className="text-[10px] uppercase font-bold text-slate-500">Free Access</p>
            </div>
            <div className="w-px h-10 bg-slate-700"></div>
            <div className="text-center">
              <p className="text-2xl font-black text-orange-400">400+</p>
              <p className="text-[10px] uppercase font-bold text-slate-500">Total Questions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default McqTests;