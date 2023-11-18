require("dotenv").config(); // loads environment variables from .env file
import axios from "axios";

type ID = string;

function logObject(obj: any): void {
  console.log(JSON.stringify(obj, null, 2));
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * For GameBets
 */

class Competition {
  id: ID;
  awayTeam: ID;
  homeTeam: ID;
  scheduledTime: Date;

  constructor(data: any) {
    this.id = data.id;
    this.awayTeam = data.away.id;
    this.homeTeam = data.home.id;
    this.scheduledTime = data.scheduled;
  }
}

class Season {
  seasonId: ID;
  seasonName: string;
  games: Competition[];

  constructor(data: any) {
    this.seasonId = data.season.id;
    this.seasonName = data.season.year.toString();
    this.games = data.weeks.flatMap((week: any) => {
      return week.games.map((game: any) => new Competition(game));
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

/**
 * For Player OutrightBets
 */
class Player {
  id: ID;
  displayName: string;
  abbreviatedName: string;
  dateOfBirth: Date;

  constructor(data: any) {
    this.id = data.id;
    this.displayName = data.name;
    this.abbreviatedName = data.abbr_name;
    this.dateOfBirth = data.birth_date;
  }
}

/**
 * For Team OutrightBets
 */
class Team {
  id: ID;
  name: string;
  market: string;
  alias: string;
  players: Player[];

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.market = data.market;
    this.alias = data.alias;
    this.players = data.players.map((player: any) => new Player(player));
  }

  static async fetchTeam(apiKey: string, teamId: ID): Promise<Team> {
    const url = `https://api.sportradar.us/nfl/official/trial/v7/en/teams/${teamId}/profile.json?api_key=${apiKey}`;
    const response = await axios.get(url);
    console.log("Raw profile data:");
    logObject(response.data);
    console.log("\n\n\n");
    return new Team(response.data);
  }
}

function getTeamIds(season: Season): Set<ID> {
  let teamIds = new Set<ID>();

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
