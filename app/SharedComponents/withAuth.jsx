"use client";

import React from "react";
import { useAuth } from "../Context/AuthContext";

export function withAuth(Component) {
  return function ProtectedComponent(props) {
    const { user, loading, loginWithGoogle } = useAuth();

    // 1. Sleek Terminal Loading State
    if (loading) {
      return (
        <div className="min-h-[75vh] flex flex-col items-center justify-center bg-[#090d16] text-slate-200">
          <div className="relative w-10 h-10 flex items-center justify-center mb-4">
            <div className="absolute inset-0 rounded-full border-2 border-emerald-500/10 border-t-emerald-400 animate-spin" />
            <div className="text-[10px]">🔒</div>
          </div>
          <div className="text-[10px] font-mono font-black text-slate-500 tracking-widest uppercase animate-pulse">
            Verifying Security Credentials...
          </div>
        </div>
      );
    }

    // 2. Premium Secured Access Gate
    if (!user) {
      return (
        <div className="min-h-[80vh] bg-[#090d16] flex items-center justify-center px-4 relative overflow-hidden select-none">
          {/* Neon Background Glow Matrices */}
          <div className="absolute top-[25%] left-[20%] w-72 h-72 rounded-full bg-cyan-500/[0.03] blur-[100px] pointer-events-none" />
          <div className="absolute bottom-[25%] right-[20%] w-72 h-72 rounded-full bg-rose-500/[0.03] blur-[100px] pointer-events-none" />

          {/* Core Interface Card Container */}
          <div className="w-full max-w-lg bg-black/40 backdrop-blur-2xl border border-white/[0.05] rounded-3xl p-8 md:p-12 relative shadow-2xl shadow-black/80 text-center group">
            
            {/* Corner Bracket Accents for Cyber Aesthetics */}
            <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-slate-700 rounded-tl group-hover:border-cyan-500/40 transition-colors" />
            <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-slate-700 rounded-tr group-hover:border-rose-500/40 transition-colors" />
            <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-slate-700 rounded-bl group-hover:border-cyan-500/40 transition-colors" />
            <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-slate-700 rounded-br group-hover:border-rose-500/40 transition-colors" />

            {/* Glowing Lock Graphic */}
            <div className="relative w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-gradient-to-b from-white/[0.02] to-white/[0.06] border border-white/10 rounded-2xl shadow-inner">
              <div className="absolute inset-0 bg-cyan-500/5 blur-md rounded-2xl group-hover:bg-cyan-500/10 transition-all" />
              <span className="text-2xl filter drop-shadow-[0_0_8px_rgba(34,211,238,0.4)] animate-pulse">🔒</span>
            </div>

            {/* Title Matrices */}
            <h2 className="text-lg md:text-xl font-black text-white uppercase tracking-widest mb-2 filter drop-shadow-sm">
              Access <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Secured</span>
            </h2>
            <p className="text-[9px] font-mono font-black text-slate-500 tracking-widest uppercase mb-4">
              Authorized Personnel Only
            </p>

            {/* Content Divider */}
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent mx-auto mb-6" />

            {/* Informational Message */}
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed font-medium">
              This learning module contains protected academic resources. Please authorize your profile session using your registered Student Google Account to unlock access.
            </p>

            {/* Flashy Authorize Execution Trigger Button */}
            <div className="mt-8 relative inline-flex group/btn">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-rose-500 rounded-xl opacity-20 blur-md group-hover/btn:opacity-40 transition-opacity" />
              <button
                type="button"
                onClick={loginWithGoogle}
                className="relative h-11 px-6 bg-white text-black hover:bg-slate-100 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 flex items-center gap-3 border border-white/20 shadow-xl"
              >
                <span>Authorize via Google</span>
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </button>
            </div>

            {/* Footer Verification Stamp */}
            <p className="mt-6 text-[9px] font-mono text-slate-600 tracking-wider">
              Secure OAuth Handshake Node: ACTIVE
            </p>
          </div>
        </div>
      );
    }

    // 3. Render authenticated component
    return <Component {...props} />;
  };
}