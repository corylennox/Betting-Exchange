require("dotenv").config(); // loads environment variables from .env file
import Game from "./datatypes/Game";
import Id from "./datatypes/Id";
import Individual from "./datatypes/Individual";
import logObject from "./src/logObject";
import Season from "./datatypes/Season";
import Team from "./datatypes/Team";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getTeamIds(season: Season): Set<Id> {
  let teamIds = new Set<Id>();

  for (const game of season.games) {
    teamIds.add(game.awayTeam);
    teamIds.add(game.homeTeam);
  }

  return teamIds;
}

// Usage example:
(async () => {
  try {
    const apiKey: string = process.env.SPORTSRADAR_NFL_API_KEY;
    const currentSeason = await Season.fetchCurrentSeason(apiKey);
    console.log("Formatted season data:");
    logObject(currentSeason);
    console.log("\n\n\n");
    const teamIds = getTeamIds(currentSeason);
    for (const teamId of teamIds) {
      await sleep(1000);
      const team = await Team.fetchTeam(apiKey, teamId);
      console.log("Formatted team data:");
      logObject(team);
    }
  } catch (error) {
    console.error("Failed to fetch season or team:", error);
  }
})();
