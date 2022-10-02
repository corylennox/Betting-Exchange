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
    <main className=" inset-0 w-full min-h-screen bg-slate-900">
      <Router>
        {/* Navbar */}
        <div className="top-0 hidden lg:contents">
          <Navbar />
        </div>
        <div className="flex flex-nowrap justify-center pb-16 lg:pb-0 lg:pt-20 min-w-full min-h-screen"> { /* padding top and bottom matches the top/bottom navbar he */ }

          {/* Sidebar */}
          <div className="hidden lg:contents">
            <div className=" bg-slate-900 min-w-[12rem] max-w-[12rem]">
              <div className="sticky top-20 overscroll-contain">
                {/* this div prevents the sidebar from scrolling */}
                <div className="bg-slate-800 h-0.5 " />
                {/* this is the border between navbar and sidebar */}
                <Sidebar
                  isSportPane={false}
                  sportsData={universalData.sports}
                />
              </div>
            </div>
          </div>

          {/* Sportpane routes */}
          <div className="w-full lg:max-w-2xl bg-skin-accent">
            <Routes>
              <Route
                path={rts.homepage}
                element={
                  <SportPane
                    sportPaneTitle={universalData.homepage.title}
                    href={universalData.homepage.href}
                  />
                }
              />

              {universalData.sports.map((sport) => ( //map all sportpane routes
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
          <div className="hidden lg:contents">
            <div className=" min-w-[22rem] max-w-[22rem] sticky top-20 h-[calc(100vh-5rem)] shadow-[0_3px_3px_3px_rgba(0,0,0,0.3)] bg-white">
              <div className=" w-full ">
                <div className=""> { /* parent */}
                  <div className="flex sticky top-0 z-50 border-b-2 border-gray-300 h-11 items-center p-2">
                    <div className="rounded-full bg-red-500 flex relative h-7 w-7 items-center text-center">
                      <h1 className="w-full text-md font-semibold text-white font-mono">
                        {toggledBets.size}
                      </h1>
                    </div>
                    <h1 className="text-slate-600 font-bold text-lg ml-1">
                      Betslip
                    </h1>
                  </div>
                  <div className="overflow-y-auto h-[calc(100vh-13.75rem)]" >
                    <Betslip isSportPane={false} />
                  </div>
                  <div className="w-full h-[6rem] bottom-0 border-t-2 border-gray-300 absolute">
                    submit betslip
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Navbar */}
        <div className="contents lg:hidden">
          <div className="inset-0 bottom-0 z-50 fixed h-16 w-full">
            <BottomNavbar />
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
