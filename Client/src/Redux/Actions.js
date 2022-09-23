/**
 * Toggle bets actions
 */

export const myButtonClickedAction = (buttonId, betInfo) => {
  return {
    type: "MY_BUTTON_CLICKED",
    payload: {
      buttonId: buttonId,
      betInfo: betInfo,
    },
  };
};

export const deleteBetAction = (buttonId) => {
  return {
    type: "DELETE_BET",
    payload: {
      buttonId: buttonId,
    },
  };
};

export const setWagerAction = (buttonId, wagerStr, wagerInteger) => {
  return {
    type: "SET_WAGER",
    payload: {
      buttonId: buttonId,
      wagerStr: wagerStr,
      wagerInteger: wagerInteger,
    },
  };
};

/**
 * other actions
 */
