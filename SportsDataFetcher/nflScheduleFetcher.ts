require("dotenv").config(); // loads environment variables from .env file
import { Game } from "./datatypes/vendor/Game";
import { Id } from "./bettingexchangecommon/datatypes/Id";
import { Individual } from "./datatypes/vendor/Individual";
import logObject from "./src/logObject";
import { Season } from "./datatypes/vendor/Season";
import { Team } from "./datatypes/vendor/Team";
import { VendorController } from "./controller/vendor";
import { League } from "./bettingexchangecommon/datatypes/League";
import db from "./bettingexchangecommon/db/db";
import { Division } from "./datatypes/vendor/Division";
import { Conference } from "./datatypes/vendor/Conference";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getTeamVendorIds(season: Season): Set<Id> {
  let teamVendorIds = new Set<Id>();

  for (const game of season.games) {
    teamVendorIds.add(game.awayTeamVendorId);
    teamVendorIds.add(game.homeTeamVendorId);
  }

  return teamVendorIds;
}

// Usage example:
(async () => {
  try {
    const apiKey: string = process.env.SPORTSRADAR_NFL_API_KEY;
    const currentSeason = await Season.fetchCurrentSeason(apiKey, League.NFL);
    console.log("Formatted season data:");
    logObject(currentSeason);
    console.log("\n\n\n");
    const teamVendorIds = getTeamVendorIds(currentSeason);
    let conferences: Map<Id, Conference> = new Map<Id, Conference>();
    let divisions: Map<Id, Division> = new Map<Id, Division>();
    let teams: Team[] = [];
    let individuals: Individual[] = [];
    for (const teamVendorId of teamVendorIds) {
      await sleep(1000);
      const conference: Conference = await Conference.fetchConference(
        apiKey,
        teamVendorId,
        League.NFL
      );
      console.log("Formatted conference data:");
      logObject(conference);
      conferences.set(conference.vendorId, conference);

      await sleep(1000);
      const division: Division = await Division.fetchDivision(
        apiKey,
        teamVendorId
      );
      console.log("Formatted division data:");
      logObject(division);
      divisions.set(division.vendorId, division);

      await sleep(1000);
      const team = await Team.fetchTeam(apiKey, teamVendorId);
      console.log("Formatted team data:");
      logObject(team);
      teams.push(team);
      individuals.push(...team.individuals); // extend the list with another list
    }

    console.log("Formatted conferences map data:");
    logObject(Array.from(conferences.keys()));
    logObject(Array.from(conferences.values()));
    console.log("Formatted divisions map data:");
    logObject(Array.from(divisions.keys()));
    logObject(Array.from(divisions.values()));

    const vendorDatabaseInserter = new VendorController(
      [currentSeason],
      Array.from(conferences.values()),
      Array.from(divisions.values()),
      teams,
      individuals
    );
    const result: boolean | string =
      await vendorDatabaseInserter.updateDatabase();
    if (!(result === true))
      throw new Error(`Error adding to database: ${result}`);
  } catch (error) {
    console.error(
      "Failed to fetch data or failed to insert into database:",
      error
    );
  } finally {
    await db.destroy();
  }
})();
