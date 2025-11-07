"use client";
import React, { useState } from "react";
import useNotice from "../Hooks/useNotice";

const NoticeBoard = () => {
  const { notice, isLoading, isError } = useNotice();
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading || isError || !notice.length) return null;

  const latest = notice[notice.length - 1];
  const formattedTime = new Date(latest.time).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div
      className={`
        fixed top-24 right-0 z-50 transition-all duration-300 ease-in-out 
        bg-yellow-50 border-l-4 border-yellow-500 text-yellow-900 
        shadow-md rounded-l-lg cursor-pointer overflow-hidden
        ${isOpen ? "translate-x-0 w-72 p-4" : "translate-x-[calc(100%-28px)] w-72 p-2"}
      `}
      onClick={() => setIsOpen(!isOpen)}
    >
      <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm md:text-base">
        📢 Notice
      </h3>

      {isOpen && (
        <>
          <p className="text-sm mb-1">{latest.message}</p>
          <p className="text-xs text-gray-600">
            — {latest.author} <br />
            <span className="text-gray-500">{formattedTime}</span>
          </p>
        </>
      )}
    </div>
  );
};

export default NoticeBoard;
