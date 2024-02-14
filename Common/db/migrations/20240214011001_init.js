/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return Promise.all([
    knex.schema.alterTable("outright_bets", (table) => {
      table.dropColumn("league_id");
      table.bigint("event_id").notNullable();
      table
        .enu("event_type", ["season", "game"], {
          useNative: true,
          enumName: "event_type",
        })
        .notNullable();
    }),
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return Promise.all([]);
};
