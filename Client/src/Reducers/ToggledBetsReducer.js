import { stringifyMap, parseMap } from "../utils";

const toggledBetsReducer = (state = stringifyMap(new Map()), action) => {
  if (!action.payload) return state;

  const buttonId = action.payload.buttonId;

  let newState = parseMap(state);

  switch (action.type) {
    case "MY_BUTTON_CLICKED":
      if (newState.has(buttonId)) newState.delete(buttonId);
      else
        newState.set(buttonId, {
          betInfo: action.payload.betInfo,
          wagerStr: "",
          wagerInteger: 0,
          winStr: "",
          winInteger: 0,
        });
      break;
    case "DELETE_BET":
      newState.delete(buttonId);
      break;
      case "SET_WAGER_AND_WIN":
        newState.get(buttonId).wagerStr = action.payload.wagerStr;
        newState.get(buttonId).wagerInteger = action.payload.wagerInteger;
        newState.get(buttonId).winStr = action.payload.winStr;
        newState.get(buttonId).winInteger = action.payload.winInteger;
        break;
    default:
  }
  return stringifyMap(newState);
};

export default toggledBetsReducer;
