import React, { useRef, useState, useContext } from "react";
import UserContext from "../utils/UserContext";

const AuthPage = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [emailWarning, setEmailWarning] = useState(false);
  const [passwordWarning, setPasswordWarning] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);

  const currentUser = useContext(UserContext);

  const submitHandler = (event) => {
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

    const requestBodySignIn = {
      query: `
        query {
          login(email:"${email}", password:"${password}") {
            userId,
            token,
            tokenExpiration,
            name
          }
        }
      `,
    };

    const requestBodySignUp = {
      query: `
        mutation {
          createUser(userInput: {email:"${email}",password:"${password}",name:"avsdd"}) {
            _id
            email
          }
        }
      `,
    };

    fetch("http://localhost:8000/api", {
      method: "POST",
      body: isSignIn
        ? JSON.stringify(requestBodySignIn)
        : JSON.stringify(requestBodySignUp),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Login failed");
        }
        return res.json();
      })
      .then((data) => {
        console.log(currentUser)
        if (data.data.login) {
          currentUser.login(
            data.data.login.token,
            data.data.login.userId,
            data.data.login.tokenExpiration,
            data.data.login.name
          );
        }
        console.log(data);
        
      })
      .catch((err) => {
        console.log(err);
      });
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
            onClick={() => setIsSignIn(true)}
          >
            Sign In
          </button>
          <button
            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={() => setIsSignIn(false)}
          >
            Sign Up
          </button>
          <a
            class="inline-block align-baseline font-bold text-sm py-2 text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
