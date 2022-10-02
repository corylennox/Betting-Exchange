import React, { Component } from "react";
import MyButton from "./MyButton";
import ContenderAndIcon from "./ContenderAndIcon";

class GameBetContenderRow extends Component {
  render() {
    return (
      <div>
        <div className="w-full mb-2 grid grid-cols-5 align-center ">
          <div className="flex h-10 justfiy-left col-span-2 ">
            <ContenderAndIcon name={this.props.contenderData.name} image={this.props.contenderData.image} />
          </div>
          <div className="flex h-10 justify-center">
            <MyButton
              line={this.props.contenderData.spread}
              contenderName={this.props.contenderData.name}
              contenderImage={this.props.contenderData.image}
              buttonId={this.props.contenderData.spreadButtonId}
              type={this.props.type}
              title={this.props.title}
            />
          </div>
          <div className="flex h-10 justify-center">
            <MyButton
              line={this.props.contenderData.money}
              contenderName={this.props.contenderData.name}
              contenderImage={this.props.contenderData.image}
              buttonId={this.props.contenderData.moneyButtonId}
              type={this.props.type}
              title={this.props.title}
            />
          </div>
          <div className="flex h-10 justify-center">
            <MyButton
              line={this.props.contenderData.total}
              contenderName={this.props.contenderData.name}
              contenderImage={this.props.contenderData.image}
              buttonId={this.props.contenderData.totalButtonId}
              type={this.props.type}
              title={this.props.title}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default class GameBet extends Component {
  render() {
    return (
      <div className="bg-white rounded-2xl p-3 drop-shadow-md shadow-lg mb-3">
        <h2 className="flex font-semibold text-blue-900 text-xl">
          {this.props.gameBetData.betTitle}
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
          type={this.props.gameBetData.type}
          title={this.props.gameBetData.betTitle}
        />
        <GameBetContenderRow
          contenderData={this.props.gameBetData.contender2Data}
          type={this.props.gameBetData.type}
          title={this.props.gameBetData.betTitle}
        />
      </div>
    );
  }
}
