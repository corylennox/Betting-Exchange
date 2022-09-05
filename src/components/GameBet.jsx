import React, { Component } from "react";
import MyButton from "./MyButton";

class GameBetContenderRow extends Component {
  render() {
    return (
      <div>
        <div className="w-full mb-2 grid grid-cols-5 align-center ">
          <div className="flex h-10 justfiy-left col-span-2 ">
            {" "}
            {this.props.contenderData.contender}
          </div>
          <div className="flex h-10 justify-center">
            <MyButton moneyline={this.props.contenderData.spread} />
          </div>
          <div className="flex h-10 justify-center">
            <MyButton moneyline={this.props.contenderData.money} />
          </div>
          <div className="flex h-10 justify-center">
            <MyButton moneyline={this.props.contenderData.total} />
          </div>
        </div>
      </div>
    );
  }
}

export default class GameBet extends Component {
  render() {
    return (
      <div className="bg-slate-100 rounded-2xl p-3 drop-shadow-md shadow-lg mb-3">
        <h2 className="flex font-semibold text-blue-900 text-xl">
          {this.props.gameBetData.title}
        </h2>
        <div className="w-full grid grid-cols-5 mb-2">
          <h3 className="col-span-2 font-semibold text-slate-900 text-md">
            Game Bet
          </h3>
          <div className="flex justify-center text-slate-500">
            <p>Spread</p>
          </div>
          <div className="flex justify-center text-slate-500">
            <p>Money</p>
          </div>
          <div className="flex justify-center text-slate-500">
            <p>Total</p>
          </div>
        </div>
        <GameBetContenderRow
          contenderData={this.props.gameBetData.contender1Data}
        />
        <GameBetContenderRow
          contenderData={this.props.gameBetData.contender2Data}
        />
      </div>
    );
  }
}
