import betEventInsertionDao, { InvalidId } from "../dao/betEventInsertion";

import { Id } from "../bettingexchangecommon/datatypes/Id";
import { GameBet } from "../datatypes/vendor/GameBet";
import {
  League,
  getLeagueAsDatabaseId,
} from "../bettingexchangecommon/datatypes/League";
import { Individual } from "../bettingexchangecommon/datatypes/db/Individual";
import { Team } from "../bettingexchangecommon/datatypes/db/Team";
import { BetEventType } from "../bettingexchangecommon/datatypes/BetEventType";
import { ContenderType } from "../bettingexchangecommon/datatypes/ContenderType";

class BetEventInsertionService {
  async getAllGameIds(league: League): Promise<Id[]> {
    return await betEventInsertionDao.getAllGameIds(
      getLeagueAsDatabaseId(league)
    );
  }

  async hasGameBetEvent(gameBetEvent: GameBet) {
    const gameBetEventId: Id = await betEventInsertionDao.getGameBetEventId(
      gameBetEvent.gameId
    );
    return gameBetEventId != InvalidId();
  }

  async canAddGameBetEvent(gameBetEvent: GameBet) {
    return !(await this.hasGameBetEvent(gameBetEvent));
  }

  async addGameBetEvent(gameBetEvent: GameBet): Promise<Id> {
    return await betEventInsertionDao.addGameBetEvent(gameBetEvent.gameId);
  }

  async addOutrightBetEvent(
    betTitle: string,
    contenders: Individual[] | Team[],
    contenderType: ContenderType,
    betEventType: BetEventType,
    scheduledCompletionTime: Date,
    league: League,
    symbol: Id
  ) {
    return await betEventInsertionDao.addOutrightBetEvent(
      betTitle,
      contenders.map((contender: Individual | Team) => contender.id),
      contenderType,
      betEventType,
      scheduledCompletionTime,
      getLeagueAsDatabaseId(league),
      symbol
    );
  }
}

const betEventInsertionService = new BetEventInsertionService();
export default betEventInsertionService;
