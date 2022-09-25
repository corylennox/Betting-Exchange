import React, { Component } from "react";
import { ChevronRightIcon } from "@heroicons/react/outline";
import ImageMap from "../images/ImageMap";
import { useSelector, useDispatch } from "react-redux";
import { changeSportpaneAction } from "../Actions";

export default function Sidebar(props) {
  const dispatch = useDispatch();

  return (
    <div className={props.sportsPane ? "bg-white" : ""}>
      <div
        className={
          props.sportsPane ? "mb-1 mt-3 ml-4" : "mb-3 mt-3 ml-5"
        }
      >
        {/* margin left to match the padding left in the <a/> tag */}
        <h1
          className={
            props.sportsPane
              ? "text-gray-700 font-bold"
              : "text-slate-200 font-bold"
          }
        >
          All Sports
        </h1>
      </div>
      <div>
        {props.sportsData.map((sportData, index) => (
          <div key={sportData.title} className="contents">
            <a
              className={
                props.sportsPane
                  ? "flex justify-between items-center pb-4 pt-4 pl-5 cursor-pointer"
                  : "flex justify-between items-center pb-2 pt-2 pl-5 pr-12 cursor-pointer"
              }

              onClick={() => {
                dispatch(changeSportpaneAction(sportData.title, sportData.href));
              }}

              //href={sportData.href}
            >
              <div className="flex items-center">
                <div className="mr-3">
                  {ImageMap.get(
                    props.sportsPane
                      ? sportData.sidebarAlternateIcon
                      : sportData.sidebarIcon
                  )}
                </div>
                <p
                  className={
                    props.sportsPane
                      ? "text-blue-500 font-light text-s"
                      : ""
                  }
                >
                  {sportData.title}
                </p>
              </div>
              <div className={props.sportsPane ? "" : "hidden"}>
                <ChevronRightIcon className="w-4 h-4 mr-3 text-blue-500" />
              </div>
            </a>
            {props.sportsPane &&
              index < props.sportsData.length - 1 ? (
              <div className="w-full h-px bg-gray-300 ml-4" />
            ) : (
              <div />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

