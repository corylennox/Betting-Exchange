import { Id } from "./Id";

export class Game {
  vendorId: Id;
  awayTeam: Id;
  homeTeam: Id;
  scheduledTime: Date;

  constructor(data: any) {
    this.vendorId = data.id;
    this.awayTeam = data.away.id;
    this.homeTeam = data.home.id;
    this.scheduledTime = data.scheduled;
  }
}
