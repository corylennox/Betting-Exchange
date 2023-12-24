require("dotenv").config(); // loads environment variables from .env file
import { League } from "./bettingexchangecommon/datatypes/League";
import db from "./bettingexchangecommon/db/db";
import { BetEventInsertionController } from "./controller/betEventInsertion";

// Usage example:
(async () => {
  try {
    const betEventInserter = new BetEventInsertionController(League.NFL);
    const result: boolean | string = await betEventInserter.updateDatabase();
    if (!(result === true))
      throw new Error(`Error adding to database: ${result}`);
  } catch (error) {
    console.error(
      "Failed to fetch data or failed to insert into database:",
      error
    );
  } finally {
    await db.destroy();
  }
})();
