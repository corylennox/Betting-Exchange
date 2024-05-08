import { Id } from "../Id";
import { Individual } from "./Individual";
import { Conference } from "./Conference";
import { Season } from "./Season";
import { OutrightBet } from "./OutrightBet";

export class LeagueState {
  id: Id;
  seasons: Season[];
  players: Individual[];
  conferences: Conference[];

  constructor(
    id: Id,
    seasons: Season[],
    players: Individual[],
    conferences: Conference[]
  ) {
    this.id = id;
    this.seasons = seasons;
    this.players = players;
    this.conferences = conferences;
  }
}
