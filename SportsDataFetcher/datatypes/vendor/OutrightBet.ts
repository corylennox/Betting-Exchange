import { Id } from "../../bettingexchangecommon/datatypes/Id";
import { ContenderType } from "../../bettingexchangecommon/datatypes/ContenderType";

export class OutrightBetChoice {
  contenderId: Id;
  buttonId: Id;
}

/**
 * An OutrightBet object that contains the necessary data to insert the OutrightBet into the database
 */
export class OutrightBet {
  title: String;
  scheduledCompletionTime: Date;
  outrightBetChoices: OutrightBetChoice[];
  contenderType: ContenderType;
}
