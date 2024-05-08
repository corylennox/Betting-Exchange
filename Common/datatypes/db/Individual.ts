import { Id } from "../Id";
import { League } from "../League";

export class Individual {
  id: Id;
  displayName: string;
  abbreviatedName: string;
  dateOfBirth: Date;

  constructor(
    id: Id,
    displayName: string,
    abbreviatedName: string,
    dateOfBirth: Date
  ) {
    this.id = id;
    this.displayName = displayName;
    this.abbreviatedName = abbreviatedName;
    this.dateOfBirth = dateOfBirth;
  }
}
