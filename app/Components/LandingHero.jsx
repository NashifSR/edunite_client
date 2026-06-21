import React from 'react'
import Link from 'next/link'

const LandingHero = () => {
  return (
    <section className="w-full max-w-5xl px-4 mx-auto pt-16 pb-12 relative overflow-hidden">
      
      {/* Isolated Glow matching your home page theme */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/[0.03] blur-[120px] pointer-events-none -z-10" />
      
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
        
        {/* Top Accent Capsule Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-cyan-400 uppercase shadow-lg shadow-blue-500/5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Self-Testing & Resource Platform
        </div>

        {/* Hero Headers */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.05]">
            Test Your Knowledge.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 font-black">
              Own Your Evaluation.
            </span>
          </h1>
          
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed font-medium">
            An interactive testing system built for students who want to build retention. 
            Build custom parameters, simulate time-bound MCQ sessions, and practice comprehensive written evaluation.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center max-w-md pt-2">
          <Link href="/mcqTests" className="w-full sm:w-auto flex-1">
            <button className="w-full sm:px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-xs font-black tracking-wider text-white shadow-lg shadow-blue-500/20 hover:opacity-90 transition-all duration-200 active:scale-[0.98]">
              START MCQ TEST
            </button>
          </Link>
          
          <Link href="/writtenTests" className="w-full sm:w-auto flex-1">
            <button className="w-full sm:px-8 py-3 rounded-xl bg-slate-900/80 border border-white/[0.08] text-xs font-black tracking-wider text-slate-300 hover:text-white hover:border-white/[0.15] transition-all duration-200 backdrop-blur-md active:scale-[0.98]">
              WRITTEN WORKSPACE
            </button>
          </Link>
        </div>

      </div>
    </section>
  )
}

export default LandingHero