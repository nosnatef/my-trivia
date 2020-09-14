import React, { useState } from "react";
import OptionBlock from "./OptionBlock";

const AnswerCard = ({ question, handleNext, updateScore, revealed }) => {
  const correctAnswer = question ? question.correct_answer : "";
  const question_text = question ? question.question : "";
  const answers = question ? question.answers : [];

  const [right, setRight] = useState(0);
  const [wrong, setWrong] = useState(0);

  const handleRightAnswer = () => {
    setRight((r) => r + 1);
  };

  const handleWrongAnswer = () => {
    setWrong((w) => w + 1);
  };

  return (
    <div class="container bg-white shadow-md p-6 w-full max-w-xl">
      <div>
        Right: {right} Wrong: {wrong}
      </div>
      <div class="p-8" dangerouslySetInnerHTML={{ __html: question_text }}>
        {}
      </div>
      <div class="flex flex-wrap justify-between">
        {answers.map((answer) => {
          return (
            <OptionBlock
              updateScore={updateScore}
              correct={answer === correctAnswer ? true : false}
              answer={answer}
              handleAnswer={
                answer === correctAnswer ? handleRightAnswer : handleWrongAnswer
              }
              handleNext={handleNext}
              revealed={revealed}
            />
          );
        })}
      </div>
      <button
        onClick={handleNext}
        class="bg-blue-500 text-gray-300 p-2 rounded-lg mt-4 ml-2 shadow font-semibold hover:bg-blue-700"
      >
        Next Question
      </button>
    </div>
  );
};

export default AnswerCard;
