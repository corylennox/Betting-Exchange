import { onError } from "@apollo/client/link/error";
import { ApolloClient, InMemoryCache, HttpLink, from, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

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

  const link = from([
    errorLink,
    authLink,
    new HttpLink({ uri: "http://localhost:4000/graphql/" }),
    //new HttpLink({ uri: "http://192.168.1.13:4000/" }), //to use app from other devices
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
