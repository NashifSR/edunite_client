import React from "react";
import Carousel from "./Components/carousel";
import Resources from "./Components/Resources";
import NoticeBoard from "./Components/NoticeBoard";
import QrCodes from "./Components/QrCodes";
import LandingHero from "./Components/LandingHero";

// Imported Separated Layout Subcomponents
import ActionButton from "./Components/ActionButton";
import SectionHeader from "./Components/SectionHeader";

const Home = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#090d16] text-slate-200 selection:bg-blue-500 selection:text-white antialiased font-sans">
      
      {/* Precision Micro Glass Radial Glows */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-25%] left-[-15%] w-[700px] h-[700px] rounded-full bg-blue-600/[0.07] blur-[160px]" />
        <div className="absolute bottom-[15%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/[0.06] blur-[140px]"/>
      </div>

      {/* Low-Profile Sticky Banner Panel */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-[#090d16]/75 border-b border-white/[0.04] shadow-xl shadow-black/20">
        <NoticeBoard />
      </div>

      {/* Master Flex Container */}
      <div className="flex flex-col items-center px-4 sm:px-6 md:px-8 gap-12 py-10">

        {/* 1. NEW LANDING HERO SECTION */}
        <LandingHero />

        {/* 4. LEARNING MATERIALS */}
        <section className="w-full max-w-5xl">
          <SectionHeader title="Learning Materials" />
          <Resources />
        </section>

        {/* 5. CAROUSEL GALLERY */}
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

export default Home;