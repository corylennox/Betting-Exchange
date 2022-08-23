import React, { Component } from 'react'
import { BetData } from '../data';
import OutrightBet from "./OutrightBet";

export default class Basketball extends Component {
    render() {
        return (
            <div className="h-full bg-slate-200 pl-8 pt-4 pr-8">
                <h1 className='mb-3 font-semibold font-sans text-2xl text-slate-900'>Basketball</h1>
                {BetData.map((betData) => (
                    <div>
                        <OutrightBet title={betData.title} contestantsData={betData.contestantsData} />
                    </div>
                ))}
            </div>
        );
    }
}


