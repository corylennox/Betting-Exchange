import React from "react";
import ContenderAndIcon from "./ContenderAndIcon";
import { useSelector, useDispatch } from "react-redux";
import { deleteBetsAction, setWagerAndWinAction } from "../Actions";
import { parseMap } from "../utils";
import { getDisplayStr } from "../utils";
import { determineWager, determineWin } from "@openbook/common/wagerWinUtils";
import {
  isValidWagerOrWin,
  convertToIntegerScale,
  convertToPriceString,
} from "./BetslipUtils";
import { changeSportpaneAction, changeNavbarTabAction } from "../Actions";
import { BottomNavbarItems } from "./BottomNavbar";
import { useEffect } from "react";
import BetslipSubmission from "./BetslipSubmission";
import { TrashIcon } from "@heroicons/react/outline";

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

  const setWagerAndWin = (
    newWagerStr,
    newWagerInteger,
    newWinStr,
    newWinInteger
  ) => {
    dispatch(
      setWagerAndWinAction(
        props.buttonId,
        newWagerStr,
        newWagerInteger,
        newWinStr,
        newWinInteger
      )
    );
  };

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
    if (
      isWagerOrWinSet &&
      determinedWagerInteger !== wagerInteger &&
      determinedWinInteger !== winInteger
    ) {
      setWagerAndWin(
        wagerStr,
        wagerInteger,
        convertToPriceString(determinedWinInteger),
        determinedWinInteger
      );
    }
  });

  return (
    <div className="flex min-h-fit min-w-fit py-3 pr-9">
      <TrashIcon
        className="mx-2 mt-2 h-7 w-7 cursor-pointer"
        onClick={() => dispatch(deleteBetsAction([props.buttonId]))}
      />
      <div className="w-full rounded-2xl bg-skin-overlay p-3 text-skin-body shadow-lg drop-shadow-md">
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
          <div className="mr-2 w-1/12 text-right">
            <h1 className="h-full pt-4 pb-4">{getDisplayStr(line)}</h1>
          </div>
        </div>

        {/* Wager input */}
        <div className="mt-2 flex h-14 w-full">
          <div className="mr-1 w-1/2 rounded-lg border border-skin-input  p-1 text-sm">
            <label className="block font-bold uppercase tracking-wide text-skin-body">
              Wager
            </label>
            <div className="inline-flex w-full font-bold text-skin-body">
              <span className="">$</span>
              <input
                className="block w-full appearance-none bg-transparent leading-tight focus:outline-none"
                type="text"
                onChange={(evt) =>
                  validateAndChangeWager(evt, setWagerAndWin, line)
                }
                value={wagerStr}
              />
            </div>
          </div>

          {/* Win input */}
          <div className="ml-1 w-1/2 rounded-lg border border-skin-input p-1 text-sm">
            <label className="block font-bold uppercase tracking-wide  text-skin-body ">
              To Win
            </label>
            <div className="inline-flex w-full font-bold text-skin-body">
              <span className="">$</span>
              <input
                className="block w-full appearance-none bg-transparent leading-tight focus:outline-none"
                type="text"
                onChange={(evt) =>
                  validateAndChangeWin(evt, setWagerAndWin, line)
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

function PopulatedBetslip(toggledBetsArray) {
  return toggledBetsArray.map(([buttonId, toggledBet]) => {
    const bet = toggledBet.betInfo;
    return <ToggledBet key={buttonId} bet={bet} buttonId={buttonId} />;
  });
}

function UnpopulatedBetslip() {
  return (
    <div className=" w-full pt-28">
      <h1 className=" text-center text-2xl text-skin-overlay">
        You have no current bets.
      </h1>
    </div>
  );
}

export default function Betslip(props) {
  const toggledBets = parseMap(useSelector((state) => state.toggledBets));
  const toggledBetsArray = Array.from(toggledBets);
  const dispatch = useDispatch();

  //if this betslip is rendering as a sportpane,
  if (props.isSportPane) {
    dispatch(changeSportpaneAction(BottomNavbarItems[2].href));
    dispatch(changeNavbarTabAction(BottomNavbarItems[2].href));
  }

  return (
    <div>
      <div
        className={`${
          props.isSportPane
            ? "h-[calc(100vh-10rem)] overflow-y-auto lg:h-full"
            : "h-[calc(100vh-13.75rem)] overflow-y-auto"
        }`}
      >
        {toggledBetsArray.length !== 0
          ? PopulatedBetslip(toggledBetsArray)
          : UnpopulatedBetslip()}
      </div>

      {/* hide the submission button if it's the sports pane and if the screen is non-mobile, as there is already a submission on the right side */}
      <div className={`contents ${props.isSportPane ? "lg:hidden" : ""}`}>
        <div
          className={`sticky ${
            props.isSportPane ? "bottom-16" : "bottom-0"
          } h-[6rem] w-full border-t-2 border-gray-300`}
        >
          {" "}
          {/* bottom-16 so it stays above BottomNavbar */}
          <BetslipSubmission />
        </div>
      </div>
    </div>
  );
}
