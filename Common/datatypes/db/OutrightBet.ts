import { Id } from "../Id";
import { ContenderType } from "../ContenderType";
import { EventType } from "../EventType";
import { OutrightBetChoice } from "./OutrightBetChoice";

export class OutrightBet {
  id: Id;
  betTitle: string;
  outrightBetChoices: OutrightBetChoice[];
  scheduledCompletionTime: Date;
  contenderType: ContenderType;
  symbol: string;
  eventId: Id;
  eventType: EventType;

  constructor(
    id: Id,
    betTitle: string,
    outrightBetChoices: OutrightBetChoice[],
    scheduledCompletionTime: Date,
    contenderType: ContenderType,
    symbol: string,
    eventId: Id,
    eventType: EventType
  ) {
    this.id = id;
    this.betTitle = betTitle;
    this.outrightBetChoices = outrightBetChoices;
    this.scheduledCompletionTime = scheduledCompletionTime;
    this.contenderType = contenderType;
    this.symbol = symbol;
    this.eventId = eventId;
    this.eventType = eventType;
  }
}
