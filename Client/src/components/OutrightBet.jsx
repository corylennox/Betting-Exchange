import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MyButton from "./MyButton";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import ContenderAndIcon from "./ContenderAndIcon";
import { parseMap } from "../utils";

const numContenderRowsToDisplay = 3;

function OutrightBetContenderRow(props) {
  return (
    <div className="flex h-12 w-full justify-center">
      <ContenderAndIcon
        name={props.contenderData.name}
        image={props.contenderData.image}
      />
      <div className="flex w-auto justify-end">
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

export default function OutrightBet(props) {
  const showMoreText = "Show more";
  const showLessText = "Show less";
  const downIcon = <ChevronDownIcon className="ml-1 h-5 w-5" />;
  const upIcon = <ChevronUpIcon className="ml-1 h-5 w-5" />;

  const linesContainer = parseMap(useSelector((state) => state.lines));

  const [state, setState] = useState({
    isExpanded: false,
    showText: showMoreText,
    arrowIcon: downIcon,
  });
  const [sortedData, setSortedData] = useState([]);

  //sort the contenders data by line value
  useEffect(() => {
    const contendersDataCopy = [...props.outrightBetData.contendersData];
    contendersDataCopy.sort((a, b) => {
      const aLineValue = linesContainer.get(a.buttonId).value;
      const bLineValue = linesContainer.get(b.buttonId).value;
      return aLineValue - bLineValue;
    });
    setSortedData(contendersDataCopy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCellClassName = (index) => {
    return !state.isExpanded
      ? index < numContenderRowsToDisplay
        ? "contents"
        : index < numContenderRowsToDisplay * 2
        ? "hidden md:contents"
        : index < numContenderRowsToDisplay * 3
        ? "hidden xl:contents"
        : "hidden"
      : ""; //expanded, so show all rows
  };

  /**
   * @returns pt-0 if the cell is in the top row, pt-2 otherwise.
   */
  const getCellPaddingTop = (index) => {
    return index === 0
      ? "pt-0"
      : index === 1
      ? "pt-2 md:pt-0"
      : index === 2
      ? "pt-2 xl:pt-0"
      : "pt-2";
  };

  /**
   * @returns pb-0 if the cell is in the bottom row, pb-2 otherwise. The bottom row, in this case, refers
   * to the bottom-most visible row. So, if the OutrightBet grid is not expanded, whatever the bottom-most
   * visible row is will have pb-0.
   */
  const getCellPaddingBottom = (numContenders, index) => {
    const pbWhenXsAndNoShowMore =
      Math.floor((numContenders - 1 - index) / 1) > 0 ? "pb-2" : "pb-0";
    const pbWhenMdAndNoShowMore =
      Math.floor((numContenders - 1 - index) / 2) > 0 ? "pb-2" : "pb-0";
    const pbWhenXlAndNoShowMore =
      Math.floor((numContenders - 1 - index) / 3) > 0 ? "pb-2" : "pb-0";

    const result = state.isExpanded
      ? index === numContenders - 1
        ? "pb-0"
        : index === numContenders - 2
        ? "pb-2 md:pb-0"
        : index === numContenders - 3
        ? "pb-2 xl:pb-0"
        : "pb-2"
      : index < numContenderRowsToDisplay - 1
      ? `${pbWhenXsAndNoShowMore} md:${pbWhenMdAndNoShowMore} xl:${pbWhenXlAndNoShowMore}` /* the case where there's a single column and it's not the bottom row */
      : index < numContenderRowsToDisplay
      ? `pb-0 md:${pbWhenMdAndNoShowMore} xl:${pbWhenXlAndNoShowMore}` /* the case where there's a single column and it is the bottom row */
      : index < numContenderRowsToDisplay * 2 - 2
      ? `pb-0 md:${pbWhenMdAndNoShowMore} xl:${pbWhenXlAndNoShowMore}` /* the case where there's two columns and it's not the bottom row */
      : index < numContenderRowsToDisplay * 2
      ? `pb-0 xl:${pbWhenXlAndNoShowMore}` /* the case where there's two columns and it is the bottom row */
      : index < numContenderRowsToDisplay * 3 - 3
      ? `pb-0 xl:${pbWhenXlAndNoShowMore}` /* the case where there's three columns and it's not the bottom row */
      : "pb-0"; /* the case where there's three columns and it is the bottom row */
    return result;
  };

  const getBorder = (numContenders, index) => {
    const xsBorder = "border-r-0"; /* no dividers in one-column grid */
    const mdBorder =
      index < 2 && index === numContenders - 1
        ? "md:border-r-0" /* the case where this index is the final element in the first row - don't place a divider afterwards */
        : (index + 1) % 2 !== 0
        ? "md:border-r-[1px]"
        : "md:border-r-0"; /* the normal case for two-column grid */
    const xlBorder =
      index < 3 && index === numContenders - 1
        ? "xl:border-r-0" /* the case where this index is the final element in the first row - don't place a divider afterwards */
        : (index + 1) % 3 !== 0
        ? "xl:border-r-[1px]"
        : "xl:border-r-0"; /* the normal case for three-column grid */

    return `${xsBorder} ${mdBorder} ${xlBorder}`;
  };

  const displayRows = () => {
    const numContenders = props.outrightBetData.contendersData.length;

    /* Add padding between cells rather than grid gap so the divider displays evenly between cells */
    /* h-fit is needed in one of the inner divs so that if there are 2 columns and column 1 has 3 items, but column 2 has 2 items, the item in row 2 col 2 doesn't stretch to fit the padding created in row 2 col 1 */
    return (
      <div className="xs:grid-cols-1 grid gap-0 md:grid-cols-2 xl:grid-cols-3">
        {sortedData.map((contenderData, index) => {
          return (
            <div
              key={
                props.tabTitle +
                props.outrightBetData.betTitle +
                contenderData.name
              }
              className={getCellClassName(index)}
            >
              <div
                className={`border-skin-divier h-fit px-3
                  ${getBorder(numContenders, index)}
                  ${getCellPaddingTop(index)}
                  ${getCellPaddingBottom(numContenders, index)}`}
              >
                <OutrightBetContenderRow
                  contenderData={contenderData}
                  type={props.outrightBetData.type}
                  title={props.outrightBetData.betTitle}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const showAll = () => {
    setState((prevState) => ({
      isExpanded: !prevState.isExpanded,
      showText:
        prevState.showText === showMoreText ? showLessText : showMoreText,
      arrowIcon: prevState.arrowIcon === downIcon ? upIcon : downIcon,
    }));
  };

  const showMoreCSS = () => {
    if (
      props.outrightBetData.contendersData.length >
      numContenderRowsToDisplay * 3
    ) {
      return "w-full cursor-pointer h-12 inline-flex justify-center text-skin-actionUnselected text-sm border-t border-b border-skin-divider mt-5 mb-1";
    } else if (
      props.outrightBetData.contendersData.length >
      numContenderRowsToDisplay * 2
    ) {
      return "xl:hidden w-full cursor-pointer h-12 inline-flex justify-center text-skin-actionUnselected text-sm border-t border-b border-skin-divider mt-5 mb-1";
    } else if (
      props.outrightBetData.contendersData.length > numContenderRowsToDisplay
    ) {
      return "md:hidden w-full cursor-pointer h-12 inline-flex justify-center text-skin-actionUnselected text-sm border-t border-b border-skin-divider mt-5 mb-1";
    } else if (
      props.outrightBetData.contendersData.length <= numContenderRowsToDisplay
    ) {
      return "hidden w-full cursor-pointer h-12 inline-flex justify-center text-skin-actionUnselected text-sm border-t border-b border-skin-divider mt-5 mb-1";
    }
    return "";
  };

  return (
    <div className="mb-3 rounded-2xl bg-skin-overlay p-3 shadow-lg drop-shadow-md">
      <h2 className="flex text-xl font-semibold text-skin-body">
        {props.outrightBetData.betTitle}
      </h2>
      <h3 className="text-md pb-2 font-semibold text-skin-body">
        Outright Bet
      </h3>
      {displayRows()}
      <div onClick={showAll} className={showMoreCSS()}>
        <h1 className="flex w-full select-none items-center justify-center">
          {state.showText}
          {state.arrowIcon}
        </h1>
      </div>
    </div>
  );
}
