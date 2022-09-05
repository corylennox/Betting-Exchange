import React, { Component } from "react";
import MyButton from "./MyButton";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";

const numContenderRowsToDisplay = 3;

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
          <MyButton
            line={this.randMoneylineStr}
            contender={this.props.contenderData}
            type={this.props.type}
            title={this.props.title}
            onMoneylineClick={this.props.onMoneylineClick}
          />
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
    this.downIcon = <ChevronDownIcon className="w-5 h-5 ml-1" />;
    this.upIcon = <ChevronUpIcon className="w-5 h-5 ml-1" />;

    this.state = {
      isExpanded: false,
      showText: this.showMoreText,
      arrowIcon: this.downIcon,
    };

    this.showAll = this.showAll.bind(this);
    this.displayRows = this.displayRows.bind(this);
    this.showMoreCSS = this.showMoreCSS.bind(this);
  }

  displayRows() {
    return (
      <div className="grid xs:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {this.props.outrightBetData.contendersData.map(
          (contenderData, index) => (
            <div
              className={
                !this.state.isExpanded
                  ? index < numContenderRowsToDisplay
                    ? "contents"
                    : index < numContenderRowsToDisplay * 2
                    ? "hidden md:contents"
                    : index < numContenderRowsToDisplay * 3
                    ? "hidden xl:contents"
                    : "hidden"
                  : "" //expanded, so show all rows
              }
            >
              <OutrightBetContenderRow
                contenderData={contenderData}
                type={this.props.type}
                title={this.props.title}
                onMoneylineClick={this.props.onMoneylineClick}
              />
            </div>
          )
        )}
      </div>
    );
  }

  showAll() {
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

  showMoreCSS() {
    if (
      this.props.outrightBetData.contendersData.length >
      numContenderRowsToDisplay * 3
    ) {
      return "w-full cursor-pointer h-12 inline-flex justify-center text-blue-400 text-sm border-t border-b border-slate-900 mt-5 mb-1";
    } else if (
      this.props.outrightBetData.contendersData.length >
      numContenderRowsToDisplay * 2
    ) {
      return "xl:hidden w-full cursor-pointer h-12 inline-flex justify-center text-blue-400 text-sm border-t border-b border-slate-900 mt-5 mb-1";
    } else if (
      this.props.outrightBetData.contendersData.length >
      numContenderRowsToDisplay
    ) {
      console.log("length: ", this.props.outrightBetData.contendersData.length);
      return "md:hidden w-full cursor-pointer h-12 inline-flex justify-center text-blue-400 text-sm border-t border-b border-slate-900 mt-5 mb-1";
    } else if (
      this.props.outrightBetData.contendersData.length <=
      numContenderRowsToDisplay
    ) {
      return "hidden w-full cursor-pointer h-12 inline-flex justify-center text-blue-400 text-sm border-t border-b border-slate-900 mt-5 mb-1";
    }
    return "";
  }

  render() {
    return (
      <div className="bg-slate-100 rounded-2xl p-3 drop-shadow-md shadow-lg mb-3">
        <h2 className="flex font-semibold text-blue-900 text-xl">
          {this.props.outrightBetData.title}
        </h2>
        <h3 className="pb-2 font-semibold text-slate-900 text-md">
          Outright Bet
        </h3>
        {this.displayRows()}
        <div onClick={this.showAll} className={this.showMoreCSS()}>
          <h1 className="flex select-none items-center justify-center w-full">
            {this.state.showText}
            {this.state.arrowIcon}
          </h1>
        </div>
      </div>
    );
  }
}
