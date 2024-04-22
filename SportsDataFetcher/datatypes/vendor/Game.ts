import { Id } from "@openbook/common";

/**
 * A Game object that contains the necessary data to insert the Game into the database
 */
export class Game {
  vendorId: Id;
  awayTeamVendorId: Id;
  homeTeamVendorId: Id;
  scheduledTime: Date;
  seasonVendorId: Id;

  constructor(data: any, seasonVendorId: Id) {
    this.vendorId = data.id;
    this.awayTeamVendorId = data.away.id;
    this.homeTeamVendorId = data.home.id;
    this.scheduledTime = data.scheduled;
    this.seasonVendorId = seasonVendorId;
  }
}
