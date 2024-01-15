import db from "../bettingexchangecommon/db/db";

import { Id } from "../bettingexchangecommon/datatypes/Id";
import { BetType } from "../bettingexchangecommon/datatypes/BetType";
import { enumToString } from "../bettingexchangecommon/enumUtils";
import { BetEventType } from "../bettingexchangecommon/datatypes/BetEventType";

export function InvalidId() {
  return "invalidId";
}

class BetEventInsertionDao {
  async getAllGameIds(league_id: Id) {
    const gameIds = await db
      .select("games.id")
      .from("games")
      .join("seasons", "games.season_id", "=", "seasons.id")
      .join("leagues", "seasons.league_id", "=", "leagues.id")
      .where("leagues.id", league_id);
    return gameIds ? gameIds.map((gameIdObject) => gameIdObject["id"]) : [];
  }

  async getGameBetEventId(game_id: Id) {
    let [ret] = await db("game_bets")
      .where("game_id", game_id)
      .returning("id")
      .catch((error) => {
        console.error("Error in getGameBetEventId():", error);
        throw error; // Rethrow the error to stop script execution
      });

    return ret ? ret["id"] : InvalidId();
  }

  async addGameBetEvent(game_id: Id) {
    // insert the game bet and the button ids for the game bet in one go
    const ret = await db.transaction(async (trx) => {
      try {
        const betEventType = BetEventType.Game;
        let [spreadButtonIdA] = await trx("button_ids")
          .insert({
            bet_event_type: betEventType,
            bet_type: BetType.Spread,
          })
          .returning("id");
        let [moneyButtonIdA] = await trx("button_ids")
          .insert({
            bet_event_type: betEventType,
            bet_type: BetType.Money,
          })
          .returning("id");
        let [totalButtonIdA] = await trx("button_ids")
          .insert({
            bet_event_type: betEventType,
            bet_type: BetType.Total,
          })
          .returning("id");
        let [spreadButtonIdB] = await trx("button_ids")
          .insert({
            bet_event_type: betEventType,
            bet_type: BetType.Spread,
          })
          .returning("id");
        let [moneyButtonIdB] = await trx("button_ids")
          .insert({
            bet_event_type: betEventType,
            bet_type: BetType.Money,
          })
          .returning("id");
        let [totalButtonIdB] = await trx("button_ids")
          .insert({
            bet_event_type: betEventType,
            bet_type: BetType.Total,
          })
          .returning("id");

        spreadButtonIdA = spreadButtonIdA["id"];
        moneyButtonIdA = moneyButtonIdA["id"];
        totalButtonIdA = totalButtonIdA["id"];
        spreadButtonIdB = spreadButtonIdB["id"];
        moneyButtonIdB = moneyButtonIdB["id"];
        totalButtonIdB = totalButtonIdB["id"];

        let [gameBetEventId] = await trx("game_bets")
          .insert({
            game_id: game_id,
            spread_button_id_a: spreadButtonIdA,
            money_button_id_a: moneyButtonIdA,
            total_button_id_a: totalButtonIdA,
            spread_button_id_b: spreadButtonIdB,
            money_button_id_b: moneyButtonIdB,
            total_button_id_b: totalButtonIdB,
          })
          .returning("id");
        gameBetEventId = gameBetEventId["id"];

        const buttonIdsToUpdate = [
          spreadButtonIdA,
          moneyButtonIdA,
          totalButtonIdA,
          spreadButtonIdB,
          moneyButtonIdB,
          totalButtonIdB,
        ];
        await trx("button_ids")
          .whereIn("id", buttonIdsToUpdate)
          .update({ bet_event_id: gameBetEventId });
        await trx.commit();
        return gameBetEventId;
      } catch (error) {
        // Rollback the transaction in case of an error
        await trx.rollback();
        console.error("Error in addGameBetEvent()", error);
        return false;
      }
    });
    return ret ? ret : InvalidId();
  }
}

const betEventInsertionDao = new BetEventInsertionDao();
export default betEventInsertionDao;
