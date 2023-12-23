import axios from "axios";
import { Id } from "../../bettingexchangecommon/datatypes/Id";
import { Individual } from "./Individual";
import logObject from "../../src/logObject";

export class Team {
  vendorId: Id;
  name: string;
  market: string;
  alias: string;
  individuals: Individual[];

  constructor(data: any) {
    this.vendorId = data.id;
    this.name = data.name;
    this.market = data.market;
    this.alias = data.alias;
    this.individuals = data.players.map(
      (player: any) => new Individual(player)
    );
  }

  static async fetchTeam(apiKey: string, teamId: Id): Promise<Team> {
    const url = `https://api.sportradar.us/nfl/official/trial/v7/en/teams/${teamId}/profile.json?api_key=${apiKey}`;
    const response = await axios.get(url);
    console.log("Raw profile data:");
    logObject(response.data);
    console.log("\n\n\n");
    return new Team(response.data);
  }
}
