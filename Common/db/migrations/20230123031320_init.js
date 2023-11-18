/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return Promise.resolve()
        .then(() => knex.schema.createTable('stripe_accounts', (table) => {
            table.increments('id');
            table.string('email').notNullable();
            table.string('stripe_account_id').notNullable();
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
