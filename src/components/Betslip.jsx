import React, { Component } from "react";

export default class Betslip extends Component {
  constructor(props) {
    super(props);
    this.test = this.test.bind(this);
  }

  test() {
    // if (this.props.activeBets.length === 0) return "empty";
    // else return this.props.activeBets[0].moneyline;

    return this.props.activeBets.map((bet) => (
      <div>
        <h1>{bet.moneyline}</h1>
      </div>
    )
    )
  }
  // handleClick() {
  //   this.setState({
  //     hasBets: !this.hasBets,
  //   });
  // }

  // this.betInfo = {
  //   moneyline: this.props.moneyline,
  //   contender: this.props.contender,
  //   type: this.props.type,
  //   title: this.props.title,
  // };

  render() {
    // this.props.bets.map((bet) => (
    //   <div>
    //     <h1>{bet.moneyline}</h1>
    //   </div>
    // ));
    return <h1>{this.test()}</h1>;
  }
}
