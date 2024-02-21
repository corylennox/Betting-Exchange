import { Id } from "../Id";
import { BetType } from "../BetType";
import { BetEventType } from "../BetEventType";

export class Button {
  id: Id;
  betEventId: Id;
  betEventType: BetEventType;
  betType: BetType;

  constructor(
    id: Id,
    betEventId: Id,
    betEventType: BetEventType,
    betType: BetType
  ) {
    this.id = id;
    this.betEventId = betEventId;
    this.betEventType = betEventType;
    this.betType = betType;
  }
}
