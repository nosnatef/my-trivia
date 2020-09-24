import React, { useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import LoginAction from "../query/loginAction";

import UserContext from "../utils/UserContext";

const AuthPage = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [emailWarning, setEmailWarning] = useState(false);
  const [passwordWarning, setPasswordWarning] = useState(false);

  const currentUser = useContext(UserContext);

  const submitHandler = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email.trim().length === 0) {
      setEmailWarning(true);
    } else {
      setEmailWarning(false);
    }

    if (password.trim().length === 0) {
      setPasswordWarning(true);
    } else {
      setPasswordWarning(false);
    }

    if (emailWarning || passwordWarning) {
      return;
    }

    const loginData = await LoginAction(email, password);
    if (loginData && loginData.data.login) {
      currentUser.login(
        loginData.data.login.token,
        loginData.data.login.userId,
        loginData.data.login.tokenExpiration,
        loginData.data.login.name
      );
      const userCoins = loginData.data.login.user.coins;
      currentUser.setCoins(userCoins);
      const userProfilePic = loginData.data.login.user.profilePic;
      currentUser.setProfilePic(userProfilePic);
      
    }
  };

  return (
    <div class="w-full max-w-md font-sans">
      <form
        class="bg-white shadow-md rounded px-8 pt-6 pb-8"
        onSubmit={submitHandler}
      >
        <div class="mb-6 flex items-center justify-center">
          <label class="text-black text-lg font-bold mb-2">Sign In</label>
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-base font-bold mb-2"
            for="email"
          >
            Email
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Enter your email"
            ref={emailRef}
          ></input>
          {emailWarning ? (
            <p class="text-red-500 text-xs italic">Please enter your email.</p>
          ) : (
            ""
          )}
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-base font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="***************"
            ref={passwordRef}
          ></input>
          {passwordWarning ? (
            <p class="text-red-500 text-xs italic">
              Please enter your password.
            </p>
          ) : (
            ""
          )}
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <button
            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            <Link to="/signup">Sign Up</Link>
          </button>
          <a
            class="inline-block align-baseline font-bold text-sm py-2 text-blue-500 hover:text-blue-800"
            href="/#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
