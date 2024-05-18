import { Id } from "@openbook/common";
import { League, getLeagueAsDatabaseId } from "@openbook/common";
import { logObject } from "@openbook/common";
import { enumToNumber } from "@openbook/common";
import { request } from "src/RequestCache";

/**
 * An Conference object that contains the necessary data to insert the Conference into the database
 */
export class Conference {
  name: string;
  leagueId: Id;
  vendorId: Id;

  constructor(data: any, league: League) {
    this.name = data.conference.name;
    this.leagueId = getLeagueAsDatabaseId(league);
    this.vendorId = data.conference.id;
  }

  static async fetchConference(
    apiKey: string,
    teamId: Id,
    league: League
  ): Promise<Conference> {
    const url = `https://api.sportradar.us/nfl/official/trial/v7/en/teams/${teamId}/profile.json?api_key=${apiKey}`;
    const response = await request(url);
    console.log("Raw conference data:");
    logObject(response.data);
    console.log("\n\n\n");
    return new Conference(response.data, league);
  }
}
