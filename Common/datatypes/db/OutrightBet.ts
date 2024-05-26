import { Id } from "../Id";
import { ContenderType } from "../ContenderType";
import { EventType } from "../EventType";
import { OutrightBetChoice } from "./OutrightBetChoice";

export class OutrightBet {
  id: Id;
  betTitle: string;
  outrightBetChoices: OutrightBetChoice[];
  contenderType: ContenderType;
  eventId: Id;
  eventType: EventType;

  constructor(
    id: Id,
    betTitle: string,
    outrightBetChoices: OutrightBetChoice[],
    contenderType: ContenderType,
    eventId: Id,
    eventType: EventType
  ) {
    this.id = id;
    this.betTitle = betTitle;
    this.outrightBetChoices = outrightBetChoices;
    this.contenderType = contenderType;
    this.eventId = eventId;
    this.eventType = eventType;
  }
}
