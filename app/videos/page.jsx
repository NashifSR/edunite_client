"use client";
import React, { useState } from "react";

const videos = () => {
  // Flattened video data
  const allVideos = [
    {
      title: "Excel Beginner Functions",
      name: "SUM – Adds a range of numbers.",
      url: "https://www.youtube.com/embed/-u-9f3QrdAQ?si=eoJ83yTKiHEbdhlR",
    },
    {
      title: "Excel Beginner Functions",
      name: "AVERAGE – Finds the mean of a range.",
      url: "https://www.youtube.com/embed/QpdLjWjlHYM?si=WEgp1zy2PihlJ--K",
    },
    {
      title: "Excel Beginner Functions",
      name: "MAX, MIN – Returns the highest and lowest values in a range.",
      url: "https://www.youtube.com/embed/E2xl9E0lLrU?si=XhggtLhUEFh-283M",
    },
    {
      title: "Excel Beginner Functions",
      name: "LEN – Counts the number of characters in a cell.",
      url: "https://www.youtube.com/embed/FooybTed-5M?si=IHLSi49WpX75VY1l",
    },
    {
      title: "Excel Beginner Functions",
      name: "TRIM – Removes extra spaces from text.",
      url: "https://www.youtube.com/embed/lx-V_pyfDU4?si=PpSpVWuI5P2jBt6N",
    },
    {
      title: "Excel Beginner Functions",
      name: "CONCATENATE / TEXTJOIN – Joins multiple text strings.",
      url: "https://www.youtube.com/embed/Aqib7yjiZw4?si=ldyvPB4atTs5SGBJ",
    },
    {
      title: "Excel Beginner Functions",
      name: "COUNT, COUNTA, COUNTIF – Count cells with conditions.",
      url: "https://www.youtube.com/embed/n12-7HAXBdQ?si=xlLN08iH0q-YzS6L",
    },
    {
      title: "Excel Intermediate Functions",
      name: "IF – Returns different results based on a condition.",
      url: "https://www.youtube.com/embed/hX5BA8tY5jg?si=LTvjvV9pVZOTC3K1",
    },
    {
      title: "Excel Intermediate Functions",
      name: "SUMIF – Adds values based on a single condition.",
      url: "https://www.youtube.com/embed/weFgBnZwWlk?si=pl1-RGoa9xPQ92xK",
    },
    {
      title: "Excel Intermediate Functions",
      name: "SUMIFS – Adds values based on multiple conditions.",
      url: "https://www.youtube.com/embed/5ccvb4TwpGc?si=kR77KZKuMZbi7BvY",
    },
    {
      title: "Excel Intermediate Functions",
      name: "AVERAGEA – Similar to AVERAGE but counts text as 0.",
      url: "https://www.youtube.com/embed/rWHjebVWX48?si=1ECcPq2v-btJRgKk",
    },
    {
      title: "Excel Intermediate Functions",
      name: "AND, OR, IF – Combine multiple logical tests.",
      url: "https://www.youtube.com/embed/mmPdatpcnTo?si=foFkbgBsGXEhQ2Dr",
    },
    {
      title: "Excel Advanced Functions",
      name: "RANK – Assigns rank to values within a dataset.",
      url: "https://www.youtube.com/embed/dNxc63gJMPA?si=N_CNDaRRSF4_f-ch",
    },
    {
      title: "Excel Advanced Functions",
      name: "VLOOKUP – Searches for a value in a table and returns a result.",
      url: "https://www.youtube.com/embed/rqnIF__i5XU?si=MvBaHq1k3wK7xJEK",
    },
    {
      title: "MS Word - Job 1",
      name: "Set 1",
      url: "https://www.youtube.com/embed/Kv7bMZNcDp0",
    },
    {
      title: "MS Word - Job 1",
      name: "Set 2",
      url: "https://www.youtube.com/embed/mlUdvGXfWew",
    },
    {
      title: "MS Word - Job 1",
      name: "Set 3",
      url: "https://www.youtube.com/embed/wyPT9rIgMzQ",
    },
    {
      title: "MS Word - Job 1",
      name: "Set 4",
      url: "https://www.youtube.com/embed/Xs91VQs-vRg",
    },
    {
      title: "MS Word - Job 1",
      name: "Set 5",
      url: "https://www.youtube.com/embed/MsX6qXvMi5k",
    },
    {
      title: "MS Word - Job 1",
      name: "Set 6",
      url: "https://www.youtube.com/embed/pi6Dk8TK6wc",
    },
    {
      title: "MS Excel - Job 2",
      name: "Set 1",
      url: "https://www.youtube.com/embed/29wHqMJh03A?si=3F10qb0eghy4dgWz",
    },
    {
      title: "MS Excel - Job 2",
      name: "Set 2",
      url: "https://www.youtube.com/embed/DY1lL7gFO0Y?si=lYpvaOU-W9YRsnBc",
    },
    {
      title: "MS Excel - Job 2",
      name: "Set 3",
      url: "https://www.youtube.com/embed/TjbHEtplo_I?si=laJ5Xn3EYBHdwidY",
    },
    {
      title: "MS Excel - Job 2",
      name: "Set 4",
      url: "https://www.youtube.com/embed/7O_oMh0mtXI?si=agqM7OR2ePGwGNxb",
    },
    {
      title: "MS Excel - Job 2",
      name: "Set 5",
      url: "https://www.youtube.com/embed/eNkRVYzuvNY",
    },
    {
      title: "MS Excel - Job 2",
      name: "Set 6",
      url: "https://www.youtube.com/embed/egCLzl0kC-w?si=-7NhJE32uKTaBSOD",
    },
    {
      title: "MS PowerPoint - Job 3",
      name: "Set 1",
      url: "https://www.youtube.com/embed/4YPq6F3gFB4",
    },
    {
      title: "MS PowerPoint - Job 3",
      name: "Set 2",
      url: "https://www.youtube.com/embed/tRmy2xEXFkM",
    },
    {
      title: "MS PowerPoint - Job 3",
      name: "Set 3",
      url: "https://www.youtube.com/embed/jUhc5cYGxts",
    },
    {
      title: "MS PowerPoint - Job 3",
      name: "Set 4",
      url: "https://www.youtube.com/embed/YEPf0anvEvY",
    },
    {
      title: "MS PowerPoint - Job 3",
      name: "Set 5",
      url: "https://www.youtube.com/embed/4o8m_yiBvS4",
    },
    {
      title: "Zoom Meeting - Job 4(B)",
      name: "Zoom Basics",
      url: "https://www.youtube.com/embed/mcjoZMmK4n0",
    },
    {
      title: "Google Form - Job 4(A)",
      name: "Google Forms Tutorial",
      url: "https://www.youtube.com/embed/lemx0LW7ABY",
    },
  ];

  const [visibleCategory, setVisibleCategory] = useState(null);

  // Get unique categories
  const categories = [...new Set(allVideos.map((v) => v.title))];

  const toggleCategoryVisibility = (categoryTitle) => {
    setVisibleCategory(
      visibleCategory === categoryTitle ? null : categoryTitle
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Video Library
      </h1>

      {/* Buttons for categories */}
      <div className="flex flex-wrap justify-center space-x-4 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => toggleCategoryVisibility(category)}
            className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4 hover:bg-blue-600 transition"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Display videos for selected category */}
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allVideos
            .filter((video) => video.title === visibleCategory)
            .map((video, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <iframe
                  className="w-full h-56 rounded-lg"
                  src={video.url}
                  title={video.name}
                  frameBorder="0"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
                <p className="text-center mt-2 font-semibold">{video.name}</p>
                <div className="text-center mt-4">
                  <a
                    href={video.url.replace("embed", "watch")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                  >
                    Watch on YouTube
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default videos;
