import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeSportpaneAction, changeNavbarTabAction } from "../Actions";
import ActiveThemeButton from "./ActiveThemeButton.jsx";
import rts from "../MyRoutes";

const navs = {
  home: {
    name: "Home",
    href: rts.homepage,
  },
  myBets: {
    name: "My Bets",
    href: rts.myBets,
  },
};

const loginItems = {
  login: {
    name: "Log in",
    href: rts.login,
  },
  signup: {
    name: "Sign Up",
    href: rts.signup,
  },
};

export default function Navbar() {
  const dispatch = useDispatch();
  const activeSportPane = useSelector((state) => state.activeSportPane);

  return (
    <div className="fixed top-0 left-1/2 z-50 w-full max-w-[76rem] translate-x-[-50%] bg-skin-default text-skin-header">
      <div className="inline-flex h-20 w-full flex-row flex-nowrap items-center">
        <div className="h-full min-w-[12rem] max-w-[12rem] ">
          <Link
            to={navs.home.href}
            className="flex h-full items-center pl-11"
            onClick={() => {
              dispatch(changeSportpaneAction(navs.home.href));
              dispatch(changeNavbarTabAction(rts.homepage));
            }}
          >
            {" "}
            {/* padding left matches the margin left in the sidebar, so logo and sidebar are left-aligned */}
            <img className="h-16" src="logo.png" alt="logo" />
          </Link>
        </div>
        <div className="flex h-full w-full lg:max-w-2xl">
          <Link
            to={navs.home.href}
            className={
              "flex h-full items-center border-b-4 px-8 " +
              (activeSportPane === navs.home.href
                ? "border-gray-200 font-semibold"
                : "border-skin-divider hover:border-gray-400")
            }
            onClick={() => {
              dispatch(changeSportpaneAction(navs.home.href));
              dispatch(changeNavbarTabAction(rts.homepage));
            }}
          >
            {navs.home.name}
          </Link>
          <Link
            to={navs.myBets.href}
            className={
              "flex h-full items-center border-b-4 px-8 " +
              (activeSportPane === navs.myBets.href
                ? "border-gray-200 font-semibold"
                : "border-skin-divider hover:border-gray-400")
            }
            onClick={() => {
              dispatch(changeSportpaneAction(navs.myBets.href));
              dispatch(changeNavbarTabAction(rts.myBets));
            }}
          >
            {navs.myBets.name}
          </Link>
        </div>
        <div className="inline-flex h-full min-w-[22rem] max-w-[22rem] flex-nowrap items-center justify-end align-middle">
          <a
            href={loginItems.login.href}
            className="flex h-full items-center px-8"
          >
            {loginItems.login.name}
          </a>
          <a
            href={loginItems.signup.href}
            className="flex h-full items-center px-8"
          >
            {loginItems.signup.name}
          </a>
          <div className="h-1/3 w-0.5 items-center bg-skin-sidebarDivider" />
          <span className="inline-block h-full items-center px-4 align-middle">
            <ActiveThemeButton />
          </span>
        </div>
      </div>
    </div>
  );
}
