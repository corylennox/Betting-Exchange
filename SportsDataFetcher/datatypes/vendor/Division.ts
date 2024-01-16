import axios from "axios";
import { Id } from "../../bettingexchangecommon/datatypes/Id";
import logObject from "../../bettingexchangecommon/src/logObject";

/**
 * An Division object that contains the necessary data to insert the Division into the database
 */
export class Division {
  name: string;
  conferenceVendorId: Id;
  vendorId: Id;

  constructor(data: any) {
    this.name = data.division.name;
    this.conferenceVendorId = data.conference.id;
    this.vendorId = data.division.id;
  }

  static async fetchDivision(apiKey: string, teamId: Id): Promise<Division> {
    const url = `https://api.sportradar.us/nfl/official/trial/v7/en/teams/${teamId}/profile.json?api_key=${apiKey}`;
    const response = await axios.get(url);
    console.log("Raw division data:");
    logObject(response.data);
    console.log("\n\n\n");
    return new Division(response.data);
  }
}
