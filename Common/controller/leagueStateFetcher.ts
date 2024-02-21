import { League } from "../datatypes/League";
import { LeagueState } from "../datatypes/db/LeagueState";
import leagueStateFetcherService from "../service/leagueStateFetcher";
import logObject from "../src/logObject";

export class LeagueStateFetcherController {
  league: League;
  leagueState: LeagueState;

  constructor(league: League) {
    this.league = league;
  }

  /**
   * Creates a LeagueState for the League provided at construction, using information from the database.
   *
   * @returns true upon success, string with error reason upon failure.
   */
  async fetch(): Promise<boolean | string> {
    this.leagueState = await leagueStateFetcherService.getLeagueState(
      this.league
    );
    console.log("finished fetching LeagueState:");
    logObject(this.leagueState);
    return true;
  }

  get(): LeagueState {
    return this.leagueState;
  }
}
