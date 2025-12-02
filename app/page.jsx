"use client";
import theme from "../theme";
import Carousel from "./Components/carousel";
import Link from "next/link";
import Resources from "./Components/Resources";
import NoticeBoard from "./Components/NoticeBoard";
import QrCodes from "./Components/QrCodes";

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-start px-4 sm:px-6 md:px-12 gap-12">
      {/* Full-screen Hero Section */}
      <NoticeBoard></NoticeBoard>
      <section className="flex flex-col items-center justify-center min-h-screen w-full text-center gap-4 sm:gap-6 px-2 sm:px-0">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-md leading-tight"
          style={{ color: theme.colors.headingText }}
        >
          Welcome to <br></br> <span className="text-red-500 lowercase ">LEARNDESK.NETLIFY.APP</span>
        </h1>
        <p className="max-w-xl text-sm sm:text-base md:text-lg lg:text-xl italic mx-auto">
          “Knowledge is the crown of the mind.” <br />
          Access your courses, take tests, and track your progress — all in a
          sacred golden space.
        </p>

        {/* MCQ & Written Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-6 w-full max-w-lg">
          <Link href="/mcqTests" className="w-full sm:w-auto">
            <button className="w-full sm:w-40 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg transition transform hover:scale-105">
              🧠 MCQ
            </button>
          </Link>
          <Link href="/writtenTests" className="w-full sm:w-auto">
            <button className="w-full sm:w-40 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-lg transition transform hover:scale-105">
              ✍️ Written
            </button>
          </Link>
          <Link href="/videos" className="w-full sm:w-auto">
            <button className="w-full sm:w-40 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl shadow-lg transition transform hover:scale-105">
              📺 Youtube Videos
            </button>
          </Link>
        </div>
      </section>
      {/* QR Codes Section */}
      <p className="text-5xl font-bold">Scan The QR Codes bellow</p>
      <section className="w-full px-2 sm:px-6">
        <QrCodes></QrCodes>
      </section>
      {/* Resources Section */}
      <section className="w-full px-2 sm:px-6">
        <Resources />
      </section>
      {/* Carousel Section */}
      <section className="w-full max-w-4xl px-2 sm:px-6 my-10">
        <Carousel />
      </section>
    </main>
  );
};

export default Home;
