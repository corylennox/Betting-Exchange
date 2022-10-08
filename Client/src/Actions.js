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
