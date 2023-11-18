/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return Promise.resolve()
        .then(() => knex.schema.alterTable('stripe_accounts', (table) => {
            table.string('user_id').notNullable();
        }));
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  // THERE IS NO WAY BACK
};
