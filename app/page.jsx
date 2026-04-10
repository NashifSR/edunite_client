import theme from "../theme";
import Carousel from "./Components/carousel";
import Link from "next/link";
import Resources from "./Components/Resources";
import NoticeBoard from "./Components/NoticeBoard";
import QrCodes from "./Components/QrCodes";

const Home = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-slate-200 selection:bg-blue-500 selection:text-white">
      {/* Dynamic Background Blobs */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-red-400/10 blur-[120px] animate-pulse" />
      </div>

      <NoticeBoard />

      <div className="flex flex-col items-center justify-start px-4 sm:px-6 md:px-12 gap-24 py-12">

        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center w-full overflow-hidden">
          {/* 1. Use py-24 instead of high vh to ensure consistency.
      2. min-h-[70vh] gives that "Hero" feel without being excessive.
  */}
          <div className="flex flex-col items-center justify-center min-h-[70vh] max-h-[800px] w-full max-w-7xl mx-auto px-4 text-center gap-12 py-20">

            <div className="space-y-6 z-10">
              <h1
                className="w-full text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1]"
                style={{ color: theme.colors.headingText }}
              >
                Welcome to <br></br>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600 uppercase tracking-widest">
                  learndesk
                </span>
              </h1>

              <p className="max-w-2xl text-lg md:text-xl text-slate-600 font-medium mx-auto leading-relaxed">
                “Knowledge is the crown of the mind.” <br />
                <span className="text-slate-500 font-normal not-italic block mt-2">
                  Access your courses, take tests, and track your progress in a modern, streamlined workspace.
                </span>
              </p>
            </div>

            {/* Action Buttons - slightly more margin-top */}
            <div className="flex flex-wrap justify-center gap-4 w-full z-10">
              <ActionButton href="/mcqTests" color="bg-blue-600" icon="🧠" label="MCQ Tests" />
              <ActionButton href="/writtenTests" color="bg-emerald-600" icon="✍️" label="Written" />
              <ActionButton href="/videos" color="bg-orange-500" icon="📺" label="Video Lessons" />
            </div>

            {/* Only show scroll indicator if the screen is actually tall enough */}
            <div className="hidden md:block absolute bottom-8 animate-bounce text-slate-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </section>

        {/* QR Codes Section */}
        <section className="w-full max-w-6xl group">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Quick Access</h2>
            <div className="h-1 flex-grow bg-slate-300 rounded-full" />
          </div>
          <div className="bg-white/50 backdrop-blur-md p-8 rounded-[2rem] shadow-xl border border-white/50">
            <QrCodes />
          </div>
        </section>

        {/* Resources Section */}
        <section className="w-full max-w-6xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-1 flex-grow bg-slate-300 rounded-full" />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-right">Learning Materials</h2>
          </div>
          <Resources />
        </section>

        {/* Carousel Section */}
        <section className="w-full">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-700 uppercase tracking-widest">Gallery & Updates</h2>
          </div>
          <Carousel />
        </section>
      </div>
    </main>
  );
};

// Helper Component for Buttons to keep code clean
const ActionButton = ({ href, color, icon, label }) => (
  <Link href={href} className="group w-full sm:w-auto">
    <button className={`${color} hover:brightness-110 text-white px-8 py-4 rounded-2xl shadow-lg shadow-blue-900/10 transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-2xl flex items-center justify-center gap-3 w-full font-bold text-lg`}>
      <span>{icon}</span>
      {label}
    </button>
  </Link>
);

export default Home;