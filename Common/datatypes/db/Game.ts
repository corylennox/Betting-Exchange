import { Id } from "../Id";
import { Team } from "./Team";
import { Season } from "./Season";
import { GameBet } from "./GameBet";
import { OutrightBet } from "./OutrightBet";

export class Game {
  id: Id;
  contenderA: Team;
  contenderB: Team;
  scheduledTime: Date;
  gameBet: GameBet;
  outrightBets: OutrightBet[];

  // construct from database response object
  constructor(
    id: Id,
    contenderA: Team,
    contenderB: Team,
    scheduledTime: Date,
    gameBet: GameBet,
    outrightBets: OutrightBet[]
  ) {
    this.id = id;
    this.contenderA = contenderA;
    this.contenderB = contenderB;
    this.scheduledTime = scheduledTime;
    this.gameBet = this.gameBet;
    this.outrightBets = this.outrightBets;
  }
}
