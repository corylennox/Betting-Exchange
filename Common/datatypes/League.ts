export enum League {
  NFL = 1, // start at index 1 because Postgres auto-increment primary keys start at 1
}

export function getLeagueAsString(league: League) {
  const keys = Object.keys(League).filter((key) => isNaN(Number(key)));
  const key = keys.find((k) => (League as any)[k] === league);
  return key || "UnknownId";
}
