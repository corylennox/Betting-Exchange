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

/**
 * change active sportspane actions
 */

export const changeSportpaneAction = (title) => {
  return {
    type: "CHANGE_ACTIVE_SPORTPANE",
    payload: {
      title: title,
    },
  };
};
