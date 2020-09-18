import React, { useEffect, useState } from "react";

import coinIcon from "../images/coinIcon"

export default function LeaderboardCard({ user }) {
  return (
    <div class="flex justify-between items-center bg-white rounded p-4 mb-4">
      <img class="h-8 hidden md:block" src={user.profilePic}></img>
      <div>
        <p class="font-bold text-sm mx-2">{user.name}</p>
      </div>
      <div>
        {coinIcon}
      </div>
      <div>
        <p class="font-bold text-sm">{user.coins}</p>
      </div>
    </div>
  );
}
