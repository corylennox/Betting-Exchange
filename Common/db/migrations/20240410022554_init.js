/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return Promise.all([
    knex.schema.alterTable("individuals", (table) => {
      table.date("date_of_birth").nullable().alter();
    }),
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return Promise.all([
    knex.schema.alterTable("individuals", (table) => {
      table.date("date_of_birth").notNullable().alter();
    }),
  ]);
};
