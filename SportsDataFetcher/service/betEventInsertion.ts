import betEventInsertionDao, { InvalidId } from "../dao/betEventInsertion";

import { Id } from "../bettingexchangecommon/datatypes/Id";
import { GameBet } from "../datatypes/vendor/GameBet";
import { League } from "../bettingexchangecommon/datatypes/League";

class BetEventInsertionService {
  async getAllGameIds(league: League): Promise<Id[]> {
    return await betEventInsertionDao.getAllGameIds(
      (league as number).toString()
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
}

const betEventInsertionService = new BetEventInsertionService();
export default betEventInsertionService;
