import React from "react";
import OutrightBet from "./OutrightBet";
import GameBet from "./GameBet";
import { useQuery } from "@apollo/client";
import { SPORT_PANE_QUERY } from "../GraphQL/Queries";
import { translateSportsPaneData } from "../GraphQL/Translate";
import { useDispatch } from "react-redux";
import { changeSportpaneAction, changeNavbarTabAction } from "../Actions";
import rts from "../MyRoutes";
import { addLinesAction } from "../Actions";
import { useEffect } from "react";

export default function SportPane(props) {
  //const currentPathName = useLocation().pathname;
  const dispatch = useDispatch();
  //const activeNavbarTab = useSelector((state) => state.activeNavbarTab);

  /**
   * Change the active sportpane and active navbar tab on deferral. Dispatching during rendering isn't
   * supposed to happen, so we have to wait until after render to dispatch.
   */
  useEffect(() => {
    dispatch(changeSportpaneAction(props.href));

    if(props.href === rts.homepage)
      dispatch(changeNavbarTabAction(rts.homepage));
    else
      dispatch(changeNavbarTabAction(rts.allSports))
  })

  const {
    loading,
    data: sportPaneDataResponse,
    error,
  } = useQuery(SPORT_PANE_QUERY, {
    variables: { sportTitle: props.sportPaneTitle },
    onCompleted: (sportPaneDataResponse) => {
      dispatch(addLinesAction(sportPaneDataResponse.sportPane.lines));
    }
  });

  if (loading) return <h1>Loading...</h1>;

  if (error) {
    console.log("Error loading SportPane: " + error);
    return <h1>Error Loading SportPane. Error logged to console.</h1>;
  }

  const sportPaneData = translateSportsPaneData(sportPaneDataResponse);
  return (
    <div className="min-w-fit pl-8 pt-4 pr-8">
      <h1 className="mb-3 font-semibold font-sans text-2xl text-skin-body">
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
