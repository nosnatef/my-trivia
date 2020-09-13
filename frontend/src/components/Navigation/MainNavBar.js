import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import UserContext from "../../utils/UserContext";

const MainNavBar = () => {
  const currentUser = useContext(UserContext);

  const profileLink = (<a
    href="#responsive-header"
    class="block lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
  >
    <NavLink to="/leaderboard">{currentUser.username}</NavLink>
  </a>);

  const loginLink = (<a
    class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white"
  >
    <NavLink to="/auth">Log in</NavLink>
  </a>);

  return (
    <nav class="flex items-center justify-between flex-wrap bg-blue-700 p-6">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <svg
          class="fill-current w-8 h-8 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="fire w-6 h-6"
        >
          <path
            fill-rule="evenodd"
            d="M11.757 2.034a1 1 0 01.638.519c.483.967.844 1.554 1.207 2.03.368.482.756.876 1.348 1.467A6.985 6.985 0 0117 11a7.002 7.002 0 01-14 0c0-1.79.684-3.583 2.05-4.95a1 1 0 011.707.707c0 1.12.07 1.973.398 2.654.18.374.461.74.945 1.067.116-1.061.328-2.354.614-3.58.225-.966.505-1.93.839-2.734.167-.403.356-.785.57-1.116.208-.322.476-.649.822-.88a1 1 0 01.812-.134zm.364 13.087A2.998 2.998 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879.586.585.879 1.353.879 2.121s-.293 1.536-.879 2.121z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="font-semibold text-xl tracking-wide">My Trivia</span>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <a
            href="#responsive-header"
            class="block lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            <NavLink to="/about">About</NavLink>
          </a>
          <a
            href="#responsive-header"
            class="block lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            <NavLink to="/gamemode">Gamemode</NavLink>
          </a>
          <a
            href="#responsive-header"
            class="block lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            <NavLink to="/leaderboard">Leaderboard</NavLink>
          </a>
          
        </div>
      </div>
      <div>
        {currentUser.token ? profileLink : loginLink}
      </div>
    </nav>
  );
};

export default MainNavBar;
