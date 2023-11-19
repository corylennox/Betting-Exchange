import Id from "./Id";

class Game {
  id: Id;
  awayTeam: Id;
  homeTeam: Id;
  scheduledTime: Date;

  constructor(data: any) {
    this.id = data.id;
    this.awayTeam = data.away.id;
    this.homeTeam = data.home.id;
    this.scheduledTime = data.scheduled;
  }
}

export default Game;
