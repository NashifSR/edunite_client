"use client";
import React from "react";

const CourseResources = () => {
  const categories = [
    {
      title: "Computer Operation",
      icon: "💻",
      links: [
        { label: "Word - NSDA L3", url: "https://drive.google.com/drive/folders/1L9Bo2UU-5fZ0FHvAieoCWdAJY15CG2FO?usp=drive_link" },
        { label: "Excel - NSDA L3", url: "https://drive.google.com/drive/folders/16nEBzvodsEQ9CgjkahdeRpd23EUJFKnP?usp=drive_link" },
        { label: "PowerPoint - NSDA L3", url: "https://drive.google.com/drive/folders/1bXfvxLf-5yQeWiM38bJSwi7B38X8Dl8S?usp=drive_link" },
        { label: "Legacy - BTEB L1 & L3", url: "https://drive.google.com/drive/folders/1TowMF08sVIEOEjn-l11cNQKscsuF17Uk?usp=drive_link" },
      ],
    },
    {
      title: "Graphic Design",
      icon: "🎨",
      links: [
        { label: "PhotoShop Samples", url: "https://drive.google.com/drive/folders/1jEmwD4RMzRur0tCzd5odwU98VXsqjr5R" },
        { label: "Illustrator Samples", url: "https://drive.google.com/drive/folders/1PanwUyp_STuL-oJa1cKgOL6YrtwEjBSN?usp=sharing" },
        { label: "NSDA Assessment Sample", url: "https://drive.google.com/drive/folders/193hKjOSIx-wgoLqWWKPrvoUaxwa4WSQa?usp=drive_link" },
      ],
    },
    {
      title: "Digital Marketing",
      icon: "📈",
      links: [
        { label: "Social Media", url: "#" },
        { label: "Search Engine Optimization", url: "#" },
        { label: "Keyword Research", url: "#" },
        { label: "Market Research", url: "#" },
      ],
    },
    {
      title: "Web Development",
      icon: "🌐",
      links: [
        { label: "HTML & CSS Practice", url: "#" },
        { label: "Figma Designs", url: "#" },
        { label: "JavaScript Resources", url: "#" },
        { label: "Complete Frontend Designs", url: "#" },
      ],
    },
    {
      title: "Software Suite",
      icon: "🛠️",
      links: [
        { label: "Essential Softwares", url: "https://drive.google.com/drive/folders/1aOx3vP_jab-ZF7To7SlHO2ri3uoK1l4M?usp=sharing" },
      ],
    },
    {
      title: "Storage",
      icon: "☁️",
      links: [
        { label: "Emergency Upload", url: "https://drive.google.com/drive/folders/1gN_24S0CKNHluu5wnq4aHFdPhF2vzNlJ?usp=sharing" },
      ],
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-8 bg-slate-200 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">
            📚 Course <span className="text-blue-600">Resources</span>
          </h1>
          <div className="h-1.5 w-24 bg-blue-500 mx-auto rounded-full"></div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, i) => (
            <div
              key={i}
              className="group bg-white/70 backdrop-blur-md border border-white/50 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl bg-white p-3 rounded-2xl shadow-inner group-hover:scale-110 transition-transform">
                  {category.icon}
                </span>
                <h2 className="text-xl font-bold text-slate-800 leading-tight">
                  {category.title}
                </h2>
              </div>

              <div className="flex flex-col gap-2">
                {category.links.map((link, j) => (
                  <a
                    key={j}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between group/link bg-white/50 hover:bg-blue-600 p-3 rounded-xl transition-colors duration-200"
                  >
                    <span className="text-slate-700 group-hover/link:text-white font-medium text-sm">
                      {link.label}
                    </span>
                    <svg 
                      className="w-4 h-4 text-slate-400 group-hover/link:text-white transition-transform group-hover/link:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseResources;