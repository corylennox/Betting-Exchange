/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return Promise.all([
    knex.schema.alterTable("button_ids", (table) => {
      table
        .enu("bet_type", ["spread", "money", "total", "outright", "prop"], {
          useNative: true,
          enumName: "bet_type",
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
