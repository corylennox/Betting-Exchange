import React, { Component } from "react";

export default class Betslip extends Component {
  constructor(props) {
    super(props);
    this.test = this.test.bind(this);
  }

  // this.props.activeBets = {
  //   line: this.props.moneyline,
  //   contender: this.props.contender,
  //   type: this.props.type,
  //   title: this.props.title,
  // };

  test() {
    if (this.props.activeBets.length !== 0) {
      return this.props.activeBets.map((bet) => (
        <div className="h-full min-w-fit pl-8 pt-4 pr-8">
          <div className="bg-slate-500 text-slate-50 rounded-2xl p-3 drop-shadow-md shadow-lg mb-3">
            <h1>{bet.line}</h1>
            <h1>{bet.contender}</h1>
            <h1>{bet.type}</h1>
            <h1>{bet.title}</h1>
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
    return <div>{this.test()}</div>;
  }
}
