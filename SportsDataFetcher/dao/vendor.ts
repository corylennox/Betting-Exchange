import db from "../bettingexchangecommon/db/db";

import { Id } from "../bettingexchangecommon/datatypes/Id";

export function InvalidId() {
  return "invalidId";
}

/**
 * All get() or has() functions search the database by vendor id.
 */
class VendorDao {
  async getIndividualId(vendorId: Id) {
    let [ret] = await db("individuals")
      .where("vendor_id", vendorId)
      .returning("id")
      .catch((error) => {
        console.error("Error in getIndividualId():", error);
        throw error; // Rethrow the error to stop script execution
      });

    return ret ? ret["id"] : InvalidId();
  }

  async getTeamId(vendorId: Id) {
    let [ret] = await db("teams")
      .where("vendor_id", vendorId)
      .returning("id")
      .catch((error) => {
        console.error("Error in getTeamId():", error);
        throw error; // Rethrow the error to stop script execution
      });

    return ret ? ret["id"] : InvalidId();
  }

  async getGameId(vendorId: Id) {
    let [ret] = await db("games")
      .where("vendor_id", vendorId)
      .returning("id")
      .catch((error) => {
        console.error("Error in getGameId():", error);
        throw error; // Rethrow the error to stop script execution
      });

    return ret ? ret["id"] : InvalidId();
  }

  async getSeasonId(vendorId: Id) {
    let [ret] = await db("seasons")
      .where("vendor_id", vendorId)
      .returning("id")
      .catch((error) => {
        console.error("Error in getSeasonId():", error);
        throw error; // Rethrow the error to stop script execution
      });

    console.log(`Ret: ${JSON.stringify(ret)}`);
    return ret ? ret["id"] : InvalidId();
  }

  async addIndividual(
    display_name: string,
    abbreviated_name: string,
    date_of_birth: Date,
    vendor_id: Id
  ) {
    let [ret] = await db("individuals")
      .insert({
        display_name: display_name,
        abbreviated_name: abbreviated_name,
        date_of_birth: date_of_birth,
        vendor_id: vendor_id,
      })
      .returning("id")
      .catch((error) => {
        console.error("Error in addIndividual():", error);
        throw error; // Rethrow the error to stop script execution
      });

    const individualId = ret["id"];
    return individualId;
  }

  async addTeam(
    name: string,
    market: string,
    alias: string,
    image_url: string,
    vendor_id: Id
  ) {
    let [ret] = await db("teams")
      .insert({
        name: name,
        market: market,
        alias: alias,
        image_url: image_url,
        vendor_id: vendor_id,
      })
      .returning("id")
      .catch((error) => {
        console.error("Error in addTeam():", error);
        throw error; // Rethrow the error to stop script execution
      });

    const teamId = ret["id"];
    return teamId;
  }

  async addGame(
    contender_id_a: Id,
    contender_id_b: Id,
    vendor_id: Id,
    season_id: Id,
    scheduled_start_time: Date
  ) {
    let [ret] = await db("games")
      .insert({
        contender_id_a: contender_id_a,
        contender_id_b: contender_id_b,
        vendor_id: vendor_id,
        season_id: season_id,
        scheduled_start_time: scheduled_start_time,
      })
      .returning("id")
      .catch((error) => {
        console.error("Error in addGame():", error);
        throw error; // Rethrow the error to stop script execution
      });

    const gameId = ret["id"];
    return gameId;
  }

  async addSeason(league_id: Id, name: string, vendor_id: Id) {
    let [ret] = await db("seasons")
      .insert({
        league_id: league_id,
        name: name,
        vendor_id: vendor_id,
      })
      .returning("id")
      .catch((error) => {
        console.error("Error in addSeason():", error);
        throw error; // Rethrow the error to stop script execution
      });

    const seasonId = ret["id"];
    return seasonId;
  }
}

const vendorDao = new VendorDao();
export default vendorDao;
