/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return Promise.all([
    knex.schema.alterTable("button_ids", (table) => {
      table.bigint("bet_event_id").nullable().alter();
    }),
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return Promise.all([
    knex.schema.alterTable("button_ids", (table) => {
      table.bigint("bet_event_id").notNullable().alter();
    }),
  ]);
};
