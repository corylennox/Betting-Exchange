import { Id } from "../Id";
import { Game } from "./Game";
import { OutrightBet } from "./OutrightBet";

export class Season {
  id: Id;
  seasonName: string;
  games: Game[];
  outrightBets: OutrightBet[]; // outright bets on the season (championship winner, division winner, mvp, etc.)

  constructor(
    id: Id,
    seasonName: string,
    games: Game[],
    outrightBets: OutrightBet[]
  ) {
    this.id = id;
    this.seasonName = seasonName;
    this.games = games;
    this.outrightBets = outrightBets;
  }
}
