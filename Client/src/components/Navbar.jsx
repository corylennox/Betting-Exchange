import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeSportpaneAction, changeNavbarTabAction } from "../Actions";
import ActiveThemeButton from "./ActiveThemeButton.jsx";
import rts from "../MyRoutes";
import { useAuth0 } from "@auth0/auth0-react";
import PromptButton from "./PromptButton";
//import { UserCircleIcon } from "@heroicons/react/outline";
import { ReactComponent as LogoSvgRaw } from "../images/logo.svg";
import { convertToPriceString } from "./BetslipUtils";

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
  account: {
    href: rts.account,
  },
};

export default function Navbar() {
  const dispatch = useDispatch();
  const activeSportPane = useSelector((state) => state.activeSportPane);
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
    logout,
  } = useAuth0();
  const availableBalance = useSelector((state) => state.availableBalance);

  const navigate = useNavigate();

  if (isAuthLoading) return <h1>Loading</h1>;

  return (
    <div className="fixed top-0 left-1/2 z-50 w-full max-w-[90rem] translate-x-[-50%] bg-skin-default text-skin-header">
      <div className="inline-flex h-20 w-full flex-row flex-nowrap items-center">
        <div className="h-full min-w-[12rem] max-w-[12rem]">
          <Link
            to={navs.home.href}
            className="flex h-full items-center pl-11"
            onClick={() => {
              dispatch(changeSportpaneAction(navs.home.href));
              dispatch(changeNavbarTabAction(rts.homepage));
            }}
          >
            {/* padding left matches the margin left in the sidebar, so logo and sidebar are left-aligned */}
            <LogoSvgRaw className="h-16" />
          </Link>
        </div>
        <div className="flex h-full w-full lg:max-w-4xl">
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
          {isAuthenticated ? (
            <div className="contents">
              <div className="mr-2 text-right">
                <span className="block text-xs">Balance</span>
                <span className="text-s block">{`$${convertToPriceString(
                  availableBalance
                )}`}</span>
              </div>
              <div className="mr-4 flex h-full w-full items-center py-5">
                <PromptButton
                  onClick={() => {
                    navigate("/account");
                  }} // onClick() should redirect to Strip deposit
                  text="Deposit"
                  textSize="text-m"
                  gradientColorStart="from-skin-buttonAccentGradientStart"
                  gradientColorEnd="to-skin-buttonAccentGradientEnd"
                  gradientColorPressedStart="active:from-skin-buttonAccentPressed"
                  gradientColorPressedEnd="active:to-skin-buttonAccentPressed"
                />
              </div>
              <div className="h-1/3 w-1 items-center bg-skin-sidebarDivider" />
              <div className="mx-4 h-8 w-8">
                <Link
                  to={loginItems.account.href}
                  className="flex h-8 w-8 items-center"
                  onClick={() => {
                    dispatch(changeSportpaneAction(loginItems.account.href));
                    dispatch(changeNavbarTabAction(rts.account));
                  }}
                >
                  <img className="h-8 w-8" src="accountIcon.svg" alt="logo" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="contents">
              <div className="mr-4 flex h-full w-full items-center py-5">
                <PromptButton
                  onClick={() => loginWithRedirect({ screen_hint: "login" })}
                  text="Log in"
                  textSize="text-m"
                  gradientColorStart="from-skin-buttonAccentGradientStart"
                  gradientColorEnd="to-skin-buttonAccentGradientEnd"
                  gradientColorPressedStart="active:from-skin-buttonAccentPressed"
                  gradientColorPressedEnd="active:to-skin-buttonAccentPressed"
                />
              </div>
              <div className="mr-4 flex h-full w-full items-center py-5">
                <PromptButton
                  onClick={() => loginWithRedirect({ screen_hint: "signup" })}
                  text="Sign up"
                  textSize="text-m"
                  gradientColorStart="from-skin-buttonMutedGradientStart"
                  gradientColorEnd="to-skin-buttonMutedGradientEnd"
                  gradientColorPressedStart="active:from-skin-buttonMutedPressed"
                  gradientColorPressedEnd="active:to-skin-buttonMutedPressed"
                />
              </div>
            </div>
          )}
          <div className="h-1/3 w-1 items-center bg-skin-sidebarDivider" />
          <span className="inline-block h-full items-center px-4 align-middle">
            <ActiveThemeButton />
          </span>
        </div>
      </div>
    </div>
  );
}
