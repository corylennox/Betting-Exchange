import React from "react";
import Navbar from "./components/Navbar";
import "./tailwind.css";
import SportPane from "./components/SportPane";
import Sidebar from "./components/Sidebar";
import Account from "./components/Account";
import MyBets from "./components/MyBets";
import BottomNavbar from "./components/BottomNavbar";
import Betslip from "./components/Betslip";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./ConfigureStore";
import { useSelector } from "react-redux";
import { parseMap } from "./utils";
import { client } from "./ConfigureBackend";
import { useQuery } from "@apollo/client";
import { UNIVERSAL_DATA_QUERY } from "./GraphQL/Queries";
import { translateUniversalData } from "./GraphQL/Translate";
import rts from "./MyRoutes";

// Nest the entire app in <ApolloProvider> so that App.jsx can query backend
function AppNested() {
  //persistor.purge();
  const toggledBets = parseMap(useSelector((state) => state.toggledBets));

  const {
    loading,
    data: universalDataResponse,
    error,
  } = useQuery(UNIVERSAL_DATA_QUERY);

  if (loading) return <h1>Loading</h1>;

  if (error) {
    console.log("Error loading App: " + error);
    return <h1>Error Loading App. Error logged to console.</h1>;
  }

  const universalData = translateUniversalData(universalDataResponse);

  return (
    <main className="absolute inset-0 w-full text-gray-400">
      <Router>
        {/* Navbar */}
        <div className="hidden lg:contents">
          <Navbar />
        </div>
        {/* Grid */}
        <div className="grid xs:grid-cols-1 lg:grid-cols-6 min-h-screen">
          {/* Sidebar */}
          <div className="hidden lg:contents">
            <div className=" bg-slate-900 min-h-screen">
              <div className="sticky top-20 overscroll-contain">
                {" "}
                {/* this div prevents the sidebar from scrolling */}
                <div className="bg-slate-800 h-0.5 w-full" />{" "}
                {/* this is the border between navbar and sidebar */}
                <Sidebar
                  isSportPane={false}
                  sportsData={universalData.sports}
                />
              </div>
            </div>
          </div>

          {/* Sportpane routes */}
          <div className="xs:col-span-1 lg:col-span-3 xl:w-auto w-full h-full min-h-screen">
            <Routes>
              <Route
                path={rts.home}
                element={
                  <h1 className=" text-slate-800 text-center text-2xl pt-28">
                    Homepage
                  </h1>
                }
              />

              {universalData.sports.map(
                (
                  sport //map all sportpane routes
                ) => (
                  <Route
                    key={sport.title}
                    path={sport.href}
                    element={
                      <SportPane
                        sportPaneTitle={sport.title}
                        href={sport.href}
                      />
                    }
                  />
                )
              )}

              <Route // All Sports in sports pane
                path={rts.allSports}
                element={
                  <div>
                    <Sidebar
                      isSportPane={true}
                      sportsData={universalData.sports}
                    />
                  </div>
                }
              />

              <Route // Betslip in sports pane
                path={rts.betslip}
                element={
                  <div>
                    <Betslip isSportPane={true} />
                  </div>
                }
              />

              <Route path={rts.myBets} element={<MyBets />} />

              <Route path={rts.account} element={<Account />} />

              <Route // Redirect all other paths to home
                path="*"
                element={<Navigate to="/" />}
              />
            </Routes>
          </div>

          {/* Betslip */}
          <div className="hidden lg:block xs:col-span-1 lg:col-span-2 xl:auto w-full h-[calc(100vh-5rem)] sticky inset-0 top-20 overflow-y-scroll overscroll-contain ">
            <div className="h-auto ">
              <div className="flex sticky top-0 z-50 border-b-2 h-11 items-center p-2 bg-white">
                <div className="rounded-full bg-red-500 flex relative h-7 w-7 items-center text-center">
                  <h1 className="w-full text-md font-semibold text-white font-mono">
                    {toggledBets.size}
                  </h1>
                </div>
                <h1 className="text-slate-600 font-bold text-lg ml-1">
                  Betslip
                </h1>
              </div>
              <Betslip isSportPane={false} />
            </div>
          </div>

          {/* Bottom Navbar */}
          <div className="contents lg:hidden 0">
            <div className="inset-0 bottom-0 z-50 sticky h-16 w-full">
              <BottomNavbar />
            </div>
          </div>
        </div>
      </Router>
    </main>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNested />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}
