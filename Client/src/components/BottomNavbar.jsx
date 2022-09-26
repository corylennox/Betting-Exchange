import React from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { parseMap } from "../utils";
import { changeNavbarTabAction } from "../Actions";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


const BottomNavbarItems = [
  {
    name: "Home",
    unselectedIcon: <HomeIcon className="h-5 w-5" />,
    selectedIcon: <HomeIconSolid className="h-5 w-5 fill-blue-400" />,
    hideTopBorderOnClick: false,
    href: "/",
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
  const name = props.itemInfo.name;
  const toggledBets = parseMap(useSelector((state) => state.toggledBets));
  const activeNavbarTab = useSelector((state) => state.activeNavbarTab)



  return (
    <div className={divDefaultCss()}>
      <div className="relative">
        {props.itemInfo.href === activeNavbarTab
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
          props.itemInfo.href === activeNavbarTab
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
  const dispatch = useDispatch();
  const currentPathName = useLocation().pathname;
  dispatch(changeNavbarTabAction(currentPathName));

  return (
    <div className="flex justify-between w-full bottom-0 fixed inset-x-0 bg-white h-16 text-center border-t-2 border-slate-300 text-xs pb-5">
      {BottomNavbarItems.map((navbarItem, index) => (
        <Link to={navbarItem.href} className='h-16 w-full'>
          <span
            key={navbarItem.name}
            className="w-full h-full relative"
            onClick={() => {
              dispatch(
                changeNavbarTabAction(navbarItem.href)
              );
            }}
          >
            <BottomNavbarNameAndIcon itemInfo={navbarItem} />
          </span>
        </Link>
      ))}
    </div>
  );
}
