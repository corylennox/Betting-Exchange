const { timeStamp } = require('console');

/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return Promise.resolve()
      .then(() => knex.schema.renameTable('confirmed_bets', 'old_confirmed_bets'))
      .then(() => knex.schema.createTable('confirmed_bets', (table) => {
          table.increments('id');
          table.string('user_id').notNullable();
          table.bigint('button_id').notNullable();
          table.bigint('line').notNullable();
          table.bigint('wager_amount').notNullable();
          table.bigint('total_payout').notNullable();
          table.bigint('commission');
          table.bigint('time_placed').notNullable();
          table.timestamps(true, true);
        })
      .then(() => knex('old_confirmed_bets').select('id', 'user_id', 'button_id', 'line', 'wager_amount', 'total_payout', 'time_placed', 'created_at', 'updated_at'))
      .then((rows) => knex('confirmed_bets').insert(rows))
      );
  };
  
  /**
   * @param { import('knex').Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async function (knex) {
    //THERE IS NO WAY BACK
  };
  