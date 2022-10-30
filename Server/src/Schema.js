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
    line: Line!
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
    type: LineType!
    value: Float!
  }

  type GameContender {
    name: String!
    image: String
    spread: Line!
    spreadButtonId: ID!
    money: Line!
    moneyButtonId: ID!
    total: Line!
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

  type SportPane {
    sportTitle: String!
    href: String!
    tabs: [Tab!]
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

  type UserInfo {
    name: String!
  }

  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    age: Int!
    email: String!
    password: String!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    getAllUsers: [User!]!
    universalData: UniversalData!
    sportPane(sportTitle: String!): SportPane!
    userInfo: UserInfo!
  }
`;

module.exports = typeDefs;
