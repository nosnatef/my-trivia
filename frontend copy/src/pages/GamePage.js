import React, { useState, useEffect } from "react";
import TriviaContext from "../utils/TriviaContext";
import AnswerCard from "../components/AnswerCard";
import ContentCard from "../components/ContentCard";

const API_URL = "https://opentdb.com/api.php?amount=10";

const GamePage = () => {
  const [questions, setQuestions] = useState([]);
  const [qId, setqId] = useState(0);
  const [finished, setFinished] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);

  const updateScore = (x) => {
    setScore((s) => s + x);
  };

  const handleNext = () => {
    if (qId < 9) {
      setqId((prevId) => prevId + 1);
    } else {
      setFinished(true);
    }
    setRevealed(false);
  };

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const questionsResult = data.results.map((question) => {
          return {
            ...question,
            answers: [
              question.correct_answer,
              ...question.incorrect_answers,
            ].sort(() => Math.random() - 0.5),
          };
        });
        setQuestions(questionsResult);
      });
  }, []);

  let content = <div class="self-center"></div>;

  if (!started) {
    content = (
      <ContentCard
        content={
          <div>
            <button
              class="btn-blue"
            >
                Configure
            </button>
            <button
              class="btn-blue"
              onClick={() => setStarted(true)}
            >
              Start Trivia Game
            </button>
          </div>
        }
      ></ContentCard>
    );
  } else if (finished) {
    content = (
      <h1 class="text-2xl font-bold">Trivia done. Your score:{score}</h1>
    );
  } else if (questions.length < 1) {
    content = <h1 class="text-2xl font-bold">Loading....</h1>;
  } else {
    content = (
      <AnswerCard
        question={questions[qId]}
        handleNext={handleNext}
        updateScore={updateScore}
        revealed={revealed}
      >
        {" "}
      </AnswerCard>
    );
  }

  return (
    <TriviaContext.Provider
      value={{
        score,
        setScore,
        revealed,
        setRevealed,
      }}
    >
      {content}
      <div>Score: {score}</div>
    </TriviaContext.Provider>
  );
};

export default GamePage;
