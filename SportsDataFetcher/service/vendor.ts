import vendorDao, { InvalidId } from "../dao/vendor";

import { Id } from "../datatypes/vendor/Id";
import { Game } from "../datatypes/vendor/Game";
import { Team } from "../datatypes/vendor/Team";
import { Season } from "../datatypes/vendor/Season";
import { Individual } from "../datatypes/vendor/Individual";

class VendorService {
  // These members below are for caching vendorId -> id lookups to reduce database access frequency
  individualVendorIdToIndividualIdMap: Map<Id, Id>;
  teamVendorIdToTeamIdMap: Map<Id, Id>;
  gameVendorIdToTeamIdMap: Map<Id, Id>;
  seasonVendorIdToTeamIdMap: Map<Id, Id>;

  constructor() {
    this.individualVendorIdToIndividualIdMap = new Map<Id, Id>();
    this.teamVendorIdToTeamIdMap = new Map<Id, Id>();
    this.gameVendorIdToTeamIdMap = new Map<Id, Id>();
    this.seasonVendorIdToTeamIdMap = new Map<Id, Id>();
  }

  async hasIndividual(vendorId: Id) {
    if (this.individualVendorIdToIndividualIdMap.has(vendorId))
      return this.individualVendorIdToIndividualIdMap.get(vendorId);
    const individualId: Id = await vendorDao.getIndividualId(vendorId);
    if (individualId != InvalidId()) {
      this.individualVendorIdToIndividualIdMap.set(vendorId, individualId);
      return true;
    } else return false;
  }

  async hasTeam(vendorId: Id) {
    if (this.teamVendorIdToTeamIdMap.has(vendorId))
      return this.teamVendorIdToTeamIdMap.get(vendorId);
    const teamId: Id = await vendorDao.getTeamId(vendorId);
    if (teamId != InvalidId()) {
      this.teamVendorIdToTeamIdMap.set(vendorId, teamId);
      return true;
    } else return false;
  }

  async hasGame(vendorId: Id) {
    if (this.gameVendorIdToTeamIdMap.has(vendorId))
      return this.gameVendorIdToTeamIdMap.get(vendorId);
    const gameId: Id = await vendorDao.getGameId(vendorId);
    if (gameId != InvalidId()) {
      this.gameVendorIdToTeamIdMap.set(vendorId, gameId);
      return true;
    } else return false;
  }

  async hasSeason(vendorId: Id) {
    if (this.seasonVendorIdToTeamIdMap.has(vendorId))
      return this.seasonVendorIdToTeamIdMap.get(vendorId);
    const seasonId: Id = await vendorDao.getSeasonId(vendorId);
    if (seasonId != InvalidId()) {
      this.seasonVendorIdToTeamIdMap.set(vendorId, seasonId);
      return true;
    } else return false;
  }

  async canAddIndividual(individual: Individual) {
    return !(await this.hasIndividual(individual.vendorId));
  }

  async canAddTeam(team: Team) {
    return !(await this.hasTeam(team.vendorId));
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
    return !(await this.hasSeason(season.vendorId));
  }

  async addIndividual(individual: Individual): Promise<Id> {
    return await vendorDao.addIndividual(
      individual.displayName,
      individual.abbreviatedName,
      individual.dateOfBirth,
      individual.vendorId
    );
  }

  async addTeam(team: Team, imageUrl: string): Promise<Id> {
    return await vendorDao.addTeam(
      team.name,
      team.market,
      team.alias,
      imageUrl,
      team.vendorId
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
}

const vendorService = new VendorService();
export default vendorService;
