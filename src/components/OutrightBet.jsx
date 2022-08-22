import React, { Component } from "react";
import ContestantRow from "./ContestantRow";

export default class OutrightBet extends Component {
  constructor(props) {
    super(props);

    this.title = props.title;

    this.contestantRows = this.props.contestantsData.map((contestandData) => (
      <div class="mb-2 h-12">
        <ContestantRow contestandData={contestandData} />
      </div>
    ));
  }

  render() {
    return (
      <div className='bg-slate-100 rounded-2xl p-3 drop-shadow-md shadow-lg mb-3'>
        <h2 className="flex font-semibold text-blue-900 text-xl">{this.title}</h2>
        <h3 className=" pb-2 font-semibold text-slate-900 text-md">Outright Bet</h3>
        <div class="grid grid-cols-2 gap-2">
          {this.contestantRows}
        </div>
      </div>
    );
  }
}
