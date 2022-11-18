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

  getCellClassName(index) {
    return !this.state.isExpanded
      ? index < numContenderRowsToDisplay
        ? "contents"
        : index < numContenderRowsToDisplay * 2
        ? "hidden md:contents"
        : index < numContenderRowsToDisplay * 3
        ? "hidden xl:contents"
        : "hidden"
      : "" //expanded, so show all rows
  }

  /**
   * @returns pt-0 if the cell is in the top row, pt-2 otherwise.
   */
  getCellPaddingTop(index) {
    return index === 0 ? "pt-0" : index === 1 ? "pt-2 md:pt-0" : index === 2 ? "pt-2 xl:pt-0" : "pt-2"
  }

  /**
   * @returns pb-0 if the cell is in the bottom row, pb-2 otherwise. The bottom row, in this case, refers
   * to the bottom-most visible row. So, if the OutrightBet grid is not expanded, whatever the bottom-most
   * visible row is will have pb-0.
   */
  getCellPaddingBottom(numContenders, index) {
    const pbWhenXsAndNoShowMore = Math.floor((numContenders-1-index) / 1) > 0 ? "pb-2" : "pb-0";
    const pbWhenMdAndNoShowMore = Math.floor((numContenders-1-index) / 2) > 0 ? "pb-2" : "pb-0";
    const pbWhenXlAndNoShowMore = Math.floor((numContenders-1-index) / 3) > 0 ? "pb-2" : "pb-0";

    const result = this.state.isExpanded
      ?
        index === numContenders-1 ? "pb-0" : index === numContenders-2 ? "pb-2 md:pb-0" : index === numContenders-3 ? "pb-2 xl:pb-0" : "pb-2"
      :
        index < numContenderRowsToDisplay-1 ? `${pbWhenXsAndNoShowMore} md:${pbWhenMdAndNoShowMore} xl:${pbWhenXlAndNoShowMore}` /* the case where there's a single column and it's not the bottom row */
        : index < numContenderRowsToDisplay ? `pb-0 md:${pbWhenMdAndNoShowMore} xl:${pbWhenXlAndNoShowMore}` /* the case where there's a single column and it is the bottom row */
        : index < numContenderRowsToDisplay*2-2 ? `pb-0 md:${pbWhenMdAndNoShowMore} xl:${pbWhenXlAndNoShowMore}` /* the case where there's two columns and it's not the bottom row */
        : index < numContenderRowsToDisplay*2 ? `pb-0 xl:${pbWhenXlAndNoShowMore}` /* the case where there's two columns and it is the bottom row */
        : index < numContenderRowsToDisplay*3-3 ? `pb-0 xl:${pbWhenXlAndNoShowMore}` /* the case where there's three columns and it's not the bottom row */
        : "pb-0" /* the case where there's three columns and it is the bottom row */
    return result;
  }

  getBorder(numContenders, index) {
    const xsBorder = "border-r-0" /* no dividers in one-column grid */
    const mdBorder = index < 2 && index === numContenders-1
      ? "md:border-r-0" /* the case where this index is the final element in the first row - don't place a divider afterwards */
      : (index+1) % 2 !== 0 ? "md:border-r-[1px]" : "md:border-r-0" /* the normal case for two-column grid */
    const xlBorder = index < 3 && index === numContenders-1
      ? "xl:border-r-0" /* the case where this index is the final element in the first row - don't place a divider afterwards */
      : (index+1) % 3 !== 0 ? "xl:border-r-[1px]" : "xl:border-r-0" /* the normal case for three-column grid */

    return `${xsBorder} ${mdBorder} ${xlBorder}`
  }

  displayRows() {
    const numContenders = this.props.outrightBetData.contendersData.length;

    /* Add padding between cells rather than grid gap so the divider displays evenly between cells */
    /* h-fit is needed in one of the inner divs so that if there are 2 columns and column 1 has 3 items, but column 2 has 2 items, the item in row 2 col 2 doesn't stretch to fit the padding created in row 2 col 1 */
    return (
      <div className="grid xs:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-0">
        {this.props.outrightBetData.contendersData.map(
          (contenderData, index) => {
            return (
              <div
                key={
                  this.props.tabTitle +
                  this.props.outrightBetData.betTitle +
                  contenderData.name
                }
                className={this.getCellClassName(index)}
              >
                <div className={`border-skin-divier px-3 h-fit
                  ${ this.getBorder(numContenders, index) }
                  ${ this.getCellPaddingTop(index) }
                  ${ this.getCellPaddingBottom(numContenders, index) }`}>
                  <OutrightBetContenderRow
                    contenderData={contenderData}
                    type={this.props.outrightBetData.type}
                    title={this.props.outrightBetData.betTitle}
                  />
                </div>
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
