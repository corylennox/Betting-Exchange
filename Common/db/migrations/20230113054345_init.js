/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return Promise.resolve()
    .then(() => knex.schema.alterTable("confirmed_bets", (table) => {
        // intentionally empty for testing
    })
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return Promise.resolve()
        .then(() => knex.schema.alterTable("confirmed_bets", (table) => {
            // intentionally empty for testing
        })
    );
};
