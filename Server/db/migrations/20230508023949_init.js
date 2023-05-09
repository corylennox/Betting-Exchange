/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  // Create a new enum with the desired name
  await knex.raw(`
    CREATE TYPE order_status_enum AS ENUM (
      'received_by_backend',
      'submitted_to_matching_engine',
      'resting_on_matching_engine',
      'cancelled_by_exchange',
      'cancelled_by_user',
      'fully_filled'
    );
  `);

  // Create a temporary column with the new enum type
  await knex.schema.table("confirmed_bets", (table) => {
    table.specificType("temp_order_status", "order_status_enum");
  });

  // Copy data from the original column to the temporary column
  await knex.raw(`
    UPDATE confirmed_bets
    SET temp_order_status = order_status::text::order_status_enum;
  `);

  // Drop the original column
  await knex.schema.table("confirmed_bets", (table) => {
    table.dropColumn("order_status");
  });

  // Rename the temporary column to the original column name
  await knex.schema.table("confirmed_bets", (table) => {
    table.renameColumn("temp_order_status", "order_status");
  });

  // Drop the old enum
  await knex.raw("DROP TYPE order_status;");

  // Create a custom PostgreSQL enum for bet_status
  await knex.raw(`
    CREATE TYPE bet_status_enum AS ENUM (
      'lost',
      'paid',
      'cancelled',
      'pending'
    );
  `);

  // Create a temporary column with the custom bet_status_enum type
  await knex.schema.table("confirmed_bets", (table) => {
    table.specificType("temp_bet_status", "bet_status_enum");
  });

  // Update the temporary column with random values for bet_status_enum
  await knex("confirmed_bets").update({
    temp_bet_status: knex.raw(
      "(enum_range(NULL::bet_status_enum))[floor(random() * 4) + 1]"
    ),
  });

  // Drop the original bet_status column
  await knex.schema.table("confirmed_bets", (table) => {
    table.dropColumn("bet_status");
  });

  // Rename the temporary column to bet_status
  await knex.schema.table("confirmed_bets", (table) => {
    table.renameColumn("temp_bet_status", "bet_status");
  });

  // Update the existing rows with random values for the order_status and bet_status columns
  await knex("confirmed_bets").update({
    order_status: knex.raw(
      "(enum_range(NULL::order_status_enum))[floor(random() * 6) + 1]"
    ),
    bet_status: knex.raw(
      "(enum_range(NULL::bet_status_enum))[floor(random() * 4) + 1]"
    ),
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  // Recreate the original order_status enum
  await knex.raw(`
    CREATE TYPE order_status AS ENUM (
      'received_by_backend',
      'submitted_to_matching_engine',
      'resting_on_matching_engine',
      'cancelled_by_exchange',
      'cancelled_by_user',
      'fully_filled'
    );
  `);

  // Create a temporary column with the original enum type
  await knex.schema.table("confirmed_bets", (table) => {
    table.specificType("temp_order_status", "order_status");
  });

  // Copy data from the current column to the temporary column
  await knex.raw(`
    UPDATE confirmed_bets
    SET temp_order_status = order_status::text::order_status;
  `);

  // Drop the current column
  await knex.schema.table("confirmed_bets", (table) => {
    table.dropColumn("order_status");
  });

  // Rename the temporary column to the original column name
  await knex.schema.table("confirmed_bets", (table) => {
    table.renameColumn("temp_order_status", "order_status");
  });

  // Drop the new order_status_enum
  await knex.raw("DROP TYPE order_status_enum;");

  // Create a temporary column with the original bet_status type (text)
  await knex.schema.table("confirmed_bets", (table) => {
    table.text("temp_bet_status");
  });

  // Copy data from the current bet_status column to the temporary column
  await knex.raw(`
    UPDATE confirmed_bets
    SET temp_bet_status = bet_status::text;
  `);

  // Drop the current bet_status column
  await knex.schema.table("confirmed_bets", (table) => {
    table.dropColumn("bet_status");
  });

  // Rename the temporary column back to bet_status
  await knex.schema.table("confirmed_bets", (table) => {
    table.renameColumn("temp_bet_status", "bet_status");
  });

  // Drop the bet_status_enum
  await knex.raw("DROP TYPE bet_status_enum;");
};
