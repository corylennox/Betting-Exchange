import { Id } from "@openbook/common";
import { Individual } from "./Individual";
import { logObject } from "@openbook/common";
import { League } from "@openbook/common";
import { request } from "src/RequestCache";

/**
 * An Team object that contains the necessary data to insert the Team into the database
 */
export class Team {
  vendorId: Id;
  name: string;
  market: string;
  alias: string;
  individuals: Individual[];
  divisionVendorId: Id;

  constructor(data: any, league: League) {
    this.vendorId = data.id;
    this.name = data.name;
    this.market = data.market;
    this.alias = data.alias;
    this.individuals = data.players.map(
      (player: any) => new Individual(player, league)
    );
    this.divisionVendorId = data.division.id;
  }

  static async fetchTeam(
    apiKey: string,
    teamId: Id,
    league: League
  ): Promise<Team> {
    const url = `https://api.sportradar.us/nfl/official/trial/v7/en/teams/${teamId}/profile.json?api_key=${apiKey}`;
    const response = await request(url);
    console.log("Raw profile data:");
    logObject(response.data);
    console.log("\n\n\n");
    return new Team(response.data, league);
  }
}
