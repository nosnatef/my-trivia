import React, { useContext } from "react";
import TriviaContext from "../utils/TriviaContext";

const OptionBlock = ({ correct, answer, handleAnswer, updateScore }) => {
  const { revealed, setRevealed, setScore } = useContext(TriviaContext);
  return revealed ? (
    <button
      class={
        (correct ? "text-green-700 " : "text-red-700 ") +
        "p-2 m-2 w-2/5 font-semibold bg-gray-300 hover:bg-gray-500"
      }
      dangerouslySetInnerHTML={{ __html: answer }}
    ></button>
  ) : (
    <button
      class={"p-2 m-2 w-2/5 font-semibold bg-gray-300 hover:bg-gray-500"}
      onClick={() => {
        handleAnswer();
        if (correct) {
          setScore((s) => s + 1);
        }
        setRevealed(true);
      }}
      dangerouslySetInnerHTML={{ __html: answer }}
    ></button>
  );
};

export default OptionBlock;
