import React, { useState, useEffect, useRef } from "react";
import QuestionCards from "./QuestionCards";
import ButtonDesigns from "@/app/Components/ButtonDesigns";

const McqQuestionList = ({ questions, selectedSet, onSubmit }) => {
  const [answers, setAnswers] = useState({});
  const [timerOption, setTimerOption] = useState(null); // in seconds per question
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const timerRef = useRef(null);

  // Update total timer whenever timerOption changes
  useEffect(() => {
    if (timerOption && timerOption > 0) {
      setTimeLeft(timerOption * questions.length);
    }
  }, [timerOption, questions.length]);

  // Countdown logic
  useEffect(() => {
    if (!quizStarted || !timerOption || timeLeft <= 0) return;

    timerRef.current = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);

    if (timeLeft === 1) {
      handleAutoSubmit();
    }

    return () => clearTimeout(timerRef.current);
  }, [timeLeft, quizStarted, timerOption]);

  const handleOptionChange = (id, option) =>
    setAnswers((prev) => ({ ...prev, [id]: option }));

  const handleSubmit = () => {
    if (onSubmit) {
      const submittedData = Object.entries(answers).map(
        ([id, selectedOption]) => ({
          id: Number(id),
          selectedOption,
        })
      );
      onSubmit({ selectedSet, answers: submittedData });
    }
    clearTimeout(timerRef.current);
  };

  const handleAutoSubmit = () => {
    clearTimeout(timerRef.current);
    handleSubmit();
  };

  if (!questions.length) return null;

  // Render Timer Selection if quiz hasn't started
  if (!quizStarted) {
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-lg font-medium">Select time per question:</p>
        <div className="flex gap-4 flex-wrap">
          {[10, 15, 20].map((sec) => (
            <ButtonDesigns
              key={sec}
              label={`${sec} sec`}
              variant={timerOption === sec ? "primary" : "soft"}
              onClick={() => setTimerOption(sec)}
            />
          ))}
        </div>
        {timerOption && (
          <ButtonDesigns
            label="Start Quiz"
            variant="success"
            onClick={() => setQuizStarted(true)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="mt-8 w-full max-w-2xl space-y-6">
      {selectedSet && (
        <h2 className="text-xl font-semibold mb-4">Set: {selectedSet}</h2>
      )}

      {/* Live Timer */}
      <div className="fixed top-20 right-0 shadow-md z-50 p-4 flex justify-end items-center bg-red-400 text-white rounded-3xl">
        <p className="font-semibold text-lg">
          Time left: {Math.floor(timeLeft / 60)}:
          {String(timeLeft % 60).padStart(2, "0")}
        </p>
      </div>

      {questions.map((q, index) => (
        <QuestionCards
          key={q.id}
          question={q}
          index={index}
          selectedOption={answers[q.id]}
          onSelect={handleOptionChange}
        />
      ))}

      <div className="fixed bottom-4 left-0 w-full flex justify-center gap-4 z-50 px-4">
        {/* Submit Button */}
        <ButtonDesigns
          label="Submit Quiz"
          variant="success"
          onClick={handleSubmit}
        />

        {/* Scroll to Top */}
        <ButtonDesigns
          label="↑ Top"
          variant="soft"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />

        {/* Scroll to Bottom */}
        <ButtonDesigns
          label="↓ Bottom"
          variant="soft"
          onClick={() =>
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            })
          }
        />
      </div>
    </div>
  );
};

export default McqQuestionList;
