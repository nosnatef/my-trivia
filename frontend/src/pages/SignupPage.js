import React, { useRef, useState, useContext } from "react";

import UserContext from "../utils/UserContext";
import LoginAction from "../query/loginAction";

import { fireApp } from "../base";

import updateProfilePic from "../query/updateProfilePic";

const storage = fireApp.storage();

export default function SignupPage() {
  const currentUser = useContext(UserContext);

  const [file, setFile] = useState(null);

  const submitHandler = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;

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

    if (name.trim().length === 0) {
      setNameWarning(true);
    } else {
      setNameWarning(false);
    }

    if (emailWarning || passwordWarning || nameWarning) {
      return;
    }

    const requestBodySignUp = {
      query: `
        mutation {
          createUser(userInput: {email:"${email}",password:"${password}",name:"${name}",profilePic:"https://firebasestorage.googleapis.com/v0/b/my-trivia-446f8.appspot.com/o/default.jpg?alt=media&token=d88f0e02-ec07-4bcf-a422-0d2c5b0fe8c7"}) {
            _id
            email
            profilePic
          }
        }
      `,
    };

    fetch("http://localhost:8000/api", {
      method: "POST",
      body: JSON.stringify(requestBodySignUp),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Signup failed");
        }
        return res.json();
      })
      .then((data) => {
        return data.data.createUser._id;
      })
      .then(async (id) => {
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

          if (file) {
            const storageRef = storage.ref();
            const fileRef = storageRef.child(`${id}.jpg`);
            await fileRef.put(file);
            const downloadURL = await fileRef.getDownloadURL();
            const updateResult = await updateProfilePic(loginData.data.login.token, downloadURL);
            console.log(updateResult);
          }
        }

        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);

  const [emailWarning, setEmailWarning] = useState(false);
  const [passwordWarning, setPasswordWarning] = useState(false);
  const [nameWarning, setNameWarning] = useState(false);

  return (
    <div class="w-full max-w-md font-sans">
      <form
        class="bg-white shadow-md rounded px-8 pt-6 pb-8"
        onSubmit={submitHandler}
      >
        <div class="mb-6 flex items-center justify-center">
          <label class="text-black text-lg font-bold mb-2">Sign Up</label>
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
        <div class="mb-4">
          <label
            class="block text-gray-700 text-base font-bold mb-2"
            for="name"
          >
            Name
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="name"
            placeholder="Your Name"
            ref={nameRef}
          ></input>
          {nameWarning ? (
            <p class="text-red-500 text-xs italic">Please enter your name.</p>
          ) : (
            ""
          )}
        </div>
        <div>
          <label
            class="block text-gray-700 text-base font-bold mb-2"
            for="profile_pic"
          >
            Upload your profile pic
            <label class="my-4 w-50 h-30 flex flex-col items-center px-4 py-2 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
              <svg
                class="w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span class="mt-2 text-base leading-normal">Select a file</span>
              <input type="file" class="hidden" onChange={onChange} />
            </label>
          </label>
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
