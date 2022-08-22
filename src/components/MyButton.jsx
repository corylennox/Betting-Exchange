import React from 'react';

export default class MyButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false,
      offCSS: "w-16  bg-transparent hover:bg-gray-200 text-blue-600 font-semibold hover:text-blue-800 py-2 px-4 border border-blue-600 rounded placeholder-shown:bg-red-500",
      onCSS: " w-16  bg-blue-600 text-white font-semibold py-2 px-4 border border-gray-800 border rounded placeholder-shown:bg-red-500"
    };

    this.moneyline = this.props.moneyline;

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick} className={this.state.isToggleOn ? this.state.onCSS : this.state.offCSS}>
        {this.moneyline}
      </button>
    );
  }
}