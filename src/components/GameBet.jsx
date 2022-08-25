import React, { Component } from "react";
import MyButton from "./MyButton";
import TeamAndOptionalLogo from "./TeamAndOptionalLogo";

class GameBetContenderRow extends Component {
  render() {
    return (
      <div class="flex">
        <div class="w-2/5 flex justify-left">
          <TeamAndOptionalLogo image={this.props.contenderData.image} name={this.props.contenderData.name} />
        </div>
        <div class="w-1/5 flex justify-center">
          <MyButton moneyline={this.props.contenderData.spread} />
        </div>
        <div class="w-1/5 flex justify-center">
          <MyButton moneyline={this.props.contenderData.money} />
        </div>
        <div class="w-1/5 flex justify-center">
          <MyButton moneyline={this.props.contenderData.total} />
        </div>
      </div>
    );
  }
}

export default class GameBet extends Component {
  render() {
    return (
      <div className='bg-slate-100 rounded-2xl p-3 drop-shadow-md shadow-lg mb-3'>
        <h2 className="flex font-semibold text-blue-900 text-xl">{this.props.betData.title}</h2>
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
        <GameBetContenderRow contenderData={this.props.betData.contender1Data} />
        <GameBetContenderRow contenderData={this.props.betData.contender2Data} />
      </div>
    );
  }
}
