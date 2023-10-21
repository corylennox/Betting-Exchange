require("dotenv").config(); // loads environment variables from .env file
import axios from 'axios';

type ID = string;

function logObject(obj: any): void {
  console.log(JSON.stringify(obj, null, 2));
}

class Competition {
  awayTeam: ID;
  homeTeam: ID;
  scheduledTime: Date;

  constructor(data: any) {
    this.awayTeam = data.away.id;
    this.homeTeam = data.home.id;
    this.scheduledTime = data.scheduled;
  }
}

class Week {
  weekId: ID;
  name: string;
  games: Competition[];

  constructor(data: any) {
    this.weekId = data.id;
    this.name = data.sequence.toString();
    this.games = data.games.map((game: any) => new Competition(game));
  }
}

class Season {
  seasonId: ID;
  seasonName: string;
  weeks: Week[];

  constructor(data: any) {
    this.seasonId = data.season.id;
    this.seasonName = data.season.year.toString();
    this.weeks = data.weeks.map((week: any) => new Week(week));
  }

  static async fetchCurrentSeason(apiKey: string): Promise<Season> {
    const url = `https://api.sportradar.us/nfl/official/trial/v7/en/games/current_season/schedule.json?api_key=${apiKey}`;
    const response = await axios.get(url);
    console.log('Raw data:');
    logObject(response.data);
    console.log('\n\n\n');
    return new Season(response.data);
  }
}

// Usage example:
(async () => {
  try {
    const apiKey : string = process.env.SPORTSRADAR_NFL_API_KEY;
    const currentSeason = await Season.fetchCurrentSeason(apiKey);
    console.log('Formatted data:');
    logObject(currentSeason);
    console.log('\n\n\n');
  } catch (error) {
    console.error("Failed to fetch season:", error);
  }
})();
