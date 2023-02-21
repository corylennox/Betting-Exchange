/**
 * Toggle bets reducer actions
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

export const deleteBetsAction = (buttonIds) => {
  return {
    type: "DELETE_BETS",
    payload: {
      buttonIds: buttonIds,
    },
  };
};

export const setWagerAndWinAction = (buttonId, wagerStr, wagerInteger, winStr, winInteger) => {
  return {
    type: "SET_WAGER_AND_WIN",
    payload: {
      buttonId: buttonId,
      wagerStr: wagerStr,
      wagerInteger: wagerInteger,
      winStr: winStr,
      winInteger: winInteger,
    },
  };
};

/**
 * change active sportspane actions
 */

export const changeSportpaneAction = (href) => {
  return {
    type: "CHANGE_ACTIVE_SPORTPANE",
    payload: {
      href: href,
    },
  };
};

/**
 * change active navbar tab actions
 */
export const changeNavbarTabAction = (href) => {
  return {
    type: "CHANGE_ACTIVE_NAVBAR_TAB",
    payload: {
      href: href,
    },
  };
};

/**
 * change active theme
 */
export const changeThemeAction = (theme) => {
  return {
    type: "CHANGE_ACTIVE_THEME",
    payload: {
      theme: theme,
    },
  };
};

/**
 * update the value of lines that have already been added to the redux store
 */
export const updateLinesAction = (lineUpdates) => {
  return {
    type: "UPDATE_LINES",
    payload: {
      lineUpdates: lineUpdates
    },
  };
};

/**
 * add lines to the redux store
 */
export const addLinesAction = (lines) => {
  return {
    type: "ADD_LINES",
    payload: {
      lines: lines
    },
  };
};

/**
 * set the available balance in the redux store
 */
export const setAvailableBalanceAction = (availableBalance) => {
  return {
    type: "SET_AVAILABLE_BALANCE",
    payload: {
      availableBalance: availableBalance
    },
  };
};
