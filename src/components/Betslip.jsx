import React, { Component } from "react";

export default class Betslip extends Component {
  constructor(props) {
    super(props);
    this.test = this.test.bind(this);
  }

    // this.props.activeBets = {
  //   moneyline: this.props.moneyline,
  //   contender: this.props.contender,
  //   type: this.props.type,
  //   title: this.props.title,
  // };

  test() {
    return this.props.activeBets.map((bet) => (
      <div>
        <h1>{bet.moneyline}</h1>
      </div>
    )
    )
  }

  render() {
    // this.props.bets.map((bet) => (
    //   <div>
    //     <h1>{bet.moneyline}</h1>
    //   </div>
    // ));
    return <h1>{this.test()}</h1>;
  }
}
