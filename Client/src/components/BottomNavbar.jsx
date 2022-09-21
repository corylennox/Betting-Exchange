import React from "react";
import { useLocation } from "react-router-dom";
import {
  HomeIcon,
  LightningBoltIcon,
  DocumentTextIcon,
  DocumentReportIcon,
  /*RectangleStackIcon,*/ UserIcon,
} from "@heroicons/react/outline";
import {
  HomeIcon as HomeIconSolid,
  LightningBoltIcon as LightningBoltIconSolid,
  DocumentTextIcon as DocumentTextIconSolid,
  DocumentReportIcon as DocumentReportIconSolid,
  /*RectangleStackIcon as RectangleStackIconSolid,*/ UserIcon as UserIconSolid,
} from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { parseMap } from "../utils";

const BottomNavbarItems = [
  {
    name: "Home",
    unselectedIcon: <HomeIcon className="h-5 w-5" />,
    selectedIcon: <HomeIconSolid className="h-5 w-5 fill-blue-400" />,
    hideTopBorderOnClick: false,
    href: "/home",
  },
  {
    name: "All Sports",
    unselectedIcon: <LightningBoltIcon className="h-5 w-5" />,
    selectedIcon: <LightningBoltIconSolid className="h-5 w-5 fill-blue-400" />,
    hideTopBorderOnClick: false,
    href: "/all-sports",
  },
  {
    name: "Betslip",
    unselectedIcon: <DocumentTextIcon className="h-5 w-5" />,
    selectedIcon: <DocumentTextIconSolid className="h-5 w-5 fill-blue-400" />,
    hideTopBorderOnClick: true,
    href: "/betslip",
  },
  {
    name: "My Bets",
    unselectedIcon: (
      <DocumentReportIcon className="h-5 w-5" />
    ) /* RectangleStackIcon */,
    selectedIcon: (
      <DocumentReportIconSolid className="h-5 w-5 fill-blue-400" />
    ) /* RectangleStackIconSolid */,
    hideTopBorderOnClick: false,
    href: "/my-bets",
  },
  {
    name: "Account",
    unselectedIcon: <UserIcon className="h-5 w-5" />,
    selectedIcon: <UserIconSolid className="h-5 w-5 fill-blue-400" />,
    hideTopBorderOnClick: false,
    href: "/account",
  },
];

function bodyFocusedCss() {
  return "text-blue-400";
}

function bodyDeFocusedCss() {
  return "text-black";
}

function divBaseCss() {
  return "grid grid-cols-1 pt-2 pb-8 items-center justify-items-center w-full h-full";
}

function divDefaultCss() {
  return divBaseCss() + " border-6t-";
}

function BottomNavbarNameAndIcon(props) {
  const location = useLocation();
  const name = props.itemInfo.name;
  const toggledBets = parseMap(useSelector((state) => state.toggledBets));

  return (
    //<div className={ (props.itemInfo.hideTopBorderOnClick && location.pathname === props.itemInfo.href) ? divHideTopBorderCss() : divDefaultCss() }>
    <div className={divDefaultCss()}>
      <div className="relative">
        {location.pathname === props.itemInfo.href
          ? props.itemInfo.selectedIcon
          : props.itemInfo.unselectedIcon}
        {name === "Betslip" && toggledBets.size !== 0 ? (
          <div className="w-full ">
            <div className=" rounded-full bg-red-500 flex h-5 w-5 items-center text-center absolute bottom-[0.4rem] left-7">
              <h1 className="w-full text-md font-semibold text-white font-mono">
                {toggledBets.size}
              </h1>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>

      <p
        className={
          location.pathname === props.itemInfo.href
            ? bodyFocusedCss()
            : bodyDeFocusedCss()
        }
      >
        {name}
      </p>
    </div>
  );
}

export default function BottomNavbar() {
  return (
    <div className="flex justify-between w-full bottom-0 z-50 sticky bg-white h-full border-t-2 border-slate-300 text-xs pb-5">
      {BottomNavbarItems.map((navbarItem, index) => (
        <a
          key={navbarItem.name}
          className="w-full h-full relative"
          href={navbarItem.href}
        >
          <div className="w-full h-full absolute top-0">
            <BottomNavbarNameAndIcon itemInfo={navbarItem} />
          </div>
        </a>
      ))}
    </div>
  );
}
