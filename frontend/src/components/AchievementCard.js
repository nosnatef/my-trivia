import React from "react";

export default function AchievementCard({ name, description, finished }) {
  const finishedIcon = (
    <img
      alt="Finished tick"
      src="https://icon-library.net/images/tick-icon-png/tick-icon-png-23.jpg"
      class="mt-2 w-8 h-8 float-right"
    ></img>
  );

  return (
    <div class="achievement-card bg-gray-300 p-4 flex justify-self-auto mb-8 pr-16 mr-2">
      <img
        src="https://icon-library.com/images/achievement-icon-png/achievement-icon-png-29.jpg"
        class="w-24 h-24 "
        alt="Medal icon"
      ></img>
      <div class="flex flex-col ml-4">
        <div class="font-semibold text-xl">{name}</div>
        <div class="font-serif">{description}</div>
        {finished && finishedIcon}
      </div>
    </div>
  );
}
