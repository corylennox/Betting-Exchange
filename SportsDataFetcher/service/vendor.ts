import vendorDao, { InvalidId } from "../dao/vendor";

import { Id } from "@openbook/common";
import { Game } from "../datatypes/vendor/Game";
import { Team } from "../datatypes/vendor/Team";
import { Season } from "../datatypes/vendor/Season";
import { Individual } from "../datatypes/vendor/Individual";
import { enumToNumber } from "@openbook/common";
import { League } from "@openbook/common";
import { Division } from "../datatypes/vendor/Division";
import { Conference } from "../datatypes/vendor/Conference";

class VendorService {
  // These members below are for caching vendorId -> id lookups to reduce database access frequency
  individualVendorIdToIndividualIdMap: Map<Id, Id>;
  teamVendorIdToTeamIdMap: Map<Id, Id>;
  gameVendorIdToTeamIdMap: Map<Id, Id>;
  seasonVendorIdToTeamIdMap: Map<Id, Id>;
  conferenceVendorIdToConferenceIdMap: Map<Id, Id>;
  divisionVendorIdToDivisionIdMap: Map<Id, Id>;
  leagueIdSet: Set<Id>;

  constructor() {
    this.individualVendorIdToIndividualIdMap = new Map<Id, Id>();
    this.teamVendorIdToTeamIdMap = new Map<Id, Id>();
    this.gameVendorIdToTeamIdMap = new Map<Id, Id>();
    this.seasonVendorIdToTeamIdMap = new Map<Id, Id>();
    this.conferenceVendorIdToConferenceIdMap = new Map<Id, Id>();
    this.divisionVendorIdToDivisionIdMap = new Map<Id, Id>();
    this.leagueIdSet = new Set<Id>();
  }

  async hasIndividual(vendorId: Id): Promise<boolean> {
    if (this.individualVendorIdToIndividualIdMap.has(vendorId)) return true;
    const individualId: Id = await vendorDao.getIndividualId(vendorId);
    if (individualId != InvalidId()) {
      this.individualVendorIdToIndividualIdMap.set(vendorId, individualId);
      return true;
    } else return false;
  }

  async hasTeam(vendorId: Id): Promise<boolean> {
    if (this.teamVendorIdToTeamIdMap.has(vendorId)) return true;
    const teamId: Id = await vendorDao.getTeamId(vendorId);
    if (teamId != InvalidId()) {
      this.teamVendorIdToTeamIdMap.set(vendorId, teamId);
      return true;
    } else return false;
  }

  async hasGame(vendorId: Id): Promise<boolean> {
    if (this.gameVendorIdToTeamIdMap.has(vendorId)) return true;
    const gameId: Id = await vendorDao.getGameId(vendorId);
    if (gameId != InvalidId()) {
      this.gameVendorIdToTeamIdMap.set(vendorId, gameId);
      return true;
    } else return false;
  }

  async hasSeason(vendorId: Id): Promise<boolean> {
    if (this.seasonVendorIdToTeamIdMap.has(vendorId)) return true;
    const seasonId: Id = await vendorDao.getSeasonId(vendorId);
    if (seasonId != InvalidId()) {
      this.seasonVendorIdToTeamIdMap.set(vendorId, seasonId);
      return true;
    } else return false;
  }

  async hasConference(vendorId: Id): Promise<boolean> {
    if (this.conferenceVendorIdToConferenceIdMap.has(vendorId)) return true;
    const conferenceId: Id = await vendorDao.getConferenceId(vendorId);
    if (conferenceId != InvalidId()) {
      this.conferenceVendorIdToConferenceIdMap.set(vendorId, conferenceId);
      return true;
    } else return false;
  }

  async hasDivision(vendorId: Id): Promise<boolean> {
    if (this.divisionVendorIdToDivisionIdMap.has(vendorId)) return true;
    const divisionId: Id = await vendorDao.getDivisionId(vendorId);
    if (divisionId != InvalidId()) {
      this.divisionVendorIdToDivisionIdMap.set(vendorId, divisionId);
      return true;
    } else return false;
  }

  async hasLeague(leagueId: Id): Promise<boolean> {
    if (this.leagueIdSet.has(leagueId)) return true;
    leagueId = await vendorDao.getLeagueId(leagueId);
    if (leagueId != InvalidId()) {
      this.leagueIdSet.add(leagueId);
      return true;
    } else return false;
  }

  async canAddIndividual(individual: Individual) {
    return (
      (await this.hasLeague(individual.leagueId)) &&
      !(await this.hasIndividual(individual.vendorId))
    );
  }

  async canAddTeam(team: Team) {
    return (
      (await this.hasDivision(team.divisionVendorId)) &&
      !(await this.hasTeam(team.vendorId))
    );
  }

  async canAddGame(game: Game) {
    return (
      (await this.hasTeam(game.awayTeamVendorId)) &&
      (await this.hasTeam(game.homeTeamVendorId)) &&
      (await this.hasSeason(game.seasonVendorId)) &&
      !(await this.hasGame(game.vendorId))
    );
  }

  async canAddSeason(season: Season) {
    return (
      (await this.hasLeague(season.leagueId)) &&
      !(await this.hasSeason(season.vendorId))
    );
  }

  async canAddConference(conference: Conference) {
    return (
      (await this.hasLeague(conference.leagueId)) &&
      !(await this.hasConference(conference.vendorId))
    );
  }

  async canAddDivision(division: Division) {
    return (
      (await this.hasConference(division.conferenceVendorId)) &&
      !(await this.hasDivision(division.vendorId))
    );
  }

  async addIndividual(individual: Individual): Promise<Id> {
    return await vendorDao.addIndividual(
      individual.displayName,
      individual.abbreviatedName,
      individual.dateOfBirth,
      individual.vendorId,
      individual.leagueId
    );
  }

  async addTeam(team: Team, imageUrl: string): Promise<Id> {
    const divisionId: Id = await vendorDao.getDivisionId(team.divisionVendorId);
    return await vendorDao.addTeam(
      team.name,
      team.market,
      team.alias,
      imageUrl,
      team.vendorId,
      divisionId
    );
  }

  async addGame(game: Game): Promise<Id> {
    const awayTeamId: Id = await vendorDao.getTeamId(game.awayTeamVendorId);
    const homeTeamId: Id = await vendorDao.getTeamId(game.homeTeamVendorId);
    const seasonId: Id = await vendorDao.getSeasonId(game.seasonVendorId);
    return await vendorDao.addGame(
      awayTeamId,
      homeTeamId,
      game.vendorId,
      seasonId,
      game.scheduledTime
    );
  }

  async addSeason(season: Season): Promise<Id> {
    return await vendorDao.addSeason(
      season.leagueId,
      season.seasonName,
      season.vendorId
    );
  }

  async addConference(conference: Conference): Promise<Id> {
    return await vendorDao.addConference(
      conference.leagueId,
      conference.name,
      conference.vendorId
    );
  }

  async addDivision(division: Division): Promise<Id> {
    const conferenceId: Id = await vendorDao.getConferenceId(
      division.conferenceVendorId
    );
    return await vendorDao.addDivision(
      division.name,
      conferenceId,
      division.vendorId
    );
  }
}

const vendorService = new VendorService();
export default vendorService;
