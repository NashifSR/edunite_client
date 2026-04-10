'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import useUser from '../Hooks/useUser';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/videos', label: 'Videos' },
  { href: '/mcqTests', label: 'MCQ' },
  { href: '/writtenTests', label: 'Written' },
  { href: '/courseResources', label: 'Course Resources' },
  { href: '/resources', label: 'Resources' },
  { href: '/dashboard', label: 'Dashboard' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, loading } = useUser();
  const pathname = usePathname();

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-[100] transition-all duration-300 ${
      scrolled 
        ? "bg-white/80 backdrop-blur-lg shadow-sm border-b border-slate-100 py-2" 
        : "bg-white border-b border-transparent py-4"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Brand - Modern & Bold */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
            <span className="text-white font-black text-xl leading-none">L</span>
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900 select-none uppercase">
            Learn<span className="text-blue-600">Desk</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-xl text-[13px] font-black transition-all duration-200 uppercase tracking-wide select-none ${
                  isActive 
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Toggle - Minimalist */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={`h-0.5 w-6 bg-slate-900 transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`h-0.5 w-6 bg-slate-900 transition-all ${isOpen ? "opacity-0" : ""}`} />
          <div className={`h-0.5 w-3 bg-slate-900 ml-auto transition-all ${isOpen ? "-rotate-45 w-6 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu - Full Screen Slide */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 transition-all duration-300 overflow-hidden ${
        isOpen ? "max-h-screen opacity-100 py-6" : "max-h-0 opacity-0"
      }`}>
        <div className="flex flex-col gap-2 px-6">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${
                pathname === item.href 
                  ? "bg-slate-900 text-white shadow-xl" 
                  : "bg-slate-50 text-slate-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;