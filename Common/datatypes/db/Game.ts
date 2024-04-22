import { Id } from "../Id";
import { Team } from "./Team";
import { Season } from "./Season";
import { GameBet } from "./GameBet";
import { OutrightBet } from "./OutrightBet";

export class Game {
  id: Id;
  contenderA: Team;
  contenderB: Team;
  scheduledStartTime: Date;
  gameBet: GameBet;
  propBets: OutrightBet[];

  // construct from database response object
  constructor(
    id: Id,
    contenderA: Team,
    contenderB: Team,
    scheduledStartTime: Date,
    gameBet: GameBet,
    propBets: OutrightBet[] // TODO this is unpopulated right now, maybe it won't be of type OutrightBet[] but some other type
  ) {
    this.id = id;
    this.contenderA = contenderA;
    this.contenderB = contenderB;
    this.scheduledStartTime = scheduledStartTime;
    this.gameBet = gameBet;
    this.propBets = propBets;
  }
}
