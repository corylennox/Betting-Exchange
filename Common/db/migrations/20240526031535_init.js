/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.alterTable("outright_bets", (table) => {
    table.dropColumn("scheduled_completion_time");
    table.dropColumn("symbol");
    table.dropColumn("event_type");
  });
  await knex.raw("DROP TYPE event_type");
  await knex.schema.alterTable("outright_bets", (table) => {
    table
      .enu(
        "event_type",
        [
          "division_winner",
          "conference_winner",
          "postseason_champion",
          "league_mvp",
        ],
        {
          useNative: true,
          enumName: "event_type",
        }
      )
      .notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  return Promise.all([]);
};
