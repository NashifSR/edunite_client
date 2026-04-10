'use client';
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          
          {/* Brand & Copyright */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center">
                <span className="text-white font-black text-xs">L</span>
              </div>
              <span className="text-lg font-black tracking-tighter text-slate-900 uppercase">
                Learn<span className="text-blue-600">Desk</span>
              </span>
            </Link>
            
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-loose">
              <p>© {currentYear} Student Portal. Built for excellence.</p>
              <p>
                Crafted by <span className="text-slate-900">Ahmed Nashif</span>
              </p>
            </div>
          </div>

          {/* Links Grid */}
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            {["privacy", "terms", "contact"].map((page) => (
              <Link
                key={page}
                href={`/${page}`}
                className="group flex flex-col"
              >
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover:text-blue-600 transition-colors">
                  {page}
                </span>
                <span className="h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

        </div>

        {/* Bottom Accent Line */}
        <div className="mt-12 h-1 w-full bg-gradient-to-r from-transparent via-slate-100 to-transparent" />
      </div>
    </footer>
  );
};

export default Footer;