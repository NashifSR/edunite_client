"use client";

import React from "react";

const ButtonDesigns = ({
  label,
  variant = "default",
  onClick,
  disabled = false,
  className = "",
  type = "button",
}) => {
  const variants = {
    default: `
      bg-white/5
      border-white/10
      text-slate-200
      hover:bg-white/10
      hover:border-white/20
      hover:shadow-white/5
      focus:ring-white/20
    `,

    primary: `
      bg-blue-500/10
      border-blue-400/20
      text-blue-400
      hover:bg-blue-500/20
      hover:border-blue-400/40
      hover:shadow-blue-500/10
      focus:ring-blue-500/30
    `,

    success: `
      bg-emerald-500/10
      border-emerald-400/20
      text-emerald-400
      hover:bg-emerald-500/20
      hover:border-emerald-400/40
      hover:shadow-emerald-500/10
      focus:ring-emerald-500/30
    `,

    danger: `
      bg-red-500/10
      border-red-400/20
      text-red-400
      hover:bg-red-500/20
      hover:border-red-400/40
      hover:shadow-red-500/10
      focus:ring-red-500/30
    `,

    outline: `
      bg-transparent
      border-white/10
      text-slate-300
      hover:bg-white/5
      hover:border-white/20
      hover:shadow-white/5
      focus:ring-white/10
    `,

    soft: `
      bg-violet-500/10
      border-violet-400/20
      text-violet-400
      hover:bg-violet-500/20
      hover:border-violet-400/40
      hover:shadow-violet-500/10
      focus:ring-violet-500/30
    `,
  };

  const currentVariantClass = (variants[variant] || variants.default)
    .replace(/\s+/g, ' ')
    .trim();

  const baseClasses = `
    relative
    overflow-hidden
    inline-flex
    items-center
    justify-center
    px-5
    py-2.5
    rounded-xl
    backdrop-blur-md
    border
    text-sm
    font-semibold
    tracking-wide
    transition-all
    duration-200
    focus:outline-none
    focus:ring-2
    shadow-[0_4px_12px_rgba(0,0,0,0.3)]
  `.replace(/\s+/g, ' ').trim();

  const interactionClasses = !disabled
    ? `
        hover:-translate-y-0.5
        hover:shadow-lg
        active:scale-[0.98]
        cursor-pointer
      `.replace(/\s+/g, ' ').trim()
    : "opacity-40 cursor-not-allowed select-none";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${currentVariantClass} ${interactionClasses} ${className}`}
    >
      {/* Light Glare Reflection Line */}
      <span className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none" />

      {/* Internal Text Container - Completely Cleaned */}
      <span className="relative z-10 flex items-center gap-2">
        {label}
      </span>
    </button>
  );
};

export default ButtonDesigns;