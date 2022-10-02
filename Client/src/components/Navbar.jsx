import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeSportpaneAction, changeNavbarTabAction } from "../Actions";
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
    <div className="fixed bg-slate-900 top-0 z-50 left-1/2 translate-x-[-50%] w-full max-w-[76rem]">
      <div className="flex flex-row flex-nowrap items-center h-20 w-full">
        <div className="min-w-[12rem] max-w-[12rem] h-full ">
          <Link to={navs.home.href} className="pl-11 h-full flex items-center"
            onClick={() => { dispatch(changeSportpaneAction(navs.home.href)); dispatch(changeNavbarTabAction(rts.homepage)); }}> {/* padding left matches the margin left in the sidebar, so logo and sidebar are left-aligned */}
            <img className="h-16" src="logo.png" alt="logo" />
          </Link>
        </div>
        <div className="h-full flex w-full lg:max-w-2xl">
          <Link to={navs.home.href} className={"px-8 h-full flex items-center border-b-4 " + (activeSportPane === navs.home.href ? "border-gray-200 font-semibold" : "border-slate-900 hover:border-gray-400")}
            onClick={() => { dispatch(changeSportpaneAction(navs.home.href)); dispatch(changeNavbarTabAction(rts.homepage)); }}>
            {navs.home.name}
          </Link>
          <Link to={navs.myBets.href} className={"px-8 h-full flex items-center border-b-4 " + (activeSportPane === navs.myBets.href ? "border-gray-200 font-semibold" : "border-slate-900 hover:border-gray-400")}
            onClick={() => { dispatch(changeSportpaneAction(navs.myBets.href)); dispatch(changeNavbarTabAction(rts.myBets)); }}>
            {navs.myBets.name}
          </Link>
        </div>
        <div className="h-full flex flex-nowrap min-w-[22rem] max-w-[22rem] justify-end">
          <a href={loginItems.login.href} className="px-8 h-full flex items-center">
            {loginItems.login.name}
          </a>
          <a href={loginItems.signup.href} className="px-8 h-full flex items-center">
            {loginItems.signup.name}
          </a>
        </div>
      </div>
    </div>
  );
}
