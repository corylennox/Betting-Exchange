import React, { Component } from 'react'
import { BetData } from '../betData';
import OutrightBet from "./OutrightBet";
import GameBet from "./GameBet";

const betData = BetData[0];


export default class SportPane extends Component {
    render() {
        return (
            <div className="h-full bg-slate-100 pl-8 pt-4 pr-8">
                <h1 className='mb-3 font-semibold font-sans text-2xl text-slate-900'>{betData.sport}</h1>
                {betData.availableBets.map((bet) => {
                    switch (bet.type) {
                        case "outright":
                            return <div> <OutrightBet outrightBetData={bet} /> </div>;
                        case "game":
                            return <div> <GameBet gameBetData={bet} /> </div>;
                        default:
                            return <></>;
                    }
                })}
            </div>
        );
    }
}
