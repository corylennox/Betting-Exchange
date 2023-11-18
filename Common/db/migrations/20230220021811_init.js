/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return Promise.resolve()
        .then(() => knex.schema.createTable('balances', (table) => {
            table.increments('id');
            table.string('user_id').notNullable();
            table.bigint('available_balance').notNullable().defaultTo(0);
            table.bigint('escrow_balance').notNullable().defaultTo(0);
            table.timestamps(true, true);
        }));
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  // THERE IS NO WAY BACK
};
