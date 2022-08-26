import React, { Component } from "react";
import MyButton from "./MyButton";

class GameBetContenderRow extends Component {
  render() {
    return (
      <div class="flex mb-2 h-10" >
        {/* <div class="w-2/5 flex justify-left">
          {this.props.contenderData.contender}
        </div>
        <div class="w-1/5 flex justify-center">
          <MyButton moneyline={this.props.contenderData.spread} />
        </div>
        <div class="w-1/5 flex justify-center">
          <MyButton moneyline={this.props.contenderData.money} />
        </div>
        <div class="w-1/5 flex justify-center">
          <MyButton moneyline={this.props.contenderData.total} />
        </div> */}

        <div class="w-full grid grid-cols-5">
          <div class=" col-span-2"> {this.props.contenderData.contender}</div>
          <div class="flex justify-center"><MyButton moneyline={this.props.contenderData.spread} /></div>
          <div class="flex justify-center"><MyButton moneyline={this.props.contenderData.money} /></div>
          <div class="flex justify-center"><MyButton moneyline={this.props.contenderData.total} /></div>
        </div>
      </div>
    );
  }
}

export default class GameBet extends Component {
  render() {
    return (
      <div className='bg-slate-100 rounded-2xl p-3 drop-shadow-md shadow-lg mb-3'>
        <h2 className="flex font-semibold text-blue-900 text-xl">{this.props.gameBetData.title}</h2>
        <div class="w-full grid grid-cols-5 mb-2">
          <h3 className="col-span-2 font-semibold text-slate-900 text-md">Game Bet</h3>
          <div class="flex justify-center text-slate-500"><body>Spread</body></div>
          <div class="flex justify-center text-slate-500"><body>Money</body></div>
          <div class="flex justify-center text-slate-500"><body>Total</body></div>
        </div>
        <GameBetContenderRow contenderData={this.props.gameBetData.contender1Data} />
        <GameBetContenderRow contenderData={this.props.gameBetData.contender2Data} />
      </div>
    );
  }
}
