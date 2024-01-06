/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("conferences", (table) => {
      table.increments("id");
      table.string("name").notNullable();
      table.bigint("league_id").notNullable();
      table.string("vendor_id").notNullable();
    }),
    knex.schema.createTable("divisions", (table) => {
      table.increments("id");
      table.string("name").notNullable();
      table.bigint("conference_id").notNullable();
      table.string("vendor_id").notNullable();
    }),
    knex.schema.alterTable("teams", (table) => {
      table.bigint("division_id").notNullable();
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
