const activeSportPaneReducer = (state = 0, action) => {
    if (!action.payload) return state;

    const buttonId = action.payload.buttonId;
  
    let newState = state;
  
    switch (action.type) {
      case "CHANGE_ACTIVE_SPORTPANE":
        newState = action.payload.title;
      default:
    }
    return newState;
};

export default activeSportPaneReducer;
