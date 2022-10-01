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
    <div className="bg-slate-900 top-0 z-50 sticky w-full">
      <div className="w-full grid grid-cols-6 items-center h-20">
        <Link to={navs.home.href} className="col-span-1 pl-11 h-full flex items-center"
          onClick={() => {dispatch(changeSportpaneAction(navs.home.href)); dispatch(changeNavbarTabAction(rts.homepage)); }}> {/* padding left matches the margin left in the sidebar, so logo and sidebar are left-aligned */}
            <img className="h-16" src="logo.png" alt="logo" />
        </Link>
        <div className="col-span-4 h-full flex flex-nowrap">
          <Link to={navs.home.href} className={"px-8 h-full flex items-center border-b-4 " + (activeSportPane === navs.home.href ? "border-gray-200 font-semibold" : "border-slate-900 hover:border-gray-400")}
            onClick={() => {dispatch(changeSportpaneAction(navs.home.href)); dispatch(changeNavbarTabAction(rts.homepage)); }}>
              {navs.home.name}
          </Link>
          <Link to={navs.myBets.href} className={"px-8 h-full flex items-center border-b-4 " + (activeSportPane === navs.myBets.href ? "border-gray-200 font-semibold" : "border-slate-900 hover:border-gray-400")}
            onClick={() => {dispatch(changeSportpaneAction(navs.myBets.href)); dispatch(changeNavbarTabAction(rts.myBets)); }}>
              {navs.myBets.name}
          </Link>
        </div>
        <div className="col-span-1 h-full flex flex-nowrap">
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
