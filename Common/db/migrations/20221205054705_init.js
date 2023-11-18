const { timeStamp } = require('console');

/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return Promise.resolve()
      .then(() => knex.schema.dropTable('confirmed_bets'))
      .then(() => knex.schema.createTable('confirmed_bets', (table) => {
          table.increments('id');
          table.string('user_id').notNullable();
          table.bigint('button_id').notNullable();
          table.bigint('line').notNullable();
          table.bigint('wager_amount').notNullable();
          table.bigint('total_payout').notNullable();
          table.bigint('commission').notNullable();
          table.bigint('time_placed').notNullable();
          table.timestamps(true, true);
        })
      );
  };
  
  /**
   * @param { import('knex').Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async function (knex) {
    //THERE IS NO WAY BACK
  };
  