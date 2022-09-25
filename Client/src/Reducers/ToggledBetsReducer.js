import { stringifyMap, parseMap } from "../utils";

const toggledBetsReducer = (state = stringifyMap(new Map()), action) => {
  if (!action.payload) return state;

  const buttonId = action.payload.buttonId;

  let newState = parseMap(state);

  switch (action.type) {
    case "MY_BUTTON_CLICKED":
      if (newState.has(buttonId)) newState.delete(buttonId);
      else
        newState.set(buttonId, { betInfo: action.payload.betInfo, wager: 0 });
      break;
    case "DELETE_BET":
      newState.delete(buttonId);
      break;
    case "WAGER_CHANGED":
      break;
    default:
  }
  return stringifyMap(newState);
};

export default toggledBetsReducer;
