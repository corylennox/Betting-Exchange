import React, { Component } from "react";
import MyButton from "./MyButton";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import ContenderAndIcon from "./ContenderAndIcon";

const numContenderRowsToDisplay = 3;

function OutrightBetContenderRow(props) {
  return (
    <div className="w-full flex justify-center h-12">
      <ContenderAndIcon
        name={props.contenderData.name}
        image={props.contenderData.image}
      />
      <div className="w-auto flex justify-end">
        <MyButton
          contenderName={props.contenderData.name}
          contenderImage={props.contenderData.image}
          type={props.type}
          title={props.title}
          buttonId={props.contenderData.buttonId}
        />
      </div>
    </div>
  );
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
          (contenderData, index) => {
            return (
              <div
                key={
                  this.props.tabTitle +
                  this.props.outrightBetData.betTitle +
                  contenderData.name
                }
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
                  type={this.props.outrightBetData.type}
                  title={this.props.outrightBetData.betTitle}
                />
              </div>
            );
          }
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
      return "w-full cursor-pointer h-12 inline-flex justify-center text-skin-actionUnselected text-sm border-t border-b border-skin-divider mt-5 mb-1";
    } else if (
      this.props.outrightBetData.contendersData.length >
      numContenderRowsToDisplay * 2
    ) {
      return "xl:hidden w-full cursor-pointer h-12 inline-flex justify-center text-skin-actionUnselected text-sm border-t border-b border-skin-divider mt-5 mb-1";
    } else if (
      this.props.outrightBetData.contendersData.length >
      numContenderRowsToDisplay
    ) {
      return "md:hidden w-full cursor-pointer h-12 inline-flex justify-center text-skin-actionUnselected text-sm border-t border-b border-skin-divider mt-5 mb-1";
    } else if (
      this.props.outrightBetData.contendersData.length <=
      numContenderRowsToDisplay
    ) {
      return "hidden w-full cursor-pointer h-12 inline-flex justify-center text-skin-actionUnselected text-sm border-t border-b border-skin-divider mt-5 mb-1";
    }
    return "";
  }

  render() {
    return (
      <div className="bg-skin-overlay rounded-2xl p-3 drop-shadow-md shadow-lg mb-3">
        <h2 className="flex font-semibold text-skin-body text-xl">
          {this.props.outrightBetData.betTitle}
        </h2>
        <h3 className="pb-2 font-semibold text-skin-body text-md">
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
