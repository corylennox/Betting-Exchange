import React, { Component } from "react";
import MyButton from "./MyButton";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/solid";

class OutrightBetContenderRow extends React.Component {
  constructor(props) {
    super(props);

    //this code randomly generates a an int between -1000 and +1000
    this.randMoneyline =
      (Math.random() < 0.5 ? -1 : 1) *
      (Math.ceil((Math.random() * 1000) / 10) * 10);
    this.randMoneylineStr = "";
    if (this.randMoneyline < 0) {
      this.randMoneylineStr = this.randMoneyline.toString();
    } else {
      this.randMoneylineStr = "+".concat(this.randMoneyline.toString());
    }
  }

  render() {
    return (
      <div className="w-full flex justify-center h-12">
        {this.props.contenderData}
        <div className="w-auto flex justify-end">
          <MyButton moneyline={this.randMoneylineStr} />
        </div>
      </div>
    );
  }
}

export default class OutrightBet extends Component {
  constructor(props) {
    super(props);

    this.showMoreText = "Show more";
    this.showLessText = "Show less";
    this.downIcon = <ArrowDownIcon className="w-5 h-5 ml-2 fill-slate-900" />;
    this.upIcon = <ArrowUpIcon className="w-5 h-5 ml-2 fill-slate-900" />;

    this.state = {
      isExpanded: false,
      showText: this.showMoreText,
      arrowIcon: this.downIcon,
    };

    this.showMore = this.showMore.bind(this);
    this.displayRows = this.showMore.bind(this);
  }

  showMore() {
    this.setState((prevState) => ({
      isExpanded: !prevState.isExpanded,
      showText:
        prevState.showText === this.showMoreText
          ? this.showLessText
          : this.showMoreText,
      arrowIcon:
        prevState.arrowIcon === this.downIcon ? this.upIcon : this.downIcon,
    }));
  }

  displayRows() {}

  render() {
    return (
      <div className="bg-slate-100 rounded-2xl p-3 drop-shadow-md shadow-lg mb-3">
        <h2 className="flex font-semibold text-blue-900 text-xl">
          {this.props.outrightBetData.title}
        </h2>
        <h3 className=" pb-2 font-semibold text-slate-900 text-md">
          Outright Bet
        </h3>
        <div class="grid xs:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {this.props.outrightBetData.contendersData.map((contenderData) => (
            <OutrightBetContenderRow contenderData={contenderData} />
          ))}
        </div>
        <div
          onClick={this.showMore}
          className="w-full cursor-pointer h-12 inline-flex justify-center text-slate-900 text-sm border-t border-b border-slate-900 mt-5 mb-1"
        >
          <body className="flex items-center justify-center w-full">
            {this.state.showText}
            {this.state.arrowIcon}
          </body>
        </div>
      </div>
    );
  }
}
