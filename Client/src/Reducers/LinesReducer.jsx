import { LineContainer } from "bettingexchangecommon/lineUtils";
import { stringifyMap, parseMap } from "../utils";

const linesReducer = (state = stringifyMap(new Map()), action) => {
  if (!action.payload) return state;

  let linesMap = parseMap(state)

  switch (action.type) {
    case "UPDATE_LINES":
      action.payload.lineUpdates.forEach((lineUpdate) => {
        // Because line updates may arrive for lines the user doesn't care about, drop those
        if (linesMap.has(lineUpdate.buttonId)) {
          linesMap.get(lineUpdate.buttonId).value = lineUpdate.newValue;
        }
      })
      break;
    case "ADD_LINES":
      action.payload.lines.forEach((line) => {
        linesMap.set(line.buttonId, line);
      })
      break;
    default:
  }
  return stringifyMap(linesMap);
};

export default linesReducer;
