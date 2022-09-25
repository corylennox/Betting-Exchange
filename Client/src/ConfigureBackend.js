import { onError } from "@apollo/client/link/error";
import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
      return 1;
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:4000/" }),
  //new HttpLink({ uri: "http://192.168.1.13:4000/" }), //to use app from other devices
]);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});
