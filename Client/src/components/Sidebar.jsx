import React from "react";
import { ChevronRightIcon } from "@heroicons/react/outline";
import ImageMap from "../images/ImageMap";
import { useDispatch } from "react-redux";
import { changeSportpaneAction } from "../Actions";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function Sidebar(props) {
  const dispatch = useDispatch();
  const currentPathName = useLocation().pathname;
  dispatch(changeSportpaneAction(currentPathName));

  return (
    <div className={props.isSportPane ? "bg-white" : ""}>
      <div className={props.isSportPane ? "mb-1 mt-3 ml-4" : "mb-3 mt-3 ml-11"}>
        {/* margin left to match the padding left in the <a/> tag */}
        <h1 className={
              props.isSportPane
                ? "text-gray-700 font-bold"
                : "text-slate-200 font-bold"
            }>
          All Sports
        </h1>
      </div>
      <div>
        {props.sportsData.map((sportData, index) => (
          <div key={sportData.title} className="contents">
            <Link to={"/" + sportData.href}>
              <span
                className={
                  props.isSportPane
                    ? " flex justify-between items-center pb-4 pt-4 pl-5 cursor-pointer"
                    : "/" + sportData.href === currentPathName
                      ? "bg-slate-800 flex justify-between items-center pb-2 pt-2 pl-11 pr-12 cursor-pointer text-slate-300 font-semibold"
                      : "flex justify-between items-center pb-2 pt-2 pl-11 pr-12 cursor-pointer"
                }
                onClick={() => {
                  dispatch(
                    changeSportpaneAction('/' + sportData.href)
                  );
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
                      props.isSportPane ? "text-blue-500 font-light text-s" : ""
                    }
                  >
                    {sportData.title}
                  </p>
                </div>
                <div className={props.isSportPane ? "" : "hidden"}>
                  <ChevronRightIcon className="w-4 h-4 mr-3 text-blue-500" />
                </div>
              </span>
            </Link>
            {props.isSportPane && index < props.sportsData.length - 1 ? (
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
