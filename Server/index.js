const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./src/Schema');
const { UniversalData, SportBets } = require('./src/Data');

const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
];

const users = [
    {
        id: 0,
        firstName: "Cory",
        lastName: "Lennox",
        email: "corylennox@gmail.com",
        password: "muthafugginfriggyou",
        age: 27,
    },
    {
        id: 1,
        firstName: "Emerson",
        lastName: "Boyd",
        email: "emersonboyd@gmail.com",
        password: "muthafugginfriggyou2",
        age: 25,
    },
]

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Bet: {
      __resolveType(bet, context, info){
        // Only OutrightBet has a contendersData field
        return bet.type
      },
    },
    Query: {
        books: () => books,
        getAllUsers: () => users,
        universalData: () => UniversalData,
        sportPane: (args) => SportBets,
    },
};

const {
    ApolloServerPluginLandingPageLocalDefault
} = require('apollo-server-core');
  
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    /**
     * What's up with this embed: true option?
     * These are our recommended settings for using AS;
     * they aren't the defaults in AS3 for backwards-compatibility reasons but
     * will be the defaults in AS4. For production environments, use
     * ApolloServerPluginLandingPageProductionDefault instead.
    **/
    plugins: [
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
