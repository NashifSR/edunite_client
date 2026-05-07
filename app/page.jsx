import theme from "../theme";
import Carousel from "./Components/carousel";
import Link from "next/link";
import Resources from "./Components/Resources";
import NoticeBoard from "./Components/NoticeBoard";
import QrCodes from "./Components/QrCodes";

const Home = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-slate-200 selection:bg-blue-500 selection:text-white">

      {/* Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[35%] h-[35%] rounded-full bg-blue-400/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[35%] h-[35%] rounded-full bg-red-400/10 blur-[120px]" />
      </div>

      <NoticeBoard />

      <div className="flex flex-col items-center px-4 md:px-10 gap-14 py-10">

        {/* HERO (Compact) */}
        <section className="w-full max-w-6xl">

          <div className="flex flex-col items-center justify-center min-h-[55vh] text-center gap-8">

            <div className="space-y-3">

              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight"
                style={{ color: theme.colors.headingText }}
              >
                Learn Smarter <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600 uppercase tracking-wider">
                  learndesk
                </span>
              </h1>

              <p className="text-sm md:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
                Access courses, tests, and video lessons in one place.
                <span className="block text-slate-500 mt-1">
                  Track progress, practice MCQs, and improve faster.
                </span>
              </p>
            </div>

            {/* Actions (compact grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl">

              <ActionButton href="/mcqTests" color="bg-blue-600" icon="🧠" label="MCQ" />
              <ActionButton href="/writtenTests" color="bg-emerald-600" icon="✍️" label="Written" />
              <ActionButton href="/videos" color="bg-orange-500" icon="📺" label="Videos" />

            </div>
          </div>
        </section>

        {/* QR SECTION (tight layout) */}
        <section className="w-full max-w-6xl">
          <SectionHeader title="Quick Access" />
          <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border">
            <QrCodes />
          </div>
        </section>

        {/* RESOURCES */}
        <section className="w-full max-w-6xl">
          <SectionHeader title="Learning Materials" align="right" />
          <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border">
            <Resources />
          </div>
        </section>

        {/* CAROUSEL */}
        <section className="w-full max-w-6xl">
          <div className="text-center mb-6">
            <h2 className="text-lg md:text-xl font-semibold text-slate-700 tracking-wide">
              Updates & Gallery
            </h2>
          </div>
          <Carousel />
        </section>

      </div>
    </main>
  );
};

// ================= HELPERS =================

const ActionButton = ({ href, color, icon, label }) => (
  <Link href={href}>
    <button className={`${color} w-full text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:brightness-110 transition`}>
      <span>{icon}</span>
      {label}
    </button>
  </Link>
);

const SectionHeader = ({ title, align = "left" }) => (
  <div className={`flex items-center gap-3 mb-4 ${align === "right" ? "flex-row-reverse" : ""}`}>
    <div className="h-px flex-1 bg-slate-300" />
    <h2 className="text-lg font-bold text-slate-800 whitespace-nowrap">
      {title}
    </h2>
  </div>
);

export default Home;