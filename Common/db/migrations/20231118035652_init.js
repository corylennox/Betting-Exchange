/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return Promise.all([
    knex.schema.alterTable("games", (table) => {
      table.dropColumn("scheduled_start_time");
    }),
    knex.schema.renameTable("players", "individuals"),
    knex.raw(`
        ALTER TYPE contender_type RENAME VALUE 'player' TO 'individual';
    `),
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
