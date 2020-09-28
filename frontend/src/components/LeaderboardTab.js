import React from "react";

import coinIcon from "../images/coinIcon";

export default function LeaderboardTab({ user }) {
  return (
    <div class="flex flex-row justify-between bg-white w-full p-4 m-4 h-20 shadow-lg rounded-lg">
      <div class="flex flex-row">
        <img
          alt="User's profile pic"
          class="w-12 h-full object-cover object-top"
          src={user.profilePic}
        ></img>
        <div class="ml-4 font-semibold">{user.name}</div>
      </div>

      <div class="flex items-center">
        <div>{coinIcon}</div>
        <div>
          <p class="font-bold text-sm">{user.coins}</p>
        </div>
      </div>
    </div>
  );
}
