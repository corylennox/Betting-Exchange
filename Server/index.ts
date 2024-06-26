require("dotenv").config(); // loads environment variables from .env file
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./src/Schema";
import { UniversalData, FeaturedSportBets, SportsBets } from "./src/Data";
import { LinesContainer } from "./src/Lines";
import { verifyToken } from "./src/verifyToken";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import https from "https";
import cors from "cors";
import { json } from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { pubsub, updateLines, makeChannelName } from "./src/pubsub";
import betSubmissionController from "./controller/betSubmission";
import { InMemoryLRUCache } from "@apollo/utils.keyvaluecache";
import { Jwt, JwtPayload } from "jsonwebtoken";
import { GraphQLError } from "graphql";
import {
  UserSubmittedBet,
  UserSubmittedBetResult,
} from "./src/datatypes/UserSubmittedBet";
import matchingEngineController from "./controller/matchingEngine";
import { RestingType } from "./src/datatypes/RestingType";
import { DollarAmount } from "./src/datatypes/DollarAmount";
import fetchBetsController from "./controller/fetchBets";
import fetchButtonIdDetailsController from "./controller/fetchButtonIdDetails";
import balancesController from "./controller/balances";
import fs from "fs";
import {
  getEnvironmentVariable,
  getOptionalEnvironmentVariable,
} from "@openbook/common";

const httpsEnvironmentVariable = getOptionalEnvironmentVariable("HTTPS");
const useHttps =
  httpsEnvironmentVariable &&
  (httpsEnvironmentVariable.toLowerCase() == "true" ||
    httpsEnvironmentVariable == "1");
let sslCredentials = {};
if (useHttps) {
  const sslKey = fs.readFileSync(
    getEnvironmentVariable("SSL_KEY_RELATIVE_PATH")
  );
  const sslCert = fs.readFileSync(
    getEnvironmentVariable("SSL_CERT_RELATIVE_PATH")
  );
  sslCredentials = {
    key: sslKey,
    cert: sslCert,
  };
}

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Bet: {
    __resolveType(bet, context, info) {
      // Only OutrightBet has a contendersData field
      return bet.type;
    },
  },
  Query: {
    universalData: () => UniversalData,
    sportPane: (parent, args, context, info) => {
      const sportBets = SportsBets.has(args.sportTitle)
        ? SportsBets.get(args.sportTitle)
        : FeaturedSportBets;

      const lines = [];
      sportBets.tabs.forEach((tab) => {
        tab.availableBets.forEach((availableBet) => {
          if (availableBet.type == "OutrightBet") {
            availableBet.contendersData.forEach((contenderData) => {
              lines.push(LinesContainer.get(contenderData.buttonId));
            });
          } else if (availableBet.type == "GameBet") {
            const contender1Data = availableBet.contender1Data;
            const contender2Data = availableBet.contender2Data;
            lines.push(LinesContainer.get(contender1Data.spreadButtonId));
            lines.push(LinesContainer.get(contender1Data.moneyButtonId));
            lines.push(LinesContainer.get(contender1Data.totalButtonId));
            lines.push(LinesContainer.get(contender2Data.spreadButtonId));
            lines.push(LinesContainer.get(contender2Data.moneyButtonId));
            lines.push(LinesContainer.get(contender2Data.totalButtonId));
          }
        });
      });
      return { sportData: sportBets, lines };
    },
    lines: (parent, args, context, info) => {
      let lines = [];
      args.buttonIds.forEach((buttonId) => {
        lines.push(LinesContainer.get(buttonId));
      });
      return lines;
    },
    myBets: async (parent, args, context, info) => {
      const isAuthenticated = context.auth.isAuthenticated;
      if (!isAuthenticated) {
        // throwing a `GraphQLError` here allows us to specify an HTTP status code,
        // standard `Error`s will have a 500 status code by default
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            https: { status: 401 },
          },
        });
      }

      const myBets = await fetchBetsController.fetchBets(context.auth.userId);
      // Transform each bet asynchronously
      const betPromises = myBets.map(async (bet) => {
        const buttonId =
          await fetchButtonIdDetailsController.fetchButtonIdDetails(
            bet.button_id
          );

        return {
          id: bet.id,
          betTitle: buttonId.bet_title,
          gameTitle: buttonId.game_title,
          gameStartTime: buttonId.game_start_time,
          line: bet.line,
          wager: bet.wager_amount,
          timePlaced: bet.time_placed,
          totalPayout: bet.total_payout,
          buttonId: bet.button_id,
          orderStatus: bet.order_status,
          betStatus: bet.bet_status,
        };
      });

      // Wait for all promises to resolve
      const mappedBets = await Promise.all(betPromises);

      // Return the array of transformed bets
      return mappedBets;
    },
    balance: async (parent, args, context, info) => {
      const isAuthenticated = context.auth.isAuthenticated;
      if (!isAuthenticated) {
        // throwing a `GraphQLError` here allows us to specify an HTTP status code,
        // standard `Error`s will have a 500 status code by default
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            https: { status: 401 },
          },
        });
      }
      const availableBalance: DollarAmount =
        await balancesController.getAvailableBalance(context.auth.userId);
      return { availableBalance: availableBalance.value };
    },
  },
  Mutation: {
    submitBetslip: async (parent, args, context, info) => {
      console.time("submitBetslip");
      const isAuthenticated = context.auth.isAuthenticated;
      if (!isAuthenticated) {
        // throwing a `GraphQLError` here allows us to specify an HTTP status code,
        // standard `Error`s will have a 500 status code by default
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            https: { status: 401 },
          },
        });
      }

      const submittedBets = args.input;

      // Convert the graph ql @submittedBets array to the backend @userSubmittedBets array
      const userSubmittedBets = new Array<UserSubmittedBet>();
      submittedBets.forEach((submittedBet: any) => {
        let userSubmittedBet = new UserSubmittedBet();
        userSubmittedBet.userId = context.auth.userId;
        userSubmittedBet.buttonId = Number(submittedBet.buttonId);
        userSubmittedBet.line = matchingEngineController.getLineFromLegacyLine(
          submittedBet.buttonId,
          submittedBet.line
        );
        userSubmittedBet.wagerAmount = new DollarAmount(
          submittedBet.wagerAmount
        );
        userSubmittedBet.restingType = RestingType.Limit; // Limit for now
        userSubmittedBets.push(userSubmittedBet);
      });

      const userSubmittedBetResults: Array<UserSubmittedBetResult> =
        await betSubmissionController.createBetSubmissions(
          context.auth.userId,
          userSubmittedBets
        );
      console.timeEnd("submitBetslip");
      let successfulButtonIds = new Array<number>();
      for (const userSubmittedBetResult of userSubmittedBetResults) {
        if (userSubmittedBetResult.success) {
          successfulButtonIds.push(
            userSubmittedBetResult.submittedBet.buttonId
          );
        }
      }
      return { returnedButtonIds: successfulButtonIds }; // TODO populate the return type with useful information
    },
    addFunds: async (parent, args, context, info) => {
      const isAuthenticated = context.auth.isAuthenticated;
      if (!isAuthenticated) {
        // throwing a `GraphQLError` here allows us to specify an HTTP status code,
        // standard `Error`s will have a 500 status code by default
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            https: { status: 401 },
          },
        });
      }

      let availableBalance: DollarAmount =
        await balancesController.getAvailableBalance(context.auth.userId);
      availableBalance.add(new DollarAmount(args.input.fundsToAdd));
      availableBalance = await balancesController.setAvailableBalance(
        context.auth.userId,
        availableBalance
      );
      return { availableBalance: availableBalance.value };
    },
  },
  Subscription: {
    lineUpdate: {
      subscribe: () => pubsub.asyncIterator([makeChannelName("LINE_UPDATE")]),
    },
  },
};

async function startApolloServer() {
  const app = express();
  const httpServer = useHttps
    ? https.createServer(sslCredentials, app)
    : http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if app.use
    // serves expressMiddleware at a different path
    path: "/graphql",
  });

  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
  const serverCleanup = useServer({ schema }, wsServer);

  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: new InMemoryLRUCache(),
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
    "/graphql",
    cors({
      origin: [
        "http://localhost:3000",
        "http://localhost:8080",
        "https://openbook.gg",
      ],
    }),
    json(),
    expressMiddleware(server, {
      context: async ({ req, ...rest }) => {
        let isAuthenticated = false;
        let userId: string = "";
        let email: string = "";
        /**
         * gets the jwt off the request
         * if there is a token, verify it
         * if there's is a token and the token is valid, set isAuthenticated to true
         */
        try {
          const authHeader = req.headers.authorization || "";
          if (authHeader) {
            const token = authHeader.split(" ")[1];
            const payload: JwtPayload | Jwt = await verifyToken(token);
            isAuthenticated = payload && payload.sub ? true : false; // this should never be false because verifyToken will throw an error if token is invalid
            if (isAuthenticated) {
              userId = payload.sub;
              email = payload.rule_email;
            }
            // console.log(`Payload of authenticated jwt: ${JSON.stringify(payload)}`);
          }
        } catch (error) {
          console.error(`Auth0 Token validation error: ${error}`);
        }
        return { ...rest, req, auth: { isAuthenticated, userId, email } };
      },
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen(
      { port: getEnvironmentVariable("WEB_SERVER_PORT") },
      resolve
    )
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);

  // this endpoint allows for AWS health checks
  app.get("/health", (req, res) => {
    res.status(200).send("Okay!");
  });

  const lineUpdateInteval = 1000; // 1 second
  setInterval(updateLines, lineUpdateInteval);
  console.log("Server publishing websocket updates");
}

startApolloServer();
