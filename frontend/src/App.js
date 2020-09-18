import React, { useState } from "react";
import "./assets/main.css";
import UserContext from "./utils/UserContext";
import { fireApp } from "./base";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import GamePage from "./pages/GamePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import AboutPage from "./pages/AboutPage";
import MainNavBar from "./components/Navigation/MainNavBar";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";

const db = fireApp.firestore();

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [coins, setCoins] = useState(0);
  const [profilePic, setProfilePic] = useState(null);

  const login = (token, userId, tokenExpiration, username) => {
    setToken(token);
    setUserId(userId);
    setUsername(username);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setUsername(null);
  };

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
          login,
          logout,
          coins,
          setCoins,
          profilePic,
          setProfilePic,
        }}
      >
        <MainNavBar />
        <div class="flex justify-center items-center h-screen">
          <Switch>
            {!token && <Redirect from="/" to="/auth" exact />}
            {token && <Redirect from="/auth" to="/" exact />}
            <Route path="/signup">
              <SignupPage />
            </Route>
            <Route exact path="/">
              <div className="App">
                <GamePage />
              </div>
            </Route>
            <Route path="/auth">
              <AuthPage />
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/leaderboard">
              <LeaderboardPage />
            </Route>
            <Route path="/profile">
              <ProfilePage />
            </Route>
          </Switch>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
