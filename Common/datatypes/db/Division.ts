import { Id } from "../Id";
import { Team } from "./Team";

export class Division {
  id: Id;
  name: string;
  teams: Team[];

  constructor(id: Id, name: string, teams: Team[]) {
    this.id = id;
    this.name = name;
    this.teams = teams;
  }
}
