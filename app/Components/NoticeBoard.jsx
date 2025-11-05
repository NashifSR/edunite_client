"use client";
import useNotice from "../Hooks/useNotice";

const NoticeBoard = () => {
  const { notice, isLoading, isError } = useNotice();

  if (isLoading || isError || !notice.length) return null; // hide if loading/error/empty

  // Get the latest notice
  const latest = notice[notice.length - 1];

  const formattedTime = new Date(latest.time).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="fixed top-24 right-4 w-72 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-900 p-4 rounded-lg shadow-md z-50">
      <h3 className="font-semibold mb-2 flex items-center gap-2">📢 Notice</h3>
      <p className="text-sm mb-1">{latest.message}</p>
      <p className="text-xs text-gray-600">
        — {latest.author} <br />
        <span className="text-gray-500">{formattedTime}</span>
      </p>
    </div>
  );
};

export default NoticeBoard;
