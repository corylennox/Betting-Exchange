import { onError } from "@apollo/client/link/error";
import { ApolloClient, InMemoryCache, split, HttpLink, from, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
      return 1;
    });
  }
});

export default function ApolloWrapper({ children }) {
  const { user, isAuthenticated, getAccessTokenSilently, isLoading: isAuthLoading } = useAuth0();
  const [bearerToken, setBearerToken] = useState("");

  useEffect(() => {
      const getToken = async () => {
          const token = isAuthenticated ? await getAccessTokenSilently({
              audience: process.env.REACT_APP_AUDIENCE,
              scope: "read:current_user",
          }) : "";
          setBearerToken(token);
      };
      getToken();
  }, [getAccessTokenSilently, isAuthenticated]);

  /**
   * @authLink allows us to check if the user has a valid authentication token and, if so,
   * automatically apply the auth token as a header of every request that the ApolloProvider makes.
   *
   * It's possible this can be improved to avoid setContext and use react-redux (not persisted) instead,
   * but I don't know how to yet.
   *
   * Inspired by 1:39:00 of this video: https://www.youtube.com/watch?v=vqHkwTWbaUk&t=290s&ab_channel=ApolloGraphQL.
   */
   const authLink = setContext((_, { headers }) => {
    return (bearerToken === "")
    ? { headers }
    : {
        headers: {
          ...headers,
          authorization: `Bearer: ${bearerToken}`,
        }
      };
    });

    const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql/" });
    //const httpLink = new HttpLink({ uri: "http://192.168.1.19:4000/graphql" }); //to use app from other devices

    const wsLink = new GraphQLWsLink(createClient({
      url: 'ws://localhost:4000/graphql',
    }));

    // Allows for GraphQL requests to be sent either the http or the websocket, depending on the request type
    const splitLink = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        ); // checks if operation is a subscription
      },
      wsLink, // used if boolean operation is true
      httpLink, // used if boolean operation is false
    );

  const link = from([
    errorLink,
    authLink,
    splitLink,
  ]);

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
  });

  return (  
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}
