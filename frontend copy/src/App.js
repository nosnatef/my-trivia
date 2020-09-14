import React, { useState } from "react";
import "./assets/main.css";
import UserContext from "./utils/UserContext";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import GamePage from "./pages/GamePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import MainNavBar from "./components/Navigation/MainNavBar";

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username,setUsername] = useState(null);

  const login = (token, userId, tokenExpiration,username) => {
    setToken(token);
    setUserId(userId);
    setUsername(username);
  };

  const logout = () => {};


  return (
    <Router>
      <UserContext.Provider
                value={{
                  token,
                  setToken,
                  userId,
                  setUserId,
                  username,
                  setUsername,
                  login
                }}
    >
      <MainNavBar />
      <div class="flex justify-center items-center h-screen">
        <Switch>
          {!token && <Redirect from="/" to="/auth" exact />}
          {token && <Redirect from="/auth" to="/" exact />}
          <Route exact path="/">
            <div className="App">
                <GamePage />
            </div>
          </Route>
          <Route path="/auth">
            <AuthPage />
          </Route>
          <Route path="/leaderboard">
            <LeaderboardPage />
          </Route>
        </Switch>
      </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
