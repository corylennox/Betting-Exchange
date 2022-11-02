require('dotenv').config() // loads environment variables from .env file
const { ApolloServer, AuthenticationError } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const typeDefs = require('./src/Schema');
const { UniversalData, FeaturedSportBets, SportsBets } = require('./src/Data');
const { verifyToken } = require('./src/verifyToken');
const { ApolloServerPluginLandingPageLocalDefault } = require('@apollo/server/plugin/landingPage/default');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const express = require('express');
const http = require('http');
const cors = require('cors');
const { json } = require('body-parser');
const { expressMiddleware } = require('@apollo/server/express4');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const { pubsub, updateLines } = require('./src/pubsub');

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
        sportPane: (parent, args, context, info) => {return SportsBets.has(args.sportTitle) ? SportsBets.get(args.sportTitle) : FeaturedSportBets;},
        userInfo: (parent, args, context, info) => {
            const isAuthenticated = context.auth.isAuthenticated;
            if (!isAuthenticated) {
                throw new AuthenticationError("Not logged in");
            }
            return { name: "Test User" };
        }
    },
    Subscription: {
        lineUpdate: {
            subscribe: () => pubsub.asyncIterator(['LINE_UPDATE']),
        },
    },
};

async function startApolloServer() {
    const app = express();
    const httpServer = http.createServer(app);

    const schema = makeExecutableSchema({ typeDefs, resolvers });

    // Creating the WebSocket server
    const wsServer = new WebSocketServer({
        // This is the `httpServer` we created in a previous step.
        server: httpServer,
        // Pass a different path here if app.use
        // serves expressMiddleware at a different path
        path: '/graphql',
    });

    // Hand in the schema we just created and have the
    // WebSocketServer start listening.
    const serverCleanup = useServer({ schema }, wsServer);

    // The ApolloServer constructor requires two parameters: your schema
    // definition and your set of resolvers.
    const server = new ApolloServer({
        schema,
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

            // Proper shutdown for the http server.
            ApolloServerPluginDrainHttpServer({ httpServer }),

            // Proper shutdown for the WebSocket server.
            {
                async serverWillStart() {
                return {
                    async drainServer() {
                    await serverCleanup.dispose();
                    },
                };
                },
            },
        ],
    });

    await server.start();

    app.use(
        '/graphql',
        cors({
            origin: 'http://localhost:3000',
        }),
        json(),
        expressMiddleware(server, {
            context: async ({ req, ...rest }) => { 
                let isAuthenticated = false;
                /**
                 * gets the jwt off the request
                 * if there is a token, verify it
                 * if there's is a token and the token is valid, set isAuthenticated to true
                 */
                try {
                    const authHeader = req.headers.authorization || "";
                    if (authHeader) {
                        const token = authHeader.split(" ")[1];
                        const payload = await verifyToken(token);
                        isAuthenticated = payload && payload.sub ? true : false; // this should never be false because verifyToken will throw an error if token is invalid
                        console.log(`Payload of authenticated jwt: ${JSON.stringify(payload)}`);
                    }
                } catch (error) {
                    console.error(`Auth0 Token validation error: ${error}`);
                }
                return { ...rest, req, auth: { isAuthenticated } };
            },
        }),
    );

    await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);

    lineUpdateInteval = 1000; // 1 second
    setInterval(updateLines, lineUpdateInteval);
}

startApolloServer();
