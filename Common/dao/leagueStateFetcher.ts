import { db } from "../db/db";
import { BetEventType } from "../datatypes/BetEventType";

import { Id } from "../datatypes/Id";
import { EventType } from "../datatypes/EventType";

export function InvalidId() {
  return "invalidId";
}

class LeagueStateFetcherDao {
  async getAllSeasons(league_id: Id) {
    const games = await db
      .select("*")
      .from("seasons")
      .where("league_id", league_id);
    return games;
  }

  async getConferencesInLeague(league_id: Id) {
    const conferences = await db
      .select("*")
      .from("conferences")
      .where("league_id", league_id);
    return conferences;
  }

  async getDivisionsInConference(conference_id: Id) {
    const divisions = await db
      .select("*")
      .from("divisions")
      .where("conference_id", conference_id);
    return divisions;
  }

  async getTeamsInDivision(division_id: Id) {
    const teams = await db
      .select("*")
      .from("teams")
      .where("division_id", division_id);
    return teams;
  }

  async getTeam(team_id: Id) {
    const team = await db.select("*").from("teams").where("id", team_id);
    return team[0];
  }

  async getAllGames(season_id: Id) {
    const games = await db
      .select("*")
      .from("games")
      .where("season_id", season_id);
    return games;
  }

  async getButton(button_id: Id) {
    const gameBetButton = await db
      .select("*")
      .from("button_ids")
      .where("id", button_id);
    return gameBetButton[0];
  }

  async getGameBet(game_id: Id) {
    const gameBet = await db
      .select("*")
      .from("game_bets")
      .where("game_id", game_id);
    return gameBet[0];
  }

  async getOutrightBetChoices(outright_bet_choice_ids: Id[]) {
    const outrightBetChoices = await db
      .select("*")
      .whereIn("id", outright_bet_choice_ids);
    return outrightBetChoices;
  }

  async getOutrightBetsForEvent(event_id: Id, event_type: string) {
    const outrightBets = await db
      .select("*")
      .from("outright_bets")
      .where("event_id", event_id)
      .where("event_type", event_type);
    return outrightBets;
  }

  async getAllIndividuals(league_id: Id) {
    const individuals = await db
      .select("*")
      .from("individuals")
      .where("league_id", league_id);
    return individuals;
  }
}

const leagueStateFetcherDao = new LeagueStateFetcherDao();
export default leagueStateFetcherDao;
