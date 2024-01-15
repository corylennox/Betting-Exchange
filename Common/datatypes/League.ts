import { Id } from "./Id";
import { enumToNumber } from "../enumUtils";

export enum League {
  NFL = 1, // start at index 1 because Postgres auto-increment primary keys start at 1
}

export function getLeagueAsDatabaseId(league: League): Id {
  return enumToNumber(league).toString();
}
