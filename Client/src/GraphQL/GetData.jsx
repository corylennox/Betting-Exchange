import { useQuery } from "@apollo/client";
import { LOAD_USERS } from "./Queries";
import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { UNIVERSAL_DATA_QUERY } from "./GraphQL/Queries";
import { onError } from "@apollo/client/link/error";

// function GetUsers() {
//   //const { error, loading, data } = useQuery(LOAD_USERS);
//   const { data } = useQuery(LOAD_USERS);
//   const [users, setUsers] = useState([]);
//   useEffect(() => {
//     if (data) {
//       setUsers(data.getAllUsers);
//     }
//   }, [data]);

//   return (
//     <div>
//       {users.map((val) => {
//         return (
//           <h1 key={val.firstName}> {val.firstName + " " + val.lastName}</h1>
//         );
//       })}
//     </div>
//   );
// }

// export default GetUsers;

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

const {
  loading,
  data: universalDataResponse,
  error,
} = useQuery(UNIVERSAL_DATA_QUERY);

if (loading) return <h1>Loading...</h1>;

if (error) {
  console.log("Error loading App: " + error);
  return <h1>Error Loading App. Error logged to console.</h1>;
}

export const universalData = translateUniversalData(universalDataResponse);
