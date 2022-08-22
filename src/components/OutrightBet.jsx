import React, { Component } from "react";
import ContestantRow from "./ContestantRow";

export default class OutrightBet extends Component {
  constructor(props) {
    super(props);

    this.betName = props.betName;

    this.contestantRows = this.props.contestantsData.map((contestandData) => (
      <div class="mb-4 bg-gray-400 h-12">
        <ContestantRow contestandData={contestandData} />
      </div>
    ));

  }


  render() {
    return (
      <div className="h-full w-full border-2 border-red-600">
        <h2 className="text-white text-xl">{this.betName}</h2>
        <div class="grid grid-cols-3 mb-4 border-2 border-green-600">

          {this.contestantRows}



        </div>
      </div>
    );
  }
}
