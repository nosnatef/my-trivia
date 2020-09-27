import React, { useEffect, useState } from "react";

import getLeaderboard from "../query/getLeaderboard";

import LeaderboardCard from "../components/LeaderboardCard";
import LeaderboardTab from "../components/LeaderboardTab";

const LeaderboardPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getLeaderboard().then((data) => {
      setUsers(data.data.getLeaderboard);
    });
  }, []);

  return (
    <div class="container mx-auto my-20">
      <div class="flex flex-row">
        {users.slice(0, 5).map((user) => (
          <LeaderboardCard user={user} />
        ))}
      </div>
      <div class="flex flex-col mt-8">
        <div><LeaderboardTab/></div>
        <div>2</div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
