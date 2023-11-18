/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("teams", (table) => {
      table.increments("id");
      table.string("name").notNullable();
      table.string("market").notNullable();
      table.string("alias").notNullable();
      table.string("image_url").notNullable();
    }),
    knex.schema.createTable("players", (table) => {
      table.increments("id");
      table.string("display_name").notNullable();
      table.string("abbreviated_name").notNullable();
      table.date("date_of_birth").notNullable();
    }),
    knex.schema.createTable("games", (table) => {
      table.increments("id");
      table.bigint("contender_id_a").notNullable();
      table.bigint("contender_id_b").notNullable();
      table.timestamp("scheduled_start_time").notNullable();
    }),
    knex.schema.createTable("button_ids", (table) => {
      table.increments("id");
      table.bigint("bet_event_id").notNullable();
      table
        .enu("bet_event_type", ["game", "outright"], {
          useNative: true,
          enumName: "bet_event_type",
        })
        .notNullable();
    }),
    knex.schema.createTable("outright_bet_choices", (table) => {
      table.increments("id");
      table.bigint("contender_id").notNullable();
      table.bigint("button_id").notNullable();
    }),
    knex.schema.createTable("outright_bets", (table) => {
      table.increments("id");
      table.string("bet_title").notNullable();
      table.specificType("outright_bet_choice_ids", "bigint[]").notNullable();
      table.timestamp("scheduled_completion_time").notNullable();
      table
        .enu("contender_type", ["player", "team"], {
          useNative: true,
          enumName: "contender_type",
        })
        .notNullable();
    }),
    knex.schema.createTable("game_bets", (table) => {
      table.increments("id");
      table.string("bet_title").notNullable();
      table.bigint("game_id").notNullable();
      table.bigint("spread_button_id_a").notNullable();
      table.bigint("money_button_id_a").notNullable();
      table.bigint("total_button_id_a").notNullable();
      table.bigint("spread_button_id_b").notNullable();
      table.bigint("money_button_id_b").notNullable();
      table.bigint("total_button_id_b").notNullable();
    }),
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  // THERE IS NO WAY BACK
};
