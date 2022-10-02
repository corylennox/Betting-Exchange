import React from "react";
import { ChevronRightIcon } from "@heroicons/react/outline";
import ImageMap from "../images/ImageMap";
import { useSelector, useDispatch } from "react-redux";
import { changeSportpaneAction, changeNavbarTabAction } from "../Actions";
import { Link } from "react-router-dom";
import rts from "../MyRoutes";

export default function Sidebar(props) {
  const dispatch = useDispatch();
  const activeSportPane = useSelector((state) => state.activeSportPane);

  if (props.isSportPane) {
    dispatch(changeSportpaneAction(rts.allSports));
    dispatch(changeNavbarTabAction(rts.allSports));
  }

  return (
    <div className={props.isSportPane ? "bg-white" : ""}>
      <div className={props.isSportPane ? "mb-1 pt-3 ml-4" : "mb-3 mt-3 ml-11"}>
        {/* margin left to match the padding left in the <a/> tag */}
        <h1
          className={
            props.isSportPane
              ? "text-skin-body font-bold"
              : "text-skin-header font-bold"
          }
        >
          All Sports
        </h1>
      </div>
      <div>
        {props.sportsData.map((sportData, index) => (
          <div key={sportData.title} className="contents">
            <Link to={sportData.href}>
              <span
                className={
                  props.isSportPane
                    ? " flex justify-between items-center pb-4 pt-4 pl-5 cursor-pointer"
                    : sportData.href === activeSportPane
                    ? "bg-skin-defaultSelected flex justify-between items-center pb-2 pt-2 pl-11 pr-12 cursor-pointer text-slate-300 font-semibold"
                    : "flex justify-between items-center pb-2 pt-2 pl-11 pr-12 cursor-pointer"
                }
                onClick={() => {
                  dispatch(changeSportpaneAction(sportData.href));
                  dispatch(changeNavbarTabAction(rts.allSports));
                }}
              >
                <div className="flex items-center">
                  <div className="mr-3">
                    {ImageMap.get(
                      props.isSportPane
                        ? sportData.sidebarAlternateIcon
                        : sportData.sidebarIcon
                    )}
                  </div>
                  <p
                    className={
                      props.isSportPane ? "text-skin-actionUnselected font-light text-s" : "text-skin-header"
                    }
                  >
                    {sportData.title}
                  </p>
                </div>
                <div className={props.isSportPane ? "mr-8" : "hidden"}>
                  <ChevronRightIcon className="w-4 h-4 mr-3 text-skin-actionUnselected" />
                </div>
              </span>
            </Link>
            {props.isSportPane && index < props.sportsData.length - 1 ? (
              <div className="w-11/12 h-0.5 bg-gray-300 ml-12" />
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
