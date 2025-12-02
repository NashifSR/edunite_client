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
  const [section, setSection] = useState("tests"); // default section

  return (
    <div className="min-h-screen p-6 md:p-8 bg-white text-black flex flex-col items-center gap-8">
      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        MCQ Test Portal
      </h1>

      {/* Section Toggle */}
      <SectionToggle defaultSection="tests" onChange={setSection} />

      {/* Category Buttons */}
      <div className="w-full flex flex-col items-center mt-6 gap-6">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 capitalize text-center">
          {section.charAt(0).toUpperCase() + section.slice(1)}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 w-full">
          {categories.map((cat) => (
            <ButtonDesigns
              key={cat.slug}
              label={cat.name}
              variant={section === "tests" ? "danger" : "soft"}
              onClick={() => router.push(`/mcqTests/${cat.slug}/${section}`)}
              className="w-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default McqTests;
