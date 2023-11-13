import React, { useEffect } from "react";
import { ChevronRightIcon } from "@heroicons/react/outline";
import ImageMap from "../images/ImageMap";
import { useSelector, useDispatch } from "react-redux";
import { changeSportpaneAction, changeNavbarTabAction } from "../Actions";
import { Link } from "react-router-dom";
import rts from "../MyRoutes";

export default function Sidebar(props) {
  const dispatch = useDispatch();
  const activeSportPane = useSelector((state) => state.activeSportPane);

  useEffect(() => {
    if (props.isSportPane) {
      dispatch(changeSportpaneAction(rts.allSports));
      dispatch(changeNavbarTabAction(rts.allSports));
    }
  }, [dispatch, props.isSportPane]);

  return (
    <div className={props.isSportPane ? "bg-skin-overlay" : ""}>
      <div className={props.isSportPane ? "mb-1 ml-4 pt-3" : "mb-3 mt-3 ml-11"}>
        {/* margin left to match the padding left in the <a/> tag */}
        <h1
          className={
            props.isSportPane
              ? "font-bold text-skin-body"
              : "font-bold text-skin-header"
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
                    ? " flex cursor-pointer items-center justify-between pb-4 pt-4 pl-5"
                    : sportData.href === activeSportPane
                    ? "flex cursor-pointer items-center justify-between bg-skin-selected pb-2 pt-2 pl-11 pr-12 font-semibold text-slate-300"
                    : "flex cursor-pointer items-center justify-between pb-2 pt-2 pl-11 pr-12"
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
                      props.isSportPane
                        ? "text-s font-light text-skin-actionUnselected"
                        : "text-skin-header"
                    }
                  >
                    {sportData.title}
                  </p>
                </div>
                <div className={props.isSportPane ? "mr-8" : "hidden"}>
                  <ChevronRightIcon className="mr-3 h-4 w-4 text-skin-actionUnselected" />
                </div>
              </span>
            </Link>
            {props.isSportPane && index < props.sportsData.length - 1 ? (
              <div className="ml-12">
                <div className="h-0.5 w-full bg-gray-300" />
              </div>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
