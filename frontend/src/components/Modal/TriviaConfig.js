import React, { useContext, useRef } from "react";

import TriviaContext from "../../utils/TriviaContext";

export default function TriviaConfig() {
  const difficultyRef = useRef(null);
  const numberRef = useRef(null);

  const baseAPI = "https://opentdb.com/api.php?";

  const currentTrivia = useContext(TriviaContext);

  const submitHandler = (event) => {
    event.preventDefault();
    currentTrivia.setIsModal(false);
    const number = numberRef.current.value;
    const difficulty = difficultyMap[difficultyRef.current.value];
    let newAPI = baseAPI;
    newAPI += `amount=${number ? number : 10}`;
    newAPI += `${difficulty ? `&difficulty=${difficulty}` : ""}`;
    currentTrivia.setAPI_URL(newAPI);
  };

  const difficultyMap = {
    Random: "",
    Easy: "easy",
    Medium: "medium",
    Hard: "hard",
  };

  return (
    <>
      <button
        class="btn-blue"
        onClick={() => currentTrivia.setIsModal(true)}
      >
        Configure
      </button>
      {currentTrivia.isModal ? (
        <>
          <div class="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div class="relative w-auto my-6 mx-auto max-w-3xl">
              <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div class="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 class="text-3xl font-semibold">Game Configuration</h3>
                  <button
                    class="p-1 m1-auto bg-transparent border-0 text-black opcaity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => currentTrivia.setIsModal(false)}
                  >
                    <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                <form class="relative p-6 flex-auto" onSubmit={submitHandler}>
                  <p class="my-4 text-gray-800 text-lg leading-relaxed">
                    Setting up the config of this trivia game:
                  </p>
                  <div class="mb-4">
                    <label
                      class="block text-gray-700 text-base font-bold mb-2"
                      for="number"
                    >
                      Number of Questions
                    </label>
                    <input
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="number"
                      type="text"
                      placeholder="Enter a number"
                      defaultValue="10"
                      ref={numberRef}
                    ></input>
                  </div>
                  <div class="mb-4">
                    <label
                      class="block text-gray-700 text-base font-bold mb-2"
                      for="difficulty"
                    >
                      Difficulty
                    </label>
                    <select
                      class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="difficulty"
                      ref={difficultyRef}
                    >
                      <option>Random</option>
                      <option>Easy</option>
                      <option>Medium</option>
                      <option>Hard</option>
                    </select>
                  </div>
                  <div class="flex justify-between mt-8">
                    <button
                      class="btn-blue"
                      type="submit"
                    >
                      Test
                    </button>
                    <button
                      class="btn-blue"
                      type="button"
                      onClick={() => currentTrivia.setIsModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
