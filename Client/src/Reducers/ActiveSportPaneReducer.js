
const activeSportPaneReducer = (state = "Featured", action) => {
    if (!action.payload) return state;

    let newState = state;

    switch (action.type) {
        case "CHANGE_ACTIVE_SPORTPANE":
            newState = action.payload.href;
            break;     
        default:
    }
    return newState;
};

export default activeSportPaneReducer;
