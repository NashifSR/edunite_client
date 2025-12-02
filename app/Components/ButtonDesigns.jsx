"use client";

import React from "react";

// Reusable button component
const ButtonDesigns = ({ label, variant , onClick }) => {
  // ✅ Static button structure (always applied)
  const structure = ``;

  // ✅ Variant-specific colors / borders
  const variants = {
    default: "bg-gray-100 text-black hover:bg-gray-200",
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
    success: "bg-green-600 text-white hover:bg-green-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    soft: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  };

  // Combine structure + variant for the final button class
  const className = `${structure} ${variants[variant] || variants.default}`;

  return (
    <button className={`px-3 mx-auto py-3 w-[200px] rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default ButtonDesigns;
