import { replaceMap, reviveMap } from "../../utils";

const toggledBetsReducer = (state = replaceMap(new Map()), action) => {
  if (!action.payload) return state;

  const buttonId = action.payload.buttonId;

  let newState = reviveMap(state)

  switch (action.type) {
    case "MY_BUTTON_CLICKED":
      if (newState.has(buttonId)) newState.delete(buttonId);
      else newState.set(buttonId, { betInfo: action.payload.betInfo, wager: 0 });
      break;
    case "DELETE_BET":
      newState.delete(buttonId);
      break;
    case "WAGER_CHANGED":
      break;
    default:
  }
  return replaceMap(newState);
};

export default toggledBetsReducer;
