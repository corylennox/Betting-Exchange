import { Id } from "../Id";
import { Division } from "./Division";

export class Conference {
  id: Id;
  name: string;
  divisions: Division[];

  constructor(id: Id, name: string, divisions: Division[]) {
    this.id = id;
    this.name = name;
    this.divisions = divisions;
  }
}
