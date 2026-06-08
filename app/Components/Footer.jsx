'use client';
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#090d16]/95 backdrop-blur-xl border-t border-white/[0.04] pt-8 pb-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          
          {/* Brand & Credit Block */}
          <div className="space-y-2">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-7 h-7 bg-white/[0.06] border border-white/10 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xs">L</span>
              </div>
              <span className="text-base font-black tracking-tight text-white uppercase">
                Learn<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Desk</span>
              </span>
            </Link>
            
            <div className="text-[11px] font-medium text-slate-400 space-y-0.5">
              <p>© {currentYear} Student Portal. Built for excellence.</p>
              <p className="text-slate-500">
                Crafted by <span className="text-slate-300 font-bold hover:text-blue-400 transition-colors duration-200 cursor-pointer">Ahmed Nashif</span>
              </p>
            </div>
          </div>

          {/* Quick Page Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {["privacy", "terms", "contact"].map((page) => (
              <Link
                key={page}
                href={`/${page}`}
                className="group relative py-1"
              >
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest group-hover:text-blue-400 transition-colors duration-200">
                  {page}
                </span>
                {/* Micro accent tracker line */}
                <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-blue-400 group-hover:w-full transition-all duration-200" />
              </Link>
            ))}
          </div>

        </div>

        {/* Low-profile Separator bar */}
        <div className="mt-6 h-[1px] w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>
    </footer>
  );
};

export default Footer;