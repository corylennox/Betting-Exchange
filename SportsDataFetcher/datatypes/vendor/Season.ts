import axios from "axios";
import { Id } from "../../bettingexchangecommon/datatypes/Id";
import { Game } from "./Game";
import logObject from "../../src/logObject";
import { League } from "../League";

export class Season {
  vendorId: Id;
  seasonName: string;
  games: Game[];
  leagueId: Id;

  constructor(data: any, league: League) {
    this.vendorId = data.season.id;
    this.seasonName = data.season.year.toString();
    this.games = data.weeks.flatMap((week: any) => {
      return week.games.map((game: any) => new Game(game, this.vendorId));
    });
    this.leagueId = (league as number).toString();
  }

  static async fetchCurrentSeason(
    apiKey: string,
    league: League
  ): Promise<Season> {
    const url = `https://api.sportradar.us/nfl/official/trial/v7/en/games/current_season/schedule.json?api_key=${apiKey}`;
    const response = await axios.get(url);
    console.log("Raw current season data:");
    logObject(response.data);
    console.log("\n\n\n");
    return new Season(response.data, league);
  }
}
