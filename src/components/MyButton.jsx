import React from "react";

export default class MyButton extends React.Component {
  constructor(props) {
    super(props);

    this.onCSS =
      "w-16 bg-blue-600 text-white font-semibold border border-gray-800 border rounded placeholder-shown:bg-red-500";
    this.offCSS =
      "w-16 bg-transparent hover:bg-gray-200 text-blue-600 font-semibold hover:text-blue-800 border border-blue-600 rounded placeholder-shown:bg-red-500";

    this.state = {
      isToggleOn: false,
    };

    this.betInfo = {
      moneyline: this.props.moneyline,
      contender: this.props.contender,
      type: this.props.type,
      title: this.props.title,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      isToggleOn: !this.state.isToggleOn,
    });

    this.props.onMoneylineClick(!this.state.isToggleOn, this.betInfo);
  }

  render() {
    return (
      <button
        onClick={this.onClick}
        className={this.state.isToggleOn ? this.onCSS : this.offCSS}
      >
        {this.props.moneyline}
      </button>
    );
  }
}
