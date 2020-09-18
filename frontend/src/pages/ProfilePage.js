import React, { useRef, useState, useContext } from "react";

import UserContext from "../utils/UserContext";

export default function ProfilePage() {
  const currentUser = useContext(UserContext);

  return (
    <div class="container bg-white shadow-md p-6 w-full">
      <div class="flex mb-16">
        <div class="w-1/3">
          <img
            src={currentUser.profilePic}
            class="shadow rounded-full w-32 h-32"
          ></img>
        </div>
        <div class="w-2/3 font-semibold text-2xl mt-10">
          {currentUser.username}
        </div>
      </div>
      <div class="flex flex-wrap justify-between border-gray-600">
        <div class="achievement-card bg-gray-300 p-4 flex justify-self-auto mb-2 pr-16 w-auto flex-1 mr-4">
          <img
            src="https://icon-library.com/images/achievement-icon-png/achievement-icon-png-29.jpg"
            class="w-24 h-24 "
          ></img>
          <div class="flex flex-col ml-4">
            <div class="font-semibold text-xl">Trivia Beginner</div>
            <div class="font-serif">Finish 1 game of trivia.</div>
          </div>
        </div>
        <div class="achievement-card bg-gray-300 p-4 flex justify-self-auto mb-2 pr-16 w-auto flex-1 mr-4">
          <img
            src="https://icon-library.com/images/achievement-icon-png/achievement-icon-png-29.jpg"
            class="w-24 h-24 "
          ></img>
          <div class="font-semibold text-xl">Trivia Apprentice</div>
        </div>
        <div class="achievement-card bg-gray-300 p-4 flex justify-self-auto mb-2 pr-16 w-auto flex-1">
          <img
            src="https://icon-library.com/images/achievement-icon-png/achievement-icon-png-29.jpg"
            class="w-24 h-24 "
          ></img>
          <div class="font-semibold text-xl">Trivia Master</div>
        </div>
        
      </div>
    </div>
  );
}
