import React, { useRef, useState, useContext, useEffect } from "react";

import UserContext from "../utils/UserContext";
import AchievementCard from "../components/AchievementCard";

import getAchievements from "../query/getAchievements";

export default function ProfilePage() {
  const currentUser = useContext(UserContext);

  const [achievements, setAchievements] = useState([]);

  const unlockedAchievementNames = currentUser.unlockedAchievement.map(a => {
    return a.name;
  });

  useEffect(async () => {
    const achievementList = await getAchievements();
    if (achievementList) {
      setAchievements(achievementList.data.achievements);
    }
    console.log(unlockedAchievementNames);
  }, []);

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
        {achievements && achievements.map((achievement) => {
          const { name, description } = achievement;
          console.log(unlockedAchievementNames)
          return (<AchievementCard name={name} description={description} finished={unlockedAchievementNames.includes(name)} />);
        })}
      </div>
    </div>
  );
}
