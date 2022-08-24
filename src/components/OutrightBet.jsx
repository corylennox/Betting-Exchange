import React, { Component } from "react";
import ContestantRow from "./ContestantRow";

export default class OutrightBet extends Component {
  constructor(props) {
    super(props);
    this.props.contestantsData.sort(function (a, b) { return a.moneyline - b.moneyline })
  }

  render() {
    return (
      <div className='bg-slate-100 rounded-2xl p-3 drop-shadow-md shadow-lg mb-3'>
        <h2 className="flex font-semibold text-blue-900 text-xl">{this.props.title}</h2>
        <h3 className=" pb-2 font-semibold text-slate-900 text-md">Outright Bet</h3>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6">
          {//print rows
            this.props.contestantsData.map((contestantData) => (
              <ContestantRow contestantData={contestantData} />
            ))
          }
        </div>
      </div>
    );
  }
}
