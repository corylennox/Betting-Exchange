import axios from "axios";
import { Id } from "@openbook/common/datatypes/Id";
import {
  League,
  getLeagueAsDatabaseId,
} from "@openbook/common/datatypes/League";
import logObject from "@openbook/common/src/logObject";
import { enumToNumber } from "@openbook/common/enumUtils";

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
    const response = await axios.get(url);
    console.log("Raw conference data:");
    logObject(response.data);
    console.log("\n\n\n");
    return new Conference(response.data, league);
  }
}
