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
  const [section, setSection] = useState("answers"); // default, or could rely solely on toggle

  return (
    <div className="min-h-screen p-8 bg-white text-black flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold mb-4">Written Test Portal</h1>

      {/* Section Toggle with parent callback */}
      <SectionToggle defaultSection="answers" onChange={setSection} />

      {/* Categories Buttons */}
      <div className="w-full flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-6 capitalize">
          {section.charAt(0).toUpperCase() + section.slice(1)}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => router.push(`/writtenTests/${cat.slug}/${section}`)}
              className={`px-5 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                section === "answers"
                  ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WrittenTests;
