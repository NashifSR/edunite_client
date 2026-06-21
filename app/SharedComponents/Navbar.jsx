'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../Context/AuthContext';

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
  const pathname = usePathname();
  
  // Destructured Firebase core tracking methods straight from AuthContext
  const { user, loading, loginWithGoogle, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`sticky top-0 z-[100] w-full transition-all duration-300 border-b ${
        scrolled 
          ? "bg-black/95 backdrop-blur-xl border-white/[0.08] shadow-2xl shadow-black py-2.5" 
          : "bg-black/60 backdrop-blur-md border-white/[0.04] py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="w-7 h-7 bg-white/[0.04] border border-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/[0.08] group-hover:border-white/20 transition-all duration-200">
            <span className="text-white font-black text-xs">L</span>
          </div>
          <span className="text-sm font-black tracking-widest text-white uppercase select-none">
            Learn<span className="text-slate-400">Desk</span>
          </span>
        </Link>

        {/* Desktop Navigation & Actions */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1 border-r border-white/[0.06] pr-3">
            {NAV_ITEMS.map(item => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-3 py-1.5 text-[10px] font-black uppercase tracking-widest select-none group/item"
                >
                  <span className={`transition-colors duration-200 ${
                    isActive ? "text-white" : "text-slate-400 group-hover/item:text-slate-200"
                  }`}>
                    {item.label}
                  </span>
                  
                  {/* Precise clean underline indicator */}
                  <span className={`absolute bottom-[-6px] left-3 right-3 h-[1.5px] rounded-full transition-all duration-200 ${
                    isActive ? "bg-white opacity-100" : "bg-white opacity-0 scale-x-50 group-hover/item:opacity-30 group-hover/item:scale-x-100"
                  }`} />
                </Link>
              );
            })}
          </div>

          {/* Core Auth Handler Actions */}
          <div className="flex items-center">
            {loading ? (
              <span className="text-[9px] font-bold tracking-widest text-slate-500 uppercase">Verifying...</span>
            ) : user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {user.photoURL && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      src={user.photoURL} 
                      alt="Avatar" 
                      className="w-6 h-6 rounded-full border border-white/20"
                    />
                  )}
                  <span className="text-[10px] font-black text-slate-200 tracking-wider truncate max-w-[100px]">
                    {user.displayName?.split(" ")[0]}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="px-2.5 py-1 text-[9px] font-black tracking-widest uppercase bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-md transition-all active:scale-95"
                >
                  Exit
                </button>
              </div>
            ) : (
              <button
                onClick={loginWithGoogle}
                className="px-3 py-1.5 text-[9px] font-black tracking-widest uppercase bg-white text-black hover:bg-slate-200 rounded-md transition-all shadow-md active:scale-95"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle Handler */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          <div className={`h-0.5 w-4.5 bg-white transition-all duration-200 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`h-0.5 w-4.5 bg-white transition-all duration-200 ${isOpen ? "opacity-0" : ""}`} />
          <div className={`h-0.5 w-4.5 bg-white transition-all duration-200 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-black/98 backdrop-blur-2xl border-b border-white/[0.08] transition-all duration-200 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[100vh] opacity-100 py-3.5 shadow-2xl shadow-black" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-1 px-4">
          {/* User Meta Card inside mobile menu wrapper */}
          {user && (
            <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.02] border border-white/[0.05] rounded-xl mb-2">
              {user.photoURL && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.photoURL} alt="Avatar" className="w-5 h-5 rounded-full" />
              )}
              <div className="text-[10px] font-bold text-slate-300 tracking-wide truncate">
                {user.displayName}
              </div>
            </div>
          )}

          {NAV_ITEMS.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-150 border ${
                  isActive 
                    ? "bg-white/[0.06] text-white border-white/10" 
                    : "bg-transparent text-slate-400 border-transparent hover:bg-white/[0.02] hover:text-slate-200"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Mobile Auth Button Action Layer */}
          {!loading && (
            <div className="pt-2 mt-1 border-t border-white/[0.05]">
              {user ? (
                <button
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="w-full text-center px-4 py-3 text-[10px] font-black uppercase tracking-widest text-red-400 bg-red-500/5 rounded-xl border border-red-500/10 hover:bg-red-500/10 transition-all"
                >
                  Logout Session
                </button>
              ) : (
                <button
                  onClick={() => { loginWithGoogle(); setIsOpen(false); }}
                  className="w-full text-center px-4 py-3 text-[10px] font-black uppercase tracking-widest bg-white text-black rounded-xl hover:bg-slate-200 transition-all font-mono"
                >
                  Sign In With Google
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;