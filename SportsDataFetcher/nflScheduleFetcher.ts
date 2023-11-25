require("dotenv").config(); // loads environment variables from .env file
import { Game } from "./datatypes/vendor/Game";
import { Id } from "./datatypes/vendor/Id";
import { Individual } from "./datatypes/vendor/Individual";
import logObject from "./src/logObject";
import { Season } from "./datatypes/vendor/Season";
import { Team } from "./datatypes/vendor/Team";
import { VendorController } from "./controller/vendor";
import { League, getLeagueAsString } from "./datatypes/League";

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
    let teams: Team[] = [];
    let individuals: Individual[] = [];
    for (const teamVendorId of teamVendorIds) {
      await sleep(1000);
      const team = await Team.fetchTeam(apiKey, teamVendorId);
      console.log("Formatted team data:");
      logObject(team);
      teams.push(team);
      individuals.push(...team.individuals); // extend the list with another list
    }

    const vendorDatabaseInserter = new VendorController(
      [currentSeason],
      teams,
      individuals
    );
    const result: Boolean | string =
      await vendorDatabaseInserter.updateDatabase();
    if (!(result === true))
      throw new Error(`Error adding to database: ${result}`);
  } catch (error) {
    console.error(
      "Failed to fetch data or failed to insert into database:",
      error
    );
  }
})();
