import React, { Component } from "react";

export default class Betslip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasBets: false,
    
    }

    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(props) {
    this.setState({
      hasBets: !this.hasBets,
    });


  }

  render() {
    return (
      <div class="">
          <h1>Betslip</h1>
      </div>
    );
  }
}
