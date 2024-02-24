require("dotenv").config(); // loads environment variables from .env file
import db from "@openbook/common/db/db";
import { League } from "@openbook/common/datatypes/League";
import { LeagueStateFetcherController } from "@openbook/common/controller/leagueStateFetcher";
import { BetEventInsertionController } from "./controller/betEventInsertion";
import { LeagueState } from "@openbook/common/datatypes/db/LeagueState";
import logObject from "@openbook/common/src/logObject";

// Usage example:
(async () => {
  try {
    const gameBetEventInserter = new BetEventInsertionController(League.NFL);
    const gameBetEventInsertionResult: boolean | string =
      await gameBetEventInserter.updateDatabase();
    if (!(gameBetEventInsertionResult === true))
      throw new Error(
        `Error adding to database: ${gameBetEventInsertionResult}`
      );

    const leagueStateFetcher = new LeagueStateFetcherController(League.NFL);
    const leagueStateFetchResult: boolean | string =
      await leagueStateFetcher.fetch();
    if (!(leagueStateFetchResult === true)) {
      throw new Error(
        `Error fetching league state after inserting game bets: ${leagueStateFetchResult}`
      );
    }
  } catch (error) {
    console.error(
      "Failed to fetch data or failed to insert into database:",
      error
    );
  } finally {
    await db.destroy();
  }
})();
