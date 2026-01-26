"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SectionToggle from "../Components/SectionToggle";

const categories = [
  { name: "Graphic Design", slug: "graphic_design" },
  { name: "Computer Operation", slug: "computer_operation" },
  { name: "Digital Marketing", slug: "digital_marketing" },
  { name: "Web Development", slug: "web_development" },
];

const WrittenTests = () => {
  const router = useRouter();
  const [section, setSection] = useState("answers");

  return (
    <div className="min-h-screen text-black px-4 py-8 sm:px-8 flex flex-col items-center">

      {/* Header */}
      <div className="max-w-3xl text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
          Written Test Portal
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Choose a category to view written questions or answers
        </p>
      </div>

      {/* Toggle */}
      <div className="w-full max-w-md mb-8">
        <SectionToggle defaultSection="answers" onChange={setSection} />
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
                  router.push(`/writtenTests/${cat.slug}/${section}`)
                }
                className="w-full h-full px-6 py-8 flex flex-col items-center justify-center gap-3
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              >
                <span className="text-lg font-semibold text-center group-hover:scale-105 transition-transform">
                  {cat.name}
                </span>

                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium
                    ${
                      section === "answers"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  {section === "answers" ? "View Answers" : "View Questions"}
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WrittenTests;
