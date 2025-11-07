import Link from "next/link";
import React from "react";

const Resources = () => {
  return (
    <div className="m-auto h-50vh w-full max-w-6xl">
      <h2 className="text-3xl font-bold mb-6 text-center">
        📚 Explore Courses
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[
          { title: "Graphic Design",},
          { title: "Web Development",},
          { title: "Digital Marketing",},
          { title: "Computer Basics",},
        ].map((cat, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:scale-105 text-center cursor-pointer">
              <h3 className="text-xl font-semibold">{cat.title}</h3>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
