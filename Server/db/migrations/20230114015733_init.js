/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return Promise.resolve()
        .then(() => knex.schema.alterTable("confirmed_bets", (table) => {
                // changes default value to received_by_backend so that this is the value upon new row insertion
                table.enu('bet_status', null, { useNative: true, existingType: true, enumName: 'bet_status' })
                    .notNullable()
                    .defaultTo('received_by_backend')
                    .alter();
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
                table.enu('bet_status', null, { useNative: true, existingType: true, enumName: 'bet_status' })
                    .notNullable()
                    .defaultTo('fully_filled')
                    .alter();
            })
        );
};
