import { Id } from "../Id";
import { Button } from "./Button";
import { Individual } from "./Individual";
import { Team } from "./Team";

export class OutrightBetChoice {
  id: Id;
  contender: Team | Individual;
  button: Button;

  constructor(id: Id, contender: Team | Individual, button: Button) {
    this.id = id;
    this.contender = contender;
    this.button = button;
  }
}
