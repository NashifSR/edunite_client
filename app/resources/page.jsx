"use client";
import React from "react";

const resources = () => {
  const categories = [
    {
      title: "🧠 Typing & Practice",
      links: [
        {
          label: "Keybr – Smart Typing Practice",
          url: "https://www.keybr.com/",
        },
        {
          label: "TypingClub – Learn Touch Typing",
          url: "https://www.typingclub.com/",
        },
        {
          label: "10FastFingers – Speed Tests",
          url: "https://10fastfingers.com/",
        },
        { label: "Monkeytype – Custom Typing", url: "https://monkeytype.com/" },
      ],
    },
    {
      title: "📄 Google Tools & Forms",
      links: [
        {
          label: "Google Forms – Create Surveys",
          url: "https://forms.google.com/",
        },
        {
          label: "Google Docs – Online Documents",
          url: "https://docs.google.com/",
        },
        {
          label: "Google Drive – Store & Share Files",
          url: "https://drive.google.com/",
        },
        {
          label: "Google Slides – Presentations",
          url: "https://slides.google.com/",
        },
      ],
    },
    {
      title: "🎨 Graphic Design Inspiration",
      links: [
        {
          label: "Behance – Creative Portfolios",
          url: "https://www.behance.net/",
        },
        {
          label: "Pinterest – Design Ideas",
          url: "https://www.pinterest.com/",
        },
        { label: "Dribbble – UI/UX Showcase", url: "https://dribbble.com/" },
        {
          label: "Awwwards – Website Design",
          url: "https://www.awwwards.com/",
        },
      ],
    },
    {
      title: "🛠️ Design Tools & Resources",
      links: [
        { label: "Canva – Easy Design Tool", url: "https://www.canva.com/" },
        { label: "Figma – Interface Design", url: "https://www.figma.com/" },
        { label: "Coolors – Color Palettes", url: "https://coolors.co/" },
        { label: "Unsplash – Free Stock Photos", url: "https://unsplash.com/" },
        {
          label: "Pexels – Royalty-Free Photos",
          url: "https://www.pexels.com/",
        },
      ],
    },
    {
      title: "💻 Computer Operation & Basics",
      links: [
        {
          label: "GCF Global – Computer Basics",
          url: "https://edu.gcfglobal.org/en/computerbasics/",
        },
        {
          label: "Typing.com – Keyboard Practice",
          url: "https://www.typing.com/",
        },
        { label: "HowToGeek – Tech Tips", url: "https://www.howtogeek.com/" },
        {
          label: "Digital Learn – Internet Basics",
          url: "https://www.digitallearn.org/",
        },
      ],
    },
    {
      title: "🎁 Free Graphic Design Downloads",
      links: [
        {
          label: "Freepik – Vectors, PSD, Icons",
          url: "https://www.freepik.com/",
        },
        {
          label: "Pixeden – Mockups & UI Kits",
          url: "https://www.pixeden.com/",
        },
        {
          label: "Mockup World – Free PSD Mockups",
          url: "https://www.mockupworld.co/",
        },
        {
          label: "GraphicBurger – UI & Mockup Kits",
          url: "https://graphicburger.com/",
        },
        {
          label: "PixelBuddha – Design Resources",
          url: "https://pixelbuddha.net/freebies",
        },
        {
          label: "Iconscout – Free Icons & Assets",
          url: "https://iconscout.com/free-icons",
        },
        {
          label: "Flaticon – Free Icon Library",
          url: "https://www.flaticon.com/",
        },
        {
          label: "Font Squirrel – Free Fonts",
          url: "https://www.fontsquirrel.com/",
        },
        {
          label: "Google Fonts – Open Source Fonts",
          url: "https://fonts.google.com/",
        },
      ],
    },
    {
      title: "🎬 Free Video Editing Resources",
      links: [
        {
          label: "Mixkit – Free Music, SFX & Video Clips",
          url: "https://mixkit.co/",
        },
        {
          label: "Pexels Videos – Free Stock Footage",
          url: "https://www.pexels.com/videos/",
        },
        {
          label: "Pixabay Videos – Royalty-Free Footage",
          url: "https://pixabay.com/videos/",
        },
        {
          label: "Coverr – Free Cinematic Stock Videos",
          url: "https://coverr.co/",
        },
        {
          label: "Motion Array – Free Templates & Presets",
          url: "https://motionarray.com/browse/free/",
        },
        {
          label: "Mixkit Sound Effects – Free SFX",
          url: "https://mixkit.co/free-sound-effects/",
        },
        {
          label: "YouTube Audio Library – Free Music & SFX",
          url: "https://www.youtube.com/audiolibrary",
        },
        {
          label: "Adobe Stock (Free Collection)",
          url: "https://stock.adobe.com/free",
        },
        {
          label: "DaVinci Resolve Free Training Assets",
          url: "https://www.blackmagicdesign.com/products/davinciresolve/training",
        },
        {
          label: "Jitter Video - Create Faster",
          url: "https://jitter.video/",
        },
        {
          label: "Jitter Video - Create Faster",
          url: "https://jitter.video/",
        },
      ],
    },
    {
      title: "🎵 Free Music & Sound Effects",
      links: [
        {
          label: "YouTube Audio Library – Free Music & SFX",
          url: "https://www.youtube.com/audiolibrary",
        },
        {
          label: "Adobe Podcast - Fixup your Audio",
          url: "https://podcast.adobe.com/en",
        },
        {
          label: "Mixkit Music – Royalty-Free Tracks",
          url: "https://mixkit.co/free-stock-music/",
        },
        {
          label: "Mixkit Sound Effects – Free SFX",
          url: "https://mixkit.co/free-sound-effects/",
        },
        {
          label: "Pixabay Music – Free Background Music",
          url: "https://pixabay.com/music/",
        },
        {
          label: "Freesound – Community Sound Effects",
          url: "https://freesound.org/",
        },
        {
          label: "ZapSplat – Free Sound Effects Library",
          url: "https://www.zapsplat.com/",
        },
        {
          label: "Uppbeat – Free Music for Creators",
          url: "https://uppbeat.io/",
        },
        {
          label: "Bensound – Royalty-Free Music",
          url: "https://www.bensound.com/",
        },
        {
          label: "SoundBible – Free Sound Effects",
          url: "http://soundbible.com/",
        },
        {
          label: "NCS – Free Collection",
          url: "https://ncs.io/",
        },
        {
          label: "UPPbeat – Iconic Musics",
          url: "https://uppbeat.io/",
        },
        {
          label: "Audio Library - No Copyright Music",
          url: "https://www.audiolibrary.com.co/",
        },
      ],
    },
    {
      title: "🎁 Usefull Links",
      links: [
        {
          label: "NSDA Certificate",
          url: "https://www.skillsportal.gov.bd/#/home/tci/tci-shared-list",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen px-6 py-10 bg-white text-black">
      <h1 className="text-3xl font-bold text-center mb-10">
        📚 Useful Resources
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {categories.map((category, i) => (
          <div
            key={i}
            className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-4">
              {i + 1}: {category.title}
            </h2>
            <ul className="space-y-2">
              {category.links.map((link, j) => (
                <li key={j}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {j + 1}: {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default resources;
