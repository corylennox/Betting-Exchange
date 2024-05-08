import betEventInsertionDao, { InvalidId } from "../dao/betEventInsertion";

import { Id } from "@openbook/common";
import { GameBet } from "../datatypes/vendor/GameBet";
import { League, getLeagueAsDatabaseId } from "@openbook/common";
import { Individual } from "@openbook/common";
import { Team } from "@openbook/common";
import { BetEventType } from "@openbook/common";
import { ContenderType } from "@openbook/common";

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
