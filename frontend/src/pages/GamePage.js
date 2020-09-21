import React, { useState, useEffect, useContext } from "react";
import TriviaContext from "../utils/TriviaContext";
import UserContext from "../utils/UserContext";
import AnswerCard from "../components/AnswerCard";
import ContentCard from "../components/ContentCard";
import TriviaConfig from "../components/Modal/TriviaConfig";
import BackDrop from "../components/Modal/BackDrop";
import getUser from "../query/getUser";

import addGamesPlayed from "../query/addGamesPlayed";

const GamePage = () => {
  const [questions, setQuestions] = useState([]);
  const [qId, setqId] = useState(0);
  const [finished, setFinished] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);
  const [API_URL, setAPI_URL] = useState(
    "https://opentdb.com/api.php?amount=10"
  );
  const [isModal, setIsModal] = useState(false);

  const currentUser = useContext(UserContext);

  const cleanState = async () => {
    setQuestions([]);
    setqId(0);
    setFinished(false);
    setRevealed(false);
    setScore(0);
    setStarted(false);
    setAPI_URL("https://opentdb.com/api.php?amount=10");
    setIsModal(false);
    refreshQuestions();
    const getResult = await getUser(currentUser.token);
    const newCoin = getResult.data.getUser.coins;
    currentUser.setCoins(newCoin);
  };

  const updateScore = (x) => {
    setScore((s) => s + x);
  };

  const handleNext = () => {
    if (qId < questions.length - 1) {
      setqId((prevId) => prevId + 1);
    } else {
      finishTrivia();
    }
    setRevealed(false);
  };

  const finishTrivia = () => {
    setFinished(true);

    const requestBody = {
      query: `
        mutation{
          addCoin(coins:${score * 10}){
            name
            coins
          }
        }
      `,
    };

    fetch("http://localhost:8000/api", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + currentUser.token,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Update failed");
        }
        return res.json();
      })
      .then((data) => {})
      .catch((err) => {
        console.log(err);
      });

    addGamesPlayed(currentUser.token, 1).then((data) => {
      console.log(data);
    });
  };

  const refreshQuestions = () => {
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
  };

  useEffect(() => {
    refreshQuestions();
  }, [API_URL]);

  let content = <div class="self-center"></div>;

  if (!started) {
    content = (
      <ContentCard
        content={
          <div>
            <h3 class="text-3xl font-semibold m-6">Welcome to MyTrivia</h3>
            <div class="flex justify-between">
              <TriviaConfig></TriviaConfig>
              <button class="btn-blue" onClick={() => setStarted(true)}>
                Start Trivia Game
              </button>
            </div>
          </div>
        }
      ></ContentCard>
    );
  } else if (finished) {
    content = (
      <ContentCard
        content={
          <>
            <h1 class="text-2xl font-bold">Trivia done. Your score:{score}</h1>
            <button
              class="btn-blue"
              onClick={() => {
                cleanState();
              }}
            >
              Try again
            </button>
          </>
        }
      />
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
        API_URL,
        setAPI_URL,
        isModal,
        setIsModal,
      }}
    >
      <BackDrop />
      {content}
    </TriviaContext.Provider>
  );
};

export default GamePage;
