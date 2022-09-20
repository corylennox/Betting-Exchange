import React, { useState } from "react";
import ContenderAndIcon from "./ContenderAndIcon";
import { useSelector, useDispatch } from "react-redux";
import { deleteBetAction } from "../Redux/Actions";
import { parseMap } from "../utils";

function onWagerChange(evt, setWin, setWager, line) {
  setWin((evt.target.value * parseInt(line, 10)) / 100); //this math is wrong idk american odds ¯\_(ツ)_/¯
  setWager(evt.target.value);
}

function onWinChange(evt, setWin, setWager, line) {
  setWin(evt.target.value);
  setWager((evt.target.value / parseInt(line, 10)) * 100); //this math is wrong idk american odds ¯\_(ツ)_/¯
}

function ToggledBet(props) {
  const dispatch = useDispatch();
  const [wager, setWager] = useState(0);
  const [win, setWin] = useState(0);

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
            <h1 className="pt-4 pb-4 h-full">{props.bet.line}</h1>
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
                  onWagerChange(evt, setWin, setWager, props.bet.line)
                }
                value={wager}
              />
            </div>
          </div>

          {/* Win input */}
          <div className="w-1/2 ml-1 border rounded-lg p-1 text-sm">
            <label class="block uppercase tracking-wide text-gray-700  font-bold ">
              Win
            </label>
            <div className="inline-flex text-gray-700 font-bold ">
              <span className="">$</span>
              <input
                class="appearance-none block bg-transparent w-full text-gray-700 
                  leading-tight focus:outline-none"
                type="text"
                onChange={(evt) =>
                  onWinChange(evt, setWin, setWager, props.bet.line)
                }
                value={win}
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
