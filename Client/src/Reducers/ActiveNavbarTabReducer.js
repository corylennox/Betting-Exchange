
const activeSportPaneReducer = (state = "/", action) => {
    if (!action.payload) return state;

    let newState = state;

    switch (action.type) {
        case "CHANGE_ACTIVE_NAVBAR_TAB":
            newState = action.payload.href;
            break;     
        default:
    }
    return newState;
};

export default activeSportPaneReducer;
