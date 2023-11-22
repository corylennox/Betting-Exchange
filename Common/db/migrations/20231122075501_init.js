/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return Promise.all([
    knex.schema.alterTable("games", (table) => {
      table.string("vendor_id").notNullable();
      table.bigint("season_id"); // purposely nullable if a league (like boxing?) doesn't have seasons
    }),
    knex.schema.alterTable("individuals", (table) => {
      table.string("vendor_id").notNullable();
    }),
    knex.schema.alterTable("teams", (table) => {
      table.string("vendor_id").notNullable();
    }),
    knex.schema.createTable("season", (table) => {
      table.increments("id");
      table.bigint("league_id").notNullable();
      table.string("name").notNullable();
      table.string("vendor_id").notNullable();
    }),
    knex.schema.createTable("league", (table) => {
      table.increments("id");
      table.bigint("sport_id").notNullable();
      table.string("name").notNullable();
      table.string("vendor_id").notNullable();
      table.string("image_url").notNullable();
    }),
    knex.schema.createTable("sport", (table) => {
      table.increments("id");
      table.string("name").notNullable();
      table.string("image_url").notNullable();
    }),
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
