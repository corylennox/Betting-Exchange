const availableBalanceReducer = (state = 0, action) => {
  if (!action.payload) return state;

  let newState = state;
  switch (action.type) {
    case "SET_AVAILABLE_BALANCE":
      newState = action.payload.availableBalance;
      break;
    default:
  }
  return newState;
};

export default availableBalanceReducer;
