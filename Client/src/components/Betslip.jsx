import React, { useState } from "react";
import ContenderAndIcon from "./ContenderAndIcon";
import { useSelector, useDispatch } from "react-redux";
import { deleteBetAction, setWagerAction } from "../Redux/Actions";
import { parseMap } from "../utils";
import { getDisplayStr } from "../utils";
import { determineWager, determineWin } from 'BettingExchangeCommon/wagerWinUtils'

/**
 * In order to prevent floating point errors, we want to store integers rather than floats.
 * So, any price like $53.48 is stored as an integer 5348.
 */
function wagerScale() {
  return 2;
}

function isValidWagerOrWin(newVal) {
  let foundDecimal = false

  // Make sure each item is either a digit or a "."
  for (let i = 0; i < newVal.length; i++) {
    const c = newVal[i]
    console.log(newVal);
    if ((c < '0' || c > '9') && c != '.')
    {
      console.log("invalid");
      return false;
    }

    if (c == '.')
    {
      // If there's more than one '.', it's not valid
      if (foundDecimal)
      {
        console.log("invalid2")
        return false
      }

      // It's not valid if there are more than 2 numbers after the decimal
      if (newVal.length - i > wagerScale() + 1)
      {
        console.log("invalid3")
        return false;
      }

      foundDecimal = true
    }
  }

  console.log("valid");
  return true;
}

// Assumes that the wagerOrWin is a string is already verified to be wagerScale() digits maximum
function convertToIntegerScale(wagerOrWin) {
  console.assert(isValidWagerOrWin(wagerOrWin), "wagerOrWin '" + wagerOrWin + "' was not validated prior to calling convertToIntegerScale()");

  let retVal = 0;
  let decimalInd = -1;
  for(let i = 0; i < wagerOrWin.length; i++)
  {
    const c = wagerOrWin[i];
    if (c == '.')
    {
      decimalInd = i;
      continue;
    }

    retVal *= 10;
    retVal += c - '0';
  }

  // if the wagerOrWin is "43" or "43.4", we need to multiply the integer by 100 or 10, respectively to include final decimal
  if (decimalInd != -1)
    retVal *= Math.pow(10, wagerScale() - (wagerOrWin.length - 1 - decimalInd));
  else
    retVal *= Math.pow(10, wagerScale());
  return retVal;
}

function convertToPriceString(wagerOrWin) {
  let result = wagerOrWin.toString();

  // Add decimal to the pennies
  if (result.length > wagerScale()) {
    return result.substring(0, result.length - wagerScale())
      + '.'
      + result.substring(result.length - wagerScale())
  }

  // Add on '0's to fill out any pennies that are not specified
  while (result.length < wagerScale())
    result = '0' + result;
  result = "0." + result;
  return result;
}

function validateAndChangeWager(evt, setWager, setWinStr, line) {
  const newWagerStr = evt.target.value
  if (isValidWagerOrWin(newWagerStr))
  {
    const newWagerInteger = convertToIntegerScale(newWagerStr)
    console.log(newWagerInteger)
    setWager(newWagerStr, newWagerInteger)
    const newWinStr = convertToPriceString(determineWin(line, newWagerInteger))
    setWinStr(newWinStr)
  }
}

function validateAndChangeWin(evt, setWager, setWinStr, line) {
  const newWinStr = evt.target.value
  if (isValidWagerOrWin(newWinStr))
  {
    const newWinInteger = convertToIntegerScale(newWinStr)
    console.log(newWinInteger)
    setWinStr(newWinStr)
    console.log(newWinStr)
    console.log("line: " + JSON.stringify(line))
    const newWagerInteger = determineWager(line, newWinInteger)
    console.log("newWagerInteger: " + newWagerInteger)
    const newWagerStr = convertToPriceString(newWagerInteger)
    console.log("newWagerStr: " + newWagerStr)
    setWager(newWagerStr, newWagerInteger)
  }
}

function ToggledBet(props) {
  const dispatch = useDispatch();
  const toggledBets = parseMap(useSelector((state) => state.toggledBets));
  const wagerStr = toggledBets.get(props.buttonId).wagerStr;
  const [winStr, setWinStr] = useState("");

  return (
    <div className="flex min-h-fit min-w-fit pt-4 pr-9">
      <img
        alt="remove icon"
        className="w-7 h-7 mx-2 mt-2 cursor-pointer"
        src="res/remove.png"
        onClick={() => dispatch(deleteBetAction(props.buttonId))}
      />
      <div className="bg-slate-500 text-slate-50 rounded-2xl p-3 drop-shadow-md shadow-lg w-full">
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
            <h1 className="pt-4 pb-4 h-full">{getDisplayStr(props.bet.line)}</h1>
          </div>
        </div>

        {/* Wager input */}
        <div className="flex w-full h-14 mt-2">
          <div className="w-1/2 mr-1 border rounded-lg  p-1 text-sm">
            <label class="block uppercase tracking-wide text-gray-700  font-bold ">
              Wager
            </label>
            <div className="inline-flex text-gray-700 font-bold ">
              <span className="">$</span>
              <input
                class="appearance-none block bg-transparent w-full text-gray-700 
                  leading-tight focus:outline-none"
                type="text"
                onChange={(evt) =>
                  validateAndChangeWager(evt,
                    (newWagerStr, newWagerInteger) => dispatch(setWagerAction(props.buttonId, newWagerStr, newWagerInteger)),
                    setWinStr, props.bet.line)
                }
                value={wagerStr}
              />
            </div>
          </div>

          {/* Win input */}
          <div className="w-1/2 ml-1 border rounded-lg p-1 text-sm">
            <label class="block uppercase tracking-wide text-gray-700  font-bold ">
              To Win
            </label>
            <div className="inline-flex text-gray-700 font-bold ">
              <span className="">$</span>
              <input
                class="appearance-none block bg-transparent w-full text-gray-700 
                  leading-tight focus:outline-none"
                type="text"
                onChange={(evt) =>
                  validateAndChangeWin(evt,
                    (newWagerStr, newWagerInteger) => dispatch(setWagerAction(props.buttonId, newWagerStr, newWagerInteger)),
                    setWinStr, props.bet.line)
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

export default function Betslip() {
  const toggledBets = parseMap(useSelector((state) => state.toggledBets));
  const toggledBetsArray = Array.from(toggledBets);

  if (toggledBetsArray.length !== 0) {
    return toggledBetsArray.map(([buttonId, toggledBet]) => {
      const bet = toggledBet.betInfo;
      return <ToggledBet bet={bet} buttonId={buttonId} />;
    });
  } else {
    return (
      <div className=" w-full pt-28">
        <h1 className=" text-slate-800 text-center text-2xl">
          You have no current bets.
        </h1>
      </div>
    );
  }
}
