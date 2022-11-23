const gql = require('graphql-tag');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`

  enum BetType {
    OutrightBet
    GameBet
  }

  interface Bet {
    type: BetType!
    betTitle: String!
  }

  type OutrightContender {
    name: String!
    image: String
    buttonId: ID!
  }

  type OutrightBet implements Bet {
    type: BetType!
    betTitle: String!
    contendersData: [OutrightContender]!
  }

  enum LineType {
    MoneyLine,
    SpreadLine,
    TotalLine,
  }

  type Line {
    buttonId: ID!
    type: LineType!
    value: Float!
  }

  # contains optional fields to allow for sending this type over subscription
  type LineUpdate {
    buttonId: ID
    newValue: Float
  }

  type GameContender {
    name: String!
    image: String
    spreadButtonId: ID!
    moneyButtonId: ID!
    totalButtonId: ID!
  }

  type GameBet implements Bet {
    type: BetType!
    betTitle: String!
    contender1Data: GameContender!
    contender2Data: GameContender!
  }

  type Tab {
    tabTitle: String!
    availableBets: [Bet!]!
  }

  type SportData {
    sportTitle: String!
    href: String!
    tabs: [Tab!]
  }

  type SportPane {
    sportData: SportData!
    lines: [Line!]!
  }

  type SportHighLevelData {
    title: String!
    href: String!
    sidebarIcon: String!
    sidebarAlternateIcon: String!
  }

  type HomepageData {
    title: String!
    href: String!
  }

  type UniversalData {
    homepage: HomepageData
    sports: [SportHighLevelData!]
  }

  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    universalData: UniversalData!
    sportPane(sportTitle: String!): SportPane!
    lines(buttonIds: [ID!]!): [Line!]!
  }

  input BetInput {
    wagerAmount: Int!
    totalPayout: Int!
    line: Int!
    buttonId: ID!
  }

  input SubmitBetslipInput {
    bets: [BetInput!]!
  }

  type SubmitBetslipResponse {
    betIds: [ID!]!
  }

  # The "Mutation" type is special just like the "Query" type
  type Mutation {
    submitBetslip(input: [BetInput!]!): SubmitBetslipResponse!
  }

  # The "Subscription" type is special, similar to the "Query" type
  type Subscription {
    lineUpdate: LineUpdate # cannot be forced to be non-null (i.e., no "!").
  }
`;

module.exports = typeDefs;
