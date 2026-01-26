"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SectionToggle from "@/app/Components/SectionToggle";
import ButtonDesigns from "@/app/Components/ButtonDesigns";

const categories = [
  { name: "Graphic Design", slug: "graphic_design" },
  { name: "Computer Operation", slug: "computer_operation" },
  { name: "Digital Marketing", slug: "digital_marketing" },
  { name: "Web Development", slug: "web_development" },
];

const McqTests = () => {
  const router = useRouter();
  const [section, setSection] = useState("tests");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-black px-4 py-8 sm:px-8 flex flex-col items-center">

      {/* Header */}
      <div className="max-w-3xl text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
          MCQ Test Portal
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Select a category to start your MCQ tests or review questions
        </p>
      </div>

      {/* Toggle */}
      <div className="mb-8">
        <SectionToggle defaultSection="tests" onChange={setSection} />
      </div>

      {/* Categories */}
      <div className="w-full max-w-5xl">
        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 capitalize">
          {section}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.slug}
              className="group rounded-2xl border bg-white shadow-sm
                         hover:shadow-lg transition-all duration-300"
            >
              <button
                onClick={() =>
                  router.push(`/mcqTests/${cat.slug}/${section}`)
                }
                className="w-full h-full px-6 py-8 flex flex-col items-center justify-center gap-3
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              >
                <span className="text-lg font-semibold text-center group-hover:scale-105 transition-transform">
                  {cat.name}
                </span>

                <ButtonDesigns
                  label={section === "tests" ? "Start Test" : "View Questions"}
                  variant={section === "tests" ? "danger" : "soft"}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default McqTests;
