import React from "react";

import coinIcon from "../images/coinIcon";

export default function LeaderboardCard({ user }) {
  return (
    <div class="flex flex-col bg-white p-4 m-4 w-1/3 h-70 shadow-lg rounded-lg">
      <img
        alt="User's profile pic"
        class="w-full h-56 object-cover object-top"
        src={user.profilePic}
      ></img>
      <div class="py-6 px-6 w-full">
        <h1 class="text-2xl font-semibold text-gray-800">{user.name}</h1>
      </div>
      <p class="font-bold text-sm mx-2"></p>
      <div class="flex items-center">
        <div>{coinIcon}</div>
        <div>
          <p class="font-bold text-sm">{user.coins}</p>
        </div>
      </div>
    </div>
  );
}
