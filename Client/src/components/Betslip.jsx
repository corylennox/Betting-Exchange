import React from "react";
import ContenderAndIcon from "./ContenderAndIcon";
import { useSelector, useDispatch } from "react-redux";
import { deleteBetsAction, setWagerAndWinAction } from "../Actions";
import { parseMap } from "../utils";
import { getDisplayStr } from "../utils";
import {
  determineWager,
  determineWin,
} from "bettingexchangecommon/wagerWinUtils";
import {
  isValidWagerOrWin,
  convertToIntegerScale,
  convertToPriceString,
} from "./BetslipUtils";
import { changeSportpaneAction, changeNavbarTabAction } from "../Actions";
import { BottomNavbarItems } from "./BottomNavbar";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { LINES_QUERY } from "../GraphQL/Queries";
import { addLinesAction } from "../Actions";

function validateAndChangeWager(evt, setWagerAndWin, line) {
  const newWagerStr = evt.target.value;
  if (isValidWagerOrWin(newWagerStr)) {
    const newWagerInteger = convertToIntegerScale(newWagerStr);
    const newWinInteger = determineWin(line, newWagerInteger);
    const newWinStr = convertToPriceString(newWinInteger);
    setWagerAndWin(newWagerStr, newWagerInteger, newWinStr, newWinInteger);
  }
}

function validateAndChangeWin(evt, setWagerAndWin, line) {
  const newWinStr = evt.target.value;
  if (isValidWagerOrWin(newWinStr)) {
    const newWinInteger = convertToIntegerScale(newWinStr);
    const newWagerInteger = determineWager(line, newWinInteger);
    const newWagerStr = convertToPriceString(newWagerInteger);
    setWagerAndWin(newWagerStr, newWagerInteger, newWinStr, newWinInteger);
  }
}

function ToggledBet(props) {
  const dispatch = useDispatch();
  const toggledBets = parseMap(useSelector((state) => state.toggledBets));
  const linesContainer = parseMap(useSelector((state) => state.lines));
  const wagerStr = toggledBets.get(props.buttonId).wagerStr;
  const winStr = toggledBets.get(props.buttonId).winStr;
  const line = linesContainer.get(props.buttonId);

  const setWagerAndWin = (newWagerStr, newWagerInteger, newWinStr, newWinInteger) => {
    dispatch(
      setWagerAndWinAction(
        props.buttonId,
        newWagerStr,
        newWagerInteger,
        newWinStr,
        newWinInteger
      )
    )};

  /**
   * This code is used to check if the line has changed since the previous refresh.
   * If so, the win needs to be recalculated based on the wager.
   * 
   * Line has changed if wager->win or win->wager calculation does not line up properly.
   */
  useEffect(() => {
    const wagerInteger = toggledBets.get(props.buttonId).wagerInteger;
    const winInteger = toggledBets.get(props.buttonId).winInteger;
    const isWagerOrWinSet = wagerInteger !== 0 || winInteger !== 0;
    const determinedWagerInteger = determineWager(line, winInteger);
    const determinedWinInteger = determineWin(line, wagerInteger);
    if (isWagerOrWinSet && determinedWagerInteger !== wagerInteger && determinedWinInteger !== winInteger) {
      setWagerAndWin(wagerStr, wagerInteger, winStr, winInteger);
    }
  })

  return (
    <div className="flex min-h-fit min-w-fit py-3 pr-9">
      <img
        alt="remove icon"
        className="w-7 h-7 mx-2 mt-2 cursor-pointer"
        src="res/remove.png"
        onClick={() => dispatch(deleteBetsAction([props.buttonId]))}
      />
      <div className="bg-skin-overlay text-skin-body rounded-2xl p-3 drop-shadow-md shadow-lg w-full">
        <div className="inline-flex w-full ">
          <div className=" w-11/12">
            <h1>
              <ContenderAndIcon
                name={props.bet.contenderName}
                image={props.bet.contenderImage}
              />
            </h1>
            <h1>
              {props.bet.title +
                " - " +
                props.bet.type.charAt(0).toUpperCase() +
                props.bet.type.slice(1)}
            </h1>
          </div>
          <div className="w-1/12 text-right mr-2">
            <h1 className="pt-4 pb-4 h-full">
              {getDisplayStr(line)}
            </h1>
          </div>
        </div>

        {/* Wager input */}
        <div className="flex w-full h-14 mt-2">
          <div className="w-1/2 mr-1 border border-skin-input rounded-lg  p-1 text-sm">
            <label className="block uppercase tracking-wide text-skin-body font-bold">
              Wager
            </label>
            <div className="inline-flex font-bold text-skin-body">
              <span className="">$</span>
              <input
                className="appearance-none block bg-transparent w-full leading-tight focus:outline-none"
                type="text"
                onChange={(evt) =>
                  validateAndChangeWager(
                    evt,
                    setWagerAndWin,
                    line
                  )
                }
                value={wagerStr}
              />
            </div>
          </div>

          {/* Win input */}
          <div className="w-1/2 ml-1 border border-skin-input rounded-lg p-1 text-sm">
            <label className="block uppercase tracking-wide text-skin-body  font-bold ">
              To Win
            </label>
            <div className="inline-flex font-bold text-skin-body">
              <span className="">$</span>
              <input
                className="appearance-none block bg-transparent w-full leading-tight focus:outline-none"
                type="text"
                onChange={(evt) =>
                  validateAndChangeWin(
                    evt,
                    setWagerAndWin,
                    line
                  )
                }
                value={winStr}
              />
            </div>
          </div>
        </div>
        <div>
          <h1>ButtonId:{props.bet.buttonId}</h1>
        </div>
      </div>
    </div>
  );
}

export default function Betslip(props) {
  const toggledBets = parseMap(useSelector((state) => state.toggledBets));
  const toggledBetsArray = Array.from(toggledBets);
  const dispatch = useDispatch();

  let toggledButtonIds = [];
  toggledBets.forEach((toggledBet) => {
    toggledButtonIds.push(toggledBet.betInfo.buttonId);
  })

  /**
   * The betslip needs its own query for toggledBet lines in the event the user refreshes the page.
   * If the user refreshes the page, the only queried lines otherwise will be in the active sportspane, and
   * it's possible there are toggled bets whose lines won't be queried by the active sportspane query.
   */
  const { loading, error } = useQuery(LINES_QUERY, {
    variables: { buttonIds: toggledButtonIds },
    onCompleted: (response) => dispatch(addLinesAction(response.lines)),
  });

  if (loading) return <h1>Loading...</h1>;

  if (error) {
    console.error("Error loading Betslip: " + error);
    return <h1>Error Loading Betslip. Error logged to console.</h1>;
  }

  //if this betslip is rendering as a sportpane,
  if (props.isSportPane) {
    dispatch(changeSportpaneAction(BottomNavbarItems[2].href));
    dispatch(changeNavbarTabAction(BottomNavbarItems[2].href));
  }

  if (toggledBetsArray.length !== 0) {
    return toggledBetsArray.map(([buttonId, toggledBet]) => {
      const bet = toggledBet.betInfo;
      return <ToggledBet bet={bet} buttonId={buttonId} />;
    });
  } else {
    return (
      <div className=" w-full pt-28">
        <h1 className=" text-skin-overlay text-center text-2xl">
          You have no current bets.
        </h1>
      </div>
    );
  }
}
