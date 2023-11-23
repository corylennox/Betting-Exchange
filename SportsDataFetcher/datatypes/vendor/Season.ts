import axios from "axios";
import { Id } from "./Id";
import { Game } from "./Game";
import logObject from "../../src/logObject";

export class Season {
  vendorId: Id;
  seasonName: string;
  games: Game[];

  constructor(data: any) {
    this.vendorId = data.season.id;
    this.seasonName = data.season.year.toString();
    this.games = data.weeks.flatMap((week: any) => {
      return week.games.map((game: any) => new Game(game));
    });
  }

  static async fetchCurrentSeason(apiKey: string): Promise<Season> {
    const url = `https://api.sportradar.us/nfl/official/trial/v7/en/games/current_season/schedule.json?api_key=${apiKey}`;
    const response = await axios.get(url);
    console.log("Raw current season data:");
    logObject(response.data);
    console.log("\n\n\n");
    return new Season(response.data);
  }
}
