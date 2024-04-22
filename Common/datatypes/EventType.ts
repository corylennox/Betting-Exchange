/**
 * Must match the Postgres db enum values
 *
 * Provides event types that an outright bet event can be associated with.
 */
export enum EventType {
  Game = "game", // e.g., first player to score
  Season = "season", // e.g., mvp, championship winner, division winner
}
