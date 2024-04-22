import { Id } from "@openbook/common";
import { League } from "@openbook/common";
import { enumToNumber } from "@openbook/common";

/**
 * An Individual object that contains the necessary data to insert the Individual into the database
 */
export class Individual {
  vendorId: Id;
  displayName: string;
  abbreviatedName: string;
  dateOfBirth: Date;
  leagueId: Id;

  constructor(data: any, league: League) {
    this.vendorId = data.id;
    this.displayName = data.name;
    this.abbreviatedName = data.abbr_name;
    this.dateOfBirth = data.birth_date;
    this.leagueId = enumToNumber(league).toString();
  }
}
