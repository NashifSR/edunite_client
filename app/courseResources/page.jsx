"use client";
import React from "react";

const CourseResources = () => {
  const categories = [
    {
      title: "💻 Computer Operation & Basics",
      links: [
        {
          label: "Word - NSDA L3",
          url: "https://drive.google.com/drive/folders/1L9Bo2UU-5fZ0FHvAieoCWdAJY15CG2FO?usp=drive_link",
        },
        {
          label: "Excel - NSDA L3",
          url: "https://drive.google.com/drive/folders/16nEBzvodsEQ9CgjkahdeRpd23EUJFKnP?usp=drive_link",
        },
        {
          label: "PowerPoint - NSDA L3",
          url: "https://drive.google.com/drive/folders/1bXfvxLf-5yQeWiM38bJSwi7B38X8Dl8S?usp=drive_link",
        },
        {
          label: "Legacy - BTEB L1 & L3",
          url: "https://drive.google.com/drive/folders/1TowMF08sVIEOEjn-l11cNQKscsuF17Uk?usp=drive_link",
        },
      ],
    },
    {
      title: "🎨 Graphic Design Resources",
      links: [
        {
          label: "PhotoShop Samples",
          url: "https://drive.google.com/drive/folders/1jEmwD4RMzRur0tCzd5odwU98VXsqjr5R",
        },
        {
          label: "Illustrator Samples",
          url: "https://drive.google.com/drive/folders/1PanwUyp_STuL-oJa1cKgOL6YrtwEjBSN?usp=sharing",
        },
        {
          label: "NSDA Assessment Sample",
          url: "https://drive.google.com/drive/folders/193hKjOSIx-wgoLqWWKPrvoUaxwa4WSQa?usp=drive_link",
        },
      ],
    },
    {
      title: "📈 Digital Marketing Resources",
      links: [
        { label: "Social Media", url: "" },
        { label: "Search Engine Optimization", url: "" },
        { label: "Keyword Research", url: "" },
        { label: "Market Research", url: "" },
      ],
    },
    {
      title: "💻 Web Development Resources",
      links: [
        { label: "HTML & CSS Practice", url: " " },
        { label: "Figma Desings", url: " " },
        { label: "JavaScript Resources", url: " " },
        { label: "Complete frontend Designs", url: " " },
      ],
    },
    {
      title: "Softwares",
      links: [
        {
          label: "Essential Softwares",
          url: "https://drive.google.com/drive/folders/1aOx3vP_jab-ZF7To7SlHO2ri3uoK1l4M?usp=sharing",
        },
        ,
      ],
    },
    {
      title: "Upload",
      links: [
        {
          label: "Emergency Upload",
          url: "https://drive.google.com/drive/folders/1gN_24S0CKNHluu5wnq4aHFdPhF2vzNlJ?usp=sharing",
        },
        ,
      ],
    },
  ];

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50 text-black">
      <h1 className="text-3xl font-bold text-center mb-12">
        📚 Course Resources
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {categories.map((category, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:scale-105"
          >
            <h2 className="text-xl font-semibold mb-4">
              0{i + 1}: {category.title}
            </h2>
            <ul className="space-y-3">
              {category.links.map((link, j) => (
                <li key={j}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline transition"
                  >
                    {j + 1}: {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseResources;
