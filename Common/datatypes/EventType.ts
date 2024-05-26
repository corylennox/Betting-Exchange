/**
 * Must match the Postgres db enum values
 *
 * Provides event types that an outright bet event can be associated with.
 */
export enum EventType {
  DivisionWinner = "division_winner",
  ConferenceWinner = "conference_winner",
  PostseasonChampion = "postseason_champion",
  LeagueMvp = "league_mvp",
}
