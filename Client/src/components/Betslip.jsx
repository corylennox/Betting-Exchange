import React, { useState } from "react";
import ContenderAndIcon from "./ContenderAndIcon";
import { useSelector, useDispatch } from "react-redux";
import { deleteBetAction, setWagerAction } from "../Actions";
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

function validateAndChangeWager(evt, setWager, setWinStr, line) {
  const newWagerStr = evt.target.value;
  if (isValidWagerOrWin(newWagerStr)) {
    const newWagerInteger = convertToIntegerScale(newWagerStr);
    setWager(newWagerStr, newWagerInteger);
    const newWinStr = convertToPriceString(determineWin(line, newWagerInteger));
    setWinStr(newWinStr);
  }
}

function validateAndChangeWin(evt, setWager, setWinStr, line) {
  const newWinStr = evt.target.value;
  if (isValidWagerOrWin(newWinStr)) {
    const newWinInteger = convertToIntegerScale(newWinStr);
    setWinStr(newWinStr);
    const newWagerInteger = determineWager(line, newWinInteger);
    const newWagerStr = convertToPriceString(newWagerInteger);
    setWager(newWagerStr, newWagerInteger);
  }
}

function ToggledBet(props) {
  const dispatch = useDispatch();
  const toggledBets = parseMap(useSelector((state) => state.toggledBets));
  const wagerStr = toggledBets.get(props.buttonId).wagerStr;
  const [winStr, setWinStr] = useState("");

  return (
    <div className="flex min-h-fit min-w-fit py-3 pr-9">
      <img
        alt="remove icon"
        className="w-7 h-7 mx-2 mt-2 cursor-pointer"
        src="res/remove.png"
        onClick={() => dispatch(deleteBetAction(props.buttonId))}
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
              {getDisplayStr(props.bet.line)}
            </h1>
          </div>
        </div>

        {/* Wager input */}
        <div className="flex w-full h-14 mt-2">
          <div className="w-1/2 mr-1 border border-skin-input rounded-lg  p-1 text-sm">
            <label class="block uppercase tracking-wide text-skin-body font-bold">
              Wager
            </label>
            <div className="inline-flex font-bold text-skin-body">
              <span className="">$</span>
              <input
                class="appearance-none block bg-transparent w-full leading-tight focus:outline-none"
                type="text"
                onChange={(evt) =>
                  validateAndChangeWager(
                    evt,
                    (newWagerStr, newWagerInteger) =>
                      dispatch(
                        setWagerAction(
                          props.buttonId,
                          newWagerStr,
                          newWagerInteger
                        )
                      ),
                    setWinStr,
                    props.bet.line
                  )
                }
                value={wagerStr}
              />
            </div>
          </div>

          {/* Win input */}
          <div className="w-1/2 ml-1 border border-skin-input rounded-lg p-1 text-sm">
            <label class="block uppercase tracking-wide text-skin-body  font-bold ">
              To Win
            </label>
            <div className="inline-flex font-bold text-skin-body">
              <span className="">$</span>
              <input
                class="appearance-none block bg-transparent w-full leading-tight focus:outline-none"
                type="text"
                onChange={(evt) =>
                  validateAndChangeWin(
                    evt,
                    (newWagerStr, newWagerInteger) =>
                      dispatch(
                        setWagerAction(
                          props.buttonId,
                          newWagerStr,
                          newWagerInteger
                        )
                      ),
                    setWinStr,
                    props.bet.line
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
        <h1 className=" text-skin-accent text-center text-2xl">
          You have no current bets.
        </h1>
      </div>
    );
  }
}
