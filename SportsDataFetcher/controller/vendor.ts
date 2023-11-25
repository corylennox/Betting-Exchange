import stringify from "../src/stringify";
import { Individual } from "../datatypes/vendor/Individual";
import { Season } from "../datatypes/vendor/Season";
import { Team } from "../datatypes/vendor/Team";
import vendorService from "../service/vendor";
import { League, getLeagueAsString } from "../datatypes/League";

function getImageUrl(team: Team) {
  const league = League.NFL; // TODO fix this to work with any league
  return `https://sportsbook.draftkings.com/static/logos/teams/${getLeagueAsString(
    league
  ).toLowerCase()}/${team.alias}.png`;
}

export class VendorController {
  seasons: Season[]; // contains games list
  teams: Team[];
  individuals: Individual[];

  constructor(seasons: Season[], teams: Team[], individuals: Individual[]) {
    this.seasons = seasons;
    this.teams = teams;
    this.individuals = individuals;
  }

  /**
   * Inserts all information provided at construction into the database, if possible.
   *
   * @returns true upon success, string with error reason upon failure.
   */
  async updateDatabase(): Promise<Boolean | string> {
    for (const season of this.seasons) {
      if (!(await vendorService.hasSeason(season.vendorId))) {
        if (!(await vendorService.canAddSeason(season))) {
          return `Cannot add season ${stringify(season)}`;
        } else {
          await vendorService.addSeason(season);
          console.log(`Added season to database: ${stringify(season)}`);
        }
      } else console.log(`Skipping adding season: ${season.vendorId}`);
    }

    for (const team of this.teams) {
      if (!(await vendorService.hasTeam(team.vendorId))) {
        if (!(await vendorService.canAddTeam(team))) {
          return `Cannot add team ${stringify(team)}`;
        } else {
          await vendorService.addTeam(team, getImageUrl(team));
          console.log(`Added team to database: ${stringify(team)}`);
        }
      } else console.log(`Skipping adding team: ${team.vendorId}`);
    }

    for (const team of this.teams) {
      for (const individual of team.individuals) {
        if (!(await vendorService.hasIndividual(individual.vendorId))) {
          if (!(await vendorService.canAddIndividual(individual))) {
            return `Cannot add individual ${stringify(individual)}`;
          } else {
            await vendorService.addIndividual(individual);
            console.log(
              `Added individual to database: ${stringify(individual)}`
            );
          }
        } else
          console.log(`Skipping adding individual: ${individual.vendorId}`);
      }
    }

    for (const season of this.seasons) {
      for (const game of season.games) {
        if (!(await vendorService.hasGame(game.vendorId))) {
          if (!(await vendorService.canAddGame(game))) {
            return `Cannot add game ${stringify(game)}`;
          } else {
            await vendorService.addGame(game);
            console.log(`Added game to database: ${stringify(game)}`);
          }
        } else console.log(`Skipping adding game: ${game.vendorId}`);
      }
    }

    console.log("finished updating database");
    return true;
  }
}
