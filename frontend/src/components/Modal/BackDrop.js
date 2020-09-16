import React, { useContext } from "react";

import TriviaContext from "../../utils/TriviaContext";

export default function BackDrop() {
  const currentTrivia = useContext(TriviaContext);

  return (
    <>
      <div
        class={
          "fixed h-full w-full bg-gray-800 bg-opacity-25 bottom-0 top-0 left-0 right-0" +
          (currentTrivia.isModal ? "" : " hidden")
        }
        value="1"
      ></div>
    </>
  );
}
