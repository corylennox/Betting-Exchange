/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  return knex.schema.createTable('bet_submission', table => {
    table.increments('id');
    table.bigint('user_id').notNullable();
    table.bigint('time_placed').notNullable();
    table.bigint('wager_amount').notNullable();
    table.bigint('total_payout').notNullable();
    table.bigint('line').notNullable();
    table.bigint('button_id').notNullable();
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  return knex.schema.dropTable('bet_submission')
};
