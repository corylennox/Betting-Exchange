import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import "./tailwind.css";
import SportPane from "./components/SportPane";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { UNIVERSAL_DATA_QUERY } from "./GraphQL/Queries";
import BottomNavbar from "./components/BottomNavbar";
import Betslip from "./components/Betslip";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import GetUsers from "./GraphQL/GetData";
import { ToggledBetsContext } from "./Contexts/ToggledBetsContext";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
      return 1;
    });
  }
});

const link = from([errorLink, new HttpLink({ uri: "http://localhost:4000/" })]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function AppNested() {
  const { loading, data: universalDataResponse, error } = useQuery(UNIVERSAL_DATA_QUERY);

  const [toggledBets, setToggledBets] = useState(new Map());

  if (loading)
    return (<h1>Loading...</h1>);

  return (
      <main className="absolute inset-0 w-full text-gray-400">
        <ToggledBetsContext.Provider value={{toggledBets, setToggledBets}}>
        <Router>
          {/* Navbar */}
          <div className="hidden lg:contents">
            <Navbar />
          </div>
          {/* Grid */}
          <div className="grid xs:grid-cols-1 lg:grid-cols-6 min-h-screen">
            {/* Sidebar */}
            <div className="hidden lg:contents">
              <div className=" bg-slate-900 border-t border-slate-100 flex justify-end min-h-screen">
                <Sidebar sportsPane={false} sportsData={universalDataResponse.universalData.sports} />
              </div>
            </div>

            {/* Sportspane */}
            <div className="xs:col-span-1 lg:col-span-3 xl:w-auto w-full h-full min-h-screen">
              {
                <Routes>
                  <Route path="/">
                    {universalDataResponse.universalData.sports.map((sport) => (
                      <Route
                        key={sport.title}
                        path={sport.href}
                        element={
                          <SportPane
                            sportPaneTitle={sport.title}
                          />
                        }
                      />
                    ))}
                  </Route>

                  {/* All Sports in sports pane */}
                  <Route
                    path="/all-sports"
                    element={
                      <div>
                        <Sidebar sportsPane={true} sportsData={universalDataResponse.universalData.sports} />
                      </div>
                    }
                  />

                  {/* route all other paths to home */}
                  <Route
                    path="*"
                    element={
                      <SportPane
                        sportPaneTitle={universalDataResponse.universalData.sports[0].title}
                      />
                    }
                  />
                </Routes>
              }
            </div>

            {/* Betslip */}
            <div className="hidden lg:block xs:col-span-1 lg:col-span-2 xl:auto w-full h-[calc(100vh-5rem)] sticky top-20 overflow-y-scroll overscroll-contain ">
              <div className="h-auto ">
                <div className="flex sticky top-0 border-b-2 h-11 items-center p-2">
                  <div className="rounded-full bg-red-500 flex relative h-7 w-7 items-center text-center">
                    <h1 className="w-full text-md font-semibold text-white font-mono">
                      {toggledBets.size}
                    </h1>
                  </div>
                  <h1 className="text-slate-600 font-bold text-lg ml-1">
                    Betslip
                  </h1>
                </div>
                <GetUsers />
                <Betslip activeBets={[]} />
              </div>
            </div>

            {/* Bottom Navbar */}
            <div className="contents lg:hidden 0">
              <div className="inset-0 bottom-0 z-50 sticky bg-slate-100 h-16">
                <BottomNavbar />
              </div>
            </div>
          </div>
        </Router>
        </ToggledBetsContext.Provider>
      </main>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppNested />
    </ApolloProvider>
  )
}
