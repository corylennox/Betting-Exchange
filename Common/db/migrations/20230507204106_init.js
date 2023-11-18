/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  // Create new enum with the desired name
  await knex.raw(
    "CREATE TYPE order_status AS ENUM ('received_by_backend', 'submitted_to_matching_engine', 'resting_on_matching_engine', 'cancelled_by_exchange', 'cancelled_by_user', 'fully_filled');"
  );

  // Alter the table to use the new enum type for the bet_status column
  await knex.schema.alterTable("confirmed_bets", (table) => {
    table
      .enu(
        "bet_status",
        [
          "received_by_backend",
          "submitted_to_matching_engine",
          "resting_on_matching_engine",
          "cancelled_by_exchange",
          "cancelled_by_user",
          "fully_filled",
        ],
        { useNative: true, enumName: "order_status", existingType: true }
      )
      .notNullable()
      .defaultTo("received_by_backend")
      .alter();
  });

  // Drop the old enum
  await knex.raw("DROP TYPE bet_status;");

  // Rename the bet_status column to order_status
  await knex.schema.table("confirmed_bets", (table) => {
    table.renameColumn("bet_status", "order_status");
  });

  // Add a new bet_status column with one of the four values as a default value
  await knex.schema.table("confirmed_bets", (table) => {
    table
      .enu("bet_status", ["paid", "lost", "cancelled", "pending"])
      .defaultTo("pending");
  });

  // Update the existing rows with random values for the bet_status column
  await knex("confirmed_bets").update({
    bet_status: knex.raw(
      "CASE WHEN RANDOM() < 0.25 THEN 'paid' WHEN RANDOM() < 0.5 THEN 'lost' WHEN RANDOM() < 0.75 THEN 'cancelled' ELSE 'pending' END"
    ),
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  // Drop the new bet_status column
  await knex.schema.table("confirmed_bets", (table) => {
    table.dropColumn("bet_status");
  });

  // Rename the order_status column back to bet_status
  await knex.schema.table("confirmed_bets", (table) => {
    table.renameColumn("order_status", "bet_status");
  });

  // Alter the table to use the original enum type for the bet_status column
  await knex.schema.alterTable("confirmed_bets", (table) => {
    table
      .enu(
        "bet_status",
        [
          "received_by_backend",
          "submitted_to_matching_engine",
          "resting_on_matching_engine",
          "cancelled_by_exchange",
          "cancelled_by_user",
          "fully_filled",
        ],
        { useNative: true, enumName: "bet_status", existingType: true }
      )
      .notNullable()
      .defaultTo("received_by_backend")
      .alter();
  });

  // Drop the new enum and recreate the old enum
  await knex.raw("DROP TYPE order_status;");
  await knex.raw(
    "CREATE TYPE bet_status AS ENUM ('received_by_backend', 'submitted_to_matching_engine', 'resting_on_matching_engine', 'cancelled_by_exchange', 'cancelled_by_user', 'fully_filled');"
  );
};
