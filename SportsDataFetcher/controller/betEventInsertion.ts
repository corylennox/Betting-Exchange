import stringify from "../bettingexchangecommon/src/stringify";
import betEventInsertionService from "../service/betEventInsertion";
import { League } from "../bettingexchangecommon/datatypes/League";
import { GameBet } from "../datatypes/vendor/GameBet";
import { Id } from "../bettingexchangecommon/datatypes/Id";

export class BetEventInsertionController {
  league: League;

  constructor(league: League) {
    this.league = league;
  }

  /**
   * Creates a GameBet entry in the database for every Game in the given league.
   *
   * @returns true upon success, string with error reason upon failure.
   */
  async updateDatabase(): Promise<boolean | string> {
    const gameIds: Id[] = await betEventInsertionService.getAllGameIds(
      this.league
    );
    let gameBetEvents: GameBet[] = [];
    for (const gameId of gameIds) {
      let gameBetEvent = new GameBet();
      gameBetEvent.gameId = gameId;
      gameBetEvents.push(gameBetEvent);
    }

    for (const gameBetEvent of gameBetEvents) {
      if (!(await betEventInsertionService.hasGameBetEvent(gameBetEvent))) {
        if (
          !(await betEventInsertionService.canAddGameBetEvent(gameBetEvent))
        ) {
          return `Cannot add GameBetEvent ${stringify(gameBetEvent)}`;
        } else {
          await betEventInsertionService.addGameBetEvent(gameBetEvent);
          console.log(
            `Added GameBetEvent to database: ${stringify(gameBetEvent)}`
          );
        }
      } else {
        console.log(`Skipping adding GameBetEvent: ${stringify(gameBetEvent)}`);
      }
    }

    console.log("finished updating database");
    return true;
  }
}
