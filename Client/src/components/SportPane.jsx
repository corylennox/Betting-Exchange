import React from "react";
import OutrightBet from "./OutrightBet";
import GameBet from "./GameBet";
import { useQuery } from "@apollo/client";
import { SPORT_PANE_QUERY } from "../GraphQL/Queries";
import { translateSportsPaneData } from "../GraphQL/Translate";
import { useDispatch } from "react-redux";
import { changeSportpaneAction, changeNavbarTabAction } from "../Actions";
//import { useLocation } from "react-router-dom";
import { BottomNavbarItems } from "./BottomNavbar";

export default function SportPane(props) {
  //const currentPathName = useLocation().pathname;
  const dispatch = useDispatch();

  dispatch(changeSportpaneAction(props.href));
  dispatch(changeNavbarTabAction(BottomNavbarItems[1].href));

  const {
    loading,
    data: sportPaneDataResponse,
    error,
  } = useQuery(SPORT_PANE_QUERY, {
    variables: { sportTitle: props.sportPaneTitle },
  });

  if (loading) return <h1>Loading...</h1>;

  if (error) {
    console.log("Error loading SportPane: " + error);
    return <h1>Error Loading SportPane. Error logged to console.</h1>;
  }

  const sportPaneData = translateSportsPaneData(sportPaneDataResponse);
  return (
    <div className="h-full min-w-fit bg-slate-100 pl-8 pt-4 pr-8">
      <h1 className="mb-3 font-semibold font-sans text-2xl text-slate-900">
        {sportPaneData.sportTitle}
      </h1>
      {sportPaneData.tabs.map((tab) => {
        return tab.availableBets.map((bet) => {
          switch (bet.type) {
            case "OutrightBet":
              return (
                <div key={tab.tabTitle + bet.betTitle}>
                  <OutrightBet outrightBetData={bet} tabTitle={tab.tabTitle} />
                </div>
              );
            case "GameBet":
              return (
                <div key={tab.tabTitle + bet.betTitle}>
                  <GameBet gameBetData={bet} tabTitle={tab.tabTitle} />
                </div>
              );
            default:
              return <></>;
          }
        });
      })}
    </div>
  );
}
