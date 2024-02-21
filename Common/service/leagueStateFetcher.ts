import leagueStateFetcherDao, { InvalidId } from "../dao/leagueStateFetcher";
import { Id } from "../datatypes/Id";
import { League, getLeagueAsDatabaseId } from "../datatypes/League";
import { Button } from "../datatypes/db/Button";
import { Conference } from "../datatypes/db/Conference";
import { Division } from "../datatypes/db/Division";
import { Team } from "../datatypes/db/Team";
import { BetType } from "../datatypes/BetType";
import { BetEventType } from "../datatypes/BetEventType";
import { Game } from "../datatypes/db/Game";
import { OutrightBet } from "../datatypes/db/OutrightBet";
import { GameBet } from "../datatypes/db/GameBet";
import { Individual } from "../datatypes/db/Individual";
import { LeagueState } from "../datatypes/db/LeagueState";
import { Season } from "../datatypes/db/Season";
import { EventType } from "../datatypes/EventType";
import { OutrightBetChoice } from "../datatypes/db/OutrightBetChoice";
import { ContenderType } from "../datatypes/ContenderType";
import logObject from "../src/logObject";

class LeagueStateFetcherService {
  cachedTeams: Map<Id, Team>;

  constructor() {
    this.cachedTeams = new Map<Id, Team>();
  }

  async #createConference(conferenceResponse: any): Promise<Conference> {
    const conferenceId: Id = conferenceResponse["id"];
    const conferenceName: Id = conferenceResponse["name"];
    const divisionsResponse =
      await leagueStateFetcherDao.getDivisionsInConference(conferenceId);
    let divisions: Division[] = [];
    for (const divisionResponse of divisionsResponse)
      divisions.push(await this.#createDivision(divisionResponse));
    return new Conference(conferenceId, conferenceName, divisions);
  }

  async #createDivision(divisionResponse: any): Promise<Division> {
    const divisionId = divisionResponse["id"];
    const divisionName = divisionResponse["name"];
    const teamsResponse = await leagueStateFetcherDao.getTeamsInDivision(
      divisionId
    );
    const teams: Team[] = [];
    for (const teamResponse of teamsResponse)
      teams.push(await this.#createTeam(teamResponse["id"]));
    return new Division(divisionId, divisionName, teams);
  }

  async #createTeam(teamId: Id): Promise<Team> {
    if (this.cachedTeams.has(teamId)) {
      const team: Team = this.cachedTeams.get(teamId)!;
      return team;
    } else {
      const teamResponse = await leagueStateFetcherDao.getTeam(teamId);
      const team = new Team(
        teamId,
        teamResponse["name"],
        teamResponse["market"],
        teamResponse["alias"],
        teamResponse["image_url"]
      );
      this.cachedTeams.set(teamId, team);
      return team;
    }
  }

  async #createGame(gameResponse: any): Promise<Game> {
    const gameId: Id = gameResponse["id"];

    const contenderA: Team = await this.#createTeam(
      gameResponse["contender_id_a"]
    );
    const contenderB: Team = await this.#createTeam(
      gameResponse["contender_id_b"]
    );
    const gameBet: GameBet = await this.#createGameBet(gameId);

    const outrightBets: OutrightBet[] = await this.#createOutrightBetsForEvent(
      gameId,
      EventType.Game
    );

    return new Game(
      gameId,
      contenderA,
      contenderB,
      gameResponse["scheduled_time"],
      gameBet,
      outrightBets
    );
  }

  async #createButton(buttonId: Id): Promise<Button> {
    const buttonResponse = await leagueStateFetcherDao.getButton(buttonId);
    return new Button(
      buttonResponse["id"],
      buttonResponse["bet_event_id"],
      buttonResponse["bet_event_type"] as BetEventType,
      buttonResponse["bet_type"] as BetType
    );
  }

  async #createGameBet(gameId: Id): Promise<GameBet> {
    const gameBetResponse = await leagueStateFetcherDao.getGameBet(gameId);
    const spreadButtonA: Button = await this.#createButton(
      gameBetResponse["spread_button_id_a"]
    );
    const moneyButtonA: Button = await this.#createButton(
      gameBetResponse["money_button_id_a"]
    );
    const totalButtonA: Button = await this.#createButton(
      gameBetResponse["total_button_id_a"]
    );
    const spreadButtonB: Button = await this.#createButton(
      gameBetResponse["spread_button_id_b"]
    );
    const moneyButtonB: Button = await this.#createButton(
      gameBetResponse["money_button_id_b"]
    );
    const totalButtonB: Button = await this.#createButton(
      gameBetResponse["total_button_id_b"]
    );
    return new GameBet(
      gameBetResponse["id"],
      spreadButtonA,
      moneyButtonA,
      totalButtonA,
      spreadButtonB,
      moneyButtonB,
      totalButtonB
    );
  }

  async #createOutrightBetChoices(
    outrightBetChoiceIds: Id[],
    contenderType: ContenderType
  ) {
    const outrightBetChoicesResponse =
      await leagueStateFetcherDao.getOutrightBetChoices(outrightBetChoiceIds);

    let outrightBetChoices: OutrightBetChoice[] = [];
    for (const outrightBetChoiceResponse of outrightBetChoicesResponse) {
      const button: Button = await this.#createButton(
        outrightBetChoiceResponse["button_id"]
      );

      const contenderId = outrightBetChoiceResponse["contender_id"];
      const contender: Team | Individual =
        contenderType == ContenderType.Team
          ? await this.#createTeam(contenderId)
          : await this.#createIndividual(contenderId);

      outrightBetChoices.push(
        new OutrightBetChoice(
          outrightBetChoiceResponse["id"],
          contender,
          button
        )
      );
    }

    return outrightBetChoices;
  }

  async #createOutrightBetsForEvent(eventId: Id, eventType: EventType) {
    const outrightBetsResponse =
      await leagueStateFetcherDao.getOutrightBetsForEvent(eventId, eventType);

    let outrightBets: OutrightBet[] = [];
    for (const outrightBetResponse of outrightBetsResponse) {
      const outrightBetChoices: OutrightBetChoice[] =
        await this.#createOutrightBetChoices(
          outrightBetResponse["outright_bet_choice_ids"],
          outrightBetResponse["contender_type"]
        );
      outrightBets.push(
        new OutrightBet(
          outrightBetResponse["id"],
          outrightBetResponse["title"],
          outrightBetChoices,
          outrightBetResponse["scheduled_completion_time"],
          outrightBetResponse["contender_type"],
          outrightBetResponse["symbol"],
          outrightBetResponse["event_id"],
          outrightBetResponse["event_type"]
        )
      );
    }

    return outrightBets;
  }

  async #createSeason(seasonResponse: any): Promise<Season> {
    const seasonId: Id = seasonResponse["id"];
    const seasonName: Id = seasonResponse["name"];

    let games: Game[] = [];
    const gameResponses = await leagueStateFetcherDao.getAllGames(seasonId);
    for (const gameResponse of gameResponses) {
      const game: Game = await this.#createGame(gameResponse);
      games.push(game);
    }

    const outrightBets: OutrightBet[] = await this.#createOutrightBetsForEvent(
      seasonId,
      EventType.Season
    );

    return new Season(seasonId, seasonName, games, outrightBets);
  }

  async #createIndividual(individualResponse: any): Promise<Individual> {
    return new Individual(
      individualResponse["id"],
      individualResponse["display_name"],
      individualResponse["abbreviated_name"],
      individualResponse["dateOfBirth"]
    );
  }

  async getLeagueState(league: League): Promise<LeagueState> {
    const leagueId: Id = getLeagueAsDatabaseId(league);

    const seasonsResponse = await leagueStateFetcherDao.getAllSeasons(leagueId);
    let seasons: Season[] = [];
    for (const seasonResponse of seasonsResponse)
      seasons.push(await this.#createSeason(seasonResponse));

    const individualsResponse = await leagueStateFetcherDao.getAllIndividuals(
      leagueId
    );
    let individuals: Individual[] = [];
    for (const individualResponse of individualsResponse)
      individuals.push(await this.#createIndividual(individualResponse));

    const conferencesResponse =
      await leagueStateFetcherDao.getConferencesInLeague(leagueId);
    let conferences: Conference[] = [];
    for (const conferenceResponse of conferencesResponse)
      conferences.push(await this.#createConference(conferenceResponse));

    return new LeagueState(leagueId, seasons, individuals, conferences);
  }
}

const leagueStateFetcherService = new LeagueStateFetcherService();
export default leagueStateFetcherService;
