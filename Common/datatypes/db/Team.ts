import { Id } from "../Id";

export class Team {
  id: Id;
  name: string;
  market: string;
  alias: string;
  imageUrl: string;

  // construct from database response object
  constructor(
    id: Id,
    name: string,
    market: string,
    alias: string,
    imageUrl: string
  ) {
    this.name = name;
    this.market = market;
    this.alias = alias;
    this.imageUrl = imageUrl;
  }
}
