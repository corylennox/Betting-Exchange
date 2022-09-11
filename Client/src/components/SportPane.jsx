import React, { Component } from "react";
import OutrightBet from "./OutrightBet";
import GameBet from "./GameBet";

export default class SportPane extends Component {
  constructor(props) {
    super(props);

    this.renderBets = this.renderBets.bind(this);
  }

  renderBets() {
    return (this.props.betData.tabs.map((tab) => { return (
      tab.availableBets.map((bet) => { 
       switch (bet.type) {
          case "outright":
            return (
              <div>
                <OutrightBet
                  outrightBetData={bet}
                  tabTitle={tab.tabTitle}
                />
              </div>
            );
          case "game":
            return (
              <div>
                <GameBet
                  gameBetData={bet}
                  tabTitle={tab.tabTitle}
                />
              </div>
            );
          default:
            return <></>;
        }
      })
    )}));
  }

  render() {
    return (
      <div className="h-full min-w-fit bg-slate-100 pl-8 pt-4 pr-8">
        <h1 className="mb-3 font-semibold font-sans text-2xl text-slate-900">
          {this.props.betData.sportTitle}
        </h1>
        {this.renderBets()}
      </div>
    );
  }
}
