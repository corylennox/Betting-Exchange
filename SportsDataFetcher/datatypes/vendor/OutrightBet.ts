import { Id } from "@openbook/common";
import { ContenderType } from "@openbook/common";

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
