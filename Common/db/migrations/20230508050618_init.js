/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex("confirmed_bets")
    .whereNull("order_status")
    .update({ order_status: "received_by_backend" });
  await knex("confirmed_bets")
    .whereNull("bet_status")
    .update({ bet_status: "pending" });

  // Alter the order_status column to be not nullable and have a default value
  await knex.raw(`
    ALTER TABLE confirmed_bets 
    ALTER COLUMN order_status SET NOT NULL, 
    ALTER COLUMN order_status SET DEFAULT 'received_by_backend';
  `);

  // Alter the bet_status column to be not nullable and have a default value
  await knex.raw(`
    ALTER TABLE confirmed_bets 
    ALTER COLUMN bet_status SET NOT NULL, 
    ALTER COLUMN bet_status SET DEFAULT 'pending';
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  // Alter the order_status column to be nullable and remove the default value
  await knex.raw(`
    ALTER TABLE confirmed_bets 
    ALTER COLUMN order_status DROP NOT NULL, 
    ALTER COLUMN order_status DROP DEFAULT;
  `);

  // Alter the bet_status column to be nullable and remove the default value
  await knex.raw(`
    ALTER TABLE confirmed_bets 
    ALTER COLUMN bet_status DROP NOT NULL, 
    ALTER COLUMN bet_status DROP DEFAULT;
  `);
};
