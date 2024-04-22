import { Id } from "../Id";
import { Button } from "./Button";
import { Game } from "./Game";

export class GameBet {
  id: Id;
  spreadButtonA: Button;
  moneyButtonA: Button;
  totalButtonA: Button;
  spreadButtonB: Button;
  moneyButtonB: Button;
  totalButtonB: Button;

  // construct from database response object
  constructor(
    id: Id,
    spreadButtonA: Button,
    moneyButtonA: Button,
    totalButtonA: Button,
    spreadButtonB: Button,
    moneyButtonB: Button,
    totalButtonB: Button
  ) {
    this.id = id;
    this.spreadButtonA = spreadButtonA;
    this.moneyButtonA = moneyButtonA;
    this.totalButtonA = totalButtonA;
    this.spreadButtonB = spreadButtonB;
    this.moneyButtonB = moneyButtonB;
    this.totalButtonB = totalButtonB;
  }
}
