/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return Promise.resolve()
      .then(() => knex.schema.alterTable("confirmed_bets", (table) => {
          table.enu('bet_status',
              ['received_by_backend', 'submitted_to_matching_engine', 'resting_on_matching_engine', 'cancelled_by_exchange', 'cancelled_by_user', 'fully_filled'],
              { useNative: true, enumName: 'bet_status' }).notNullable().defaultTo('fully_filled');
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
              table.dropColumn('bet_status')
          })
      );
  };
  