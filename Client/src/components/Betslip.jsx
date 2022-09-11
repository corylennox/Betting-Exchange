import React, { Component } from "react";
import ContenderAndIcon from "./ContenderAndIcon";

export default class Betslip extends Component {
  constructor(props) {
    super(props);
    this.displayBets = this.displayBets.bind(this);
  }

  // this.props.activeBets = {
  //   line: this.props.moneyline,
  //   contender: this.props.contender,
  //   type: this.props.type,
  //   title: this.props.title,
  // };

  displayBets() {
    if (this.props.activeBets.length !== 0) {
      return this.props.activeBets.map((bet) => (
        <div className="flex min-h-fit min-w-fit pt-4 pr-9">
          <img
            alt="remove icon"
            className="w-7 h-7 mx-2 mt-2"
            src="res/remove.png"
          />
          <div className="bg-slate-500 text-slate-50 rounded-2xl p-3 drop-shadow-md shadow-lg w-full">
            <div className="inline-flex w-full ">
              <div className=" w-11/12">
                <h1><ContenderAndIcon name={bet.contenderName} image={bet.contenderImage} /></h1>
                <h1>{bet.title + " - " + bet.type.charAt(0).toUpperCase() + bet.type.slice(1)}</h1>
              </div>
              <div className="w-1/12 text-right mr-2">
                <h1 className="pt-4 pb-4 h-full">{bet.line}</h1>
              </div>
            </div>

            <div className="flex w-full h-14 mt-2">
              <div className="w-1/2 mr-1 border rounded-lg  p-1 text-sm">
                <label class="block uppercase tracking-wide text-gray-700  font-bold ">Wager</label>
                <div className="inline-flex text-gray-700 font-bold ">
                  <span className="">$</span>
                  <input class="appearance-none block bg-transparent w-full text-gray-700 
                  leading-tight focus:outline-none" id="Wager" type="text"/>
                </div>
              </div>
              <div className="w-1/2 ml-1 border rounded-lg p-1 text-sm">
                <label class="block uppercase tracking-wide text-gray-700  font-bold ">Win</label>
                <div className="inline-flex text-gray-700 font-bold ">
                  <span className="">$</span>
                  <input class="appearance-none block bg-transparent w-full text-gray-700 
                  leading-tight focus:outline-none" id="Wager" type="text"/>
                </div>
              </div>
            </div>

            <div>
              <h1>ButtonId:{bet.buttonId}</h1>
            </div>





          </div>
        </div>
      ));
    } else {
      return (
        <div>
          <h1 className=" text-6xl text-center">
            Click some bets you degenerate!
          </h1>
        </div>
      );
    }
  }

  render() {
    return <div>{this.displayBets()}</div>;
  }
}
