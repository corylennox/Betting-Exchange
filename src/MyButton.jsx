import React from 'react';

export default class MyButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false,
      offCSS: "bg-transparent hover:bg-gray-200 text-blue-600 font-semibold hover:text-blue-800 py-2 px-4 border border-blue-600 rounded placeholder-shown:bg-red-500",
      onCSS: "bg-blue-600 text-white font-semibold py-2 px-4 border border-blue-600 rounded placeholder-shown:bg-red-500"
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));

  }

  render() {
    return (
      <button onClick={this.handleClick} class={this.state.isToggleOn ? this.state.onCSS : this.state.offCSS}>
        test
      </button>
    );
  }
}