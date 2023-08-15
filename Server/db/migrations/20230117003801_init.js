/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return Promise.resolve()
        .then(() => knex.schema.createTable('fills', (table) => {
            table.increments('id');
            table.bigint('aggressive_bet_id').notNullable();
            table.bigint('passive_bet_id').notNullable();
            table.bigint('aggressive_wager_amount').notNullable();
            table.bigint('passive_wager_amount').notNullable();
            table.bigint('passive_line').notNullable();
            table.boolean('aggressive_fully_filled').notNullable();
            table.boolean('passive_fully_filled').notNullable();
            table.timestamps(true, true);
        }))
        .then(() => knex.schema.alterTable("fills", (table) => {
            table.enu('aggressive_book_side',
                ['bid', 'ask'],
                { useNative: true, enumName: 'side' }).notNullable();
        }));
};
  
/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    //THERE IS NO WAY BACK
};
