import Carousel from "./Components/carousel";
import Link from "next/link";
import Resources from "./Components/Resources";
import NoticeBoard from "./Components/NoticeBoard";
import QrCodes from "./Components/QrCodes";

const Home = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#090d16] text-slate-200 selection:bg-blue-500 selection:text-white antialiased font-sans">
      
      {/* Precision Micro Glass Radial Glows */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-25%] left-[-15%] w-[700px] h-[700px] rounded-full bg-blue-600/[0.07] blur-[160px]" />
        <div className="absolute bottom-[15%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/[0.06] blur-[140px]" />
      </div>

      {/* Low-Profile Sticky Banner Panel */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-[#090d16]/75 border-b border-white/[0.04] shadow-xl shadow-black/20">
        <NoticeBoard />
      </div>

      <div className="flex flex-col items-center px-4 sm:px-6 md:px-8 gap-12 py-10">

        {/* COMPACT INTENSE HERO */}
        <section className="w-full max-w-5xl">
          <div className="flex flex-col items-center justify-center text-center gap-6 py-6">
            
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1] text-white">
                Learn Smarter
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 uppercase tracking-widest text-2xl sm:text-3xl md:text-4xl font-black block mt-2">
                  learndesk
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed font-medium">
                Access courses, tests, and video lessons in one place.
                <span className="block text-slate-500 font-normal mt-0.5">
                  Track progress, practice MCQs, and improve faster.
                </span>
              </p>
            </div>

            {/* Premium Flat-Action Switcher Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl mt-2">
              <ActionButton href="/mcqTests" accentColor="hover:border-blue-500/30 group-hover:bg-blue-500/10" dotColor="bg-blue-400" icon="🧠" label="MCQ" />
              <ActionButton href="/writtenTests" accentColor="hover:border-emerald-500/30 group-hover:bg-emerald-500/10" dotColor="bg-emerald-400" icon="✍️" label="Written" />
              <ActionButton href="/videos" accentColor="hover:border-orange-500/30 group-hover:bg-orange-500/10" dotColor="bg-orange-400" icon="📺" label="Videos" />
            </div>

          </div>
        </section>

        {/* QUICK ACCESS (No double borders — flat alignment) */}
        <section className="w-full max-w-5xl">
          <SectionHeader title="Quick Access" />
          <QrCodes />
        </section>

        {/* LEARNING MATERIALS */}
        <section className="w-full max-w-5xl">
          <SectionHeader title="Learning Materials" />
          <Resources />
        </section>

        {/* CAROUSEL GALLERY */}
        <section className="w-full max-w-5xl mb-4">
          <SectionHeader title="Updates & Gallery" />
          <div className="bg-white/[0.02] backdrop-blur-md p-4 rounded-2xl border border-white/[0.05] shadow-2xl shadow-black/30">
            <Carousel />
          </div>
        </section>

      </div>
    </main>
  );
};

// ================= LAYOUT SUBCOMPONENTS =================

const ActionButton = ({ href, accentColor, dotColor, icon, label }) => (
  <Link href={href} className="w-full block group">
    <button className={`w-full bg-slate-900/60 border border-white/[0.06] backdrop-blur-md py-3 px-5 rounded-xl flex items-center justify-between transition-all duration-300 group-hover:bg-slate-900/90 active:scale-[0.98] shadow-lg shadow-black/10 ${accentColor}`}>
      <div className="flex items-center gap-3">
        <span className="text-base select-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">{icon}</span>
        <span className="tracking-wide text-xs font-bold text-slate-100 group-hover:text-white transition-colors">{label}</span>
      </div>
      <div className={`w-1.5 h-1.5 rounded-full ${dotColor} opacity-40 group-hover:opacity-100 transition-opacity duration-300 ring-4 ring-transparent group-hover:ring-current/10`} />
    </button>
  </Link>
);

const SectionHeader = ({ title }) => (
  <div className="flex items-center gap-3 mb-5 px-1">
    <div className="h-1.5 w-1.5 rounded-full bg-blue-500 ring-4 ring-blue-500/10" />
    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
      {title}
    </h2>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-white/[0.08] via-white/[0.02] to-transparent" />
  </div>
);

export default Home;