import React, { Component } from "react";
import MyButton from "./MyButton";

class OutrightBetContenderRow extends React.Component {
  constructor(props) {
    super(props);
    //this code randomly generates a an int between -1000 and +1000
    this.randMoneyline = (Math.random() < 0.5 ? -1 : 1) * (Math.ceil((Math.random() * 1000) / 10) * 10);
    this.randMoneylineStr = "";
    if (this.randMoneyline < 0) {
      this.randMoneylineStr = this.randMoneyline.toString();
    }
    else {
      this.randMoneylineStr = "+".concat(this.randMoneyline.toString());
    }

  }
  render() {
    return (
      <div className='w-full flex justify-center h-12'>
        {this.props.contenderData}
        <div className='w-auto flex justify-end'>
          <MyButton moneyline={this.randMoneylineStr} />
        </div>
      </div>
    )
  }
}

export default class OutrightBet extends Component {
  constructor(props) {
    super(props);

    this.rowsArr = this.props.outrightBetData.contendersData.map((contenderData) => (
      <OutrightBetContenderRow contenderData={contenderData} />
    ));
  }

  render() {
    return (
      <div className='bg-slate-100 rounded-2xl p-3 drop-shadow-md shadow-lg mb-3'>
        <h2 className="flex font-semibold text-blue-900 text-xl">{this.props.outrightBetData.title}</h2>
        <h3 className=" pb-2 font-semibold text-slate-900 text-md">Outright Bet</h3>
        <div class="grid md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2">
          {
            //NOT SORTING for some reason smh
            this.rowsArr.sort(function (a, b) { return a.randMoneyline - b.randMoneyline })
          }
        </div>
      </div>
    );
  }
}
