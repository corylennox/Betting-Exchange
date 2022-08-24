import React, { Component } from "react";
import MyButton from "./MyButton";
import TeamAndOptionalLogo from "./TeamAndOptionalLogo";

class GameBetContestantRow extends Component {
  render() {
    return (
      <div class="flex">
        <div class="w-2/5 flex justify-left">
          <TeamAndOptionalLogo image={this.props.contestantData.image} name={this.props.contestantData.name} />
        </div>
        <div class="w-1/5 flex justify-center">
          <MyButton moneyline={this.props.contestantData.spread} />
        </div>
        <div class="w-1/5 flex justify-center">
          <MyButton moneyline={this.props.contestantData.money} />
        </div>
        <div class="w-1/5 flex justify-center">
          <MyButton moneyline={this.props.contestantData.total} />
        </div>
      </div>
    );
  }
}

export default class GameBet extends Component {
  render() {
    return (
      <div className='bg-slate-100 rounded-2xl p-3 drop-shadow-md shadow-lg mb-3'>
        <h2 className="flex font-semibold text-blue-900 text-xl">{this.props.gameData.title}</h2>
        <div class="flex">
          <h3 className="w-2/5 pb-2 font-semibold text-slate-900 text-md">Game Bet</h3>
          <div class="flex w-1/5 justify-center">
            <body>Spread</body>
          </div>
          <div class="flex w-1/5 justify-center">
            <body>Money</body>
          </div>
          <div class="flex w-1/5 justify-center">
            <body>Total</body>
          </div>
        </div>
        <GameBetContestantRow contestantData={this.props.gameData.contestantData1} />
        <GameBetContestantRow contestantData={this.props.gameData.contestantData2} />
      </div>
    );
  }
}
