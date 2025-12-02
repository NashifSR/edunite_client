import React from "react";
import ButtonDesigns from "./ButtonDesigns";
import Link from "next/link";

const QrCodes = () => {
  // Array of QR code image URLs
  const qrCodes = [
    {
      name: "RTO Form",
      linkUrl: "https://forms.gle/wugGSbh55kGgg5jW7",
      url: "https://i.ibb.co/60CvC8d0/akkuti.png",
    },
    {
      name: "RPL Form",
      linkUrl: "https://forms.gle/8XkNSGATDzdcGLav6",
      url: "https://i.ibb.co.com/1Yzcjf14/rplForm.png",
    },
    // {
    //   name: "LearnDesk",
    //   linkUrl: "https://learndesk.netlify.app/",
    //   url: "https://i.ibb.co.com/HD49H2Vj/learn-Desk.png",
    // },
    {
      name: "UCEP TVET",
      linkUrl: "https://uceptvet.netlify.app/",
      url: "https://i.ibb.co.com/4ggHP3B0/ucepTvet.png",
    },
  ];

  return (
    <div className="w-full p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {qrCodes.map((code, index) => (
        <div
          key={index}
          className="flex flex-col items-center p-4 rounded-2xl shadow-lg border border-gray-200 bg-white"
        >
          <img
            src={code.url}
            alt={code.name}
            className="w-50 h-50 object-contain mb-10"
          />
          {/* <p className="text-lg font-bold mt-5 text-gray-600">{code.name}</p> */}
          <Link target="blank" href={code.linkUrl}>
            <ButtonDesigns label={code.name} variant={"primary"}></ButtonDesigns>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default QrCodes;
