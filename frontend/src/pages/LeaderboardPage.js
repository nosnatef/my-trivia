import React, { useEffect, useState } from "react";

import getLeaderboard from "../query/getLeaderboard";

import LeaderboardCard from "../components/LeaderboardCard";

const LeaderboardPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getLeaderboard().then((data) => {
      setUsers(data.data.getLeaderboard);
    });
  }, []);

  return (
    <div>
      {users.map((user) => (
        <LeaderboardCard user={user} />
      ))}
    </div>
  );
};

export default LeaderboardPage;
