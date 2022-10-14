import React, { useState } from "react";
import Navbar from "./components/Navbar";
import "./tailwind.css";
import SportPane from "./components/SportPane";
import Sidebar from "./components/Sidebar";
import Account from "./components/Account";
import MyBets from "./components/MyBets";
import BottomNavbar from "./components/BottomNavbar";
import Betslip from "./components/Betslip";
import BetslipSubmission from "./components/BetslipSubmission";
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
import ApolloWrapper from "./ConfigureBackend";
import { useQuery } from "@apollo/client";
import { UNIVERSAL_DATA_QUERY } from "./GraphQL/Queries";
import { translateUniversalData } from "./GraphQL/Translate";
import rts from "./MyRoutes";
import { ThemeData } from "./components/ActiveThemes";
import Auth0Wrapper from "./Auth0Wrapper";

// Nest the entire app in <ApolloProvider> so that App.jsx can query backend
function AppNested() {
  //persistor.purge();
  const toggledBets = parseMap(useSelector((state) => state.toggledBets));
  const activeTheme = useSelector((state) => state.activeTheme);
  const [isSystemThemeDark, setIsSystemThemeDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

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

  /**
   * Watching the current system color scheme and updating the state hook when the system color scheme changes forces a refresh of the the entire page.
   * Without this event listener, the page would not autoamtically refresh when the user changes the system color scheme.
   */
  const systemColorScheme = isSystemThemeDark ? "dark" : "light";
  window
    .matchMedia("(prefers-color-scheme: " + systemColorScheme + ")")
    .addEventListener("change", (e) => {
      setIsSystemThemeDark(!isSystemThemeDark);
    });

  /**
   * Checks if dark or light mode should be applied to the website. Depends on whether the user manually overridded the system theme or not.
   */
  if (
    activeTheme === ThemeData[2].name ||
    (activeTheme === ThemeData[0].name && isSystemThemeDark)
  )
    document.documentElement.classList.add("dark");
  else document.documentElement.classList.remove("dark");

  return (
    <main className="dark:theme-dark inset-0 min-h-screen w-full bg-skin-default">
      <Router>
        {/* Navbar */}
        <div className="top-0 hidden lg:contents">
          <Navbar />
        </div>
        <div className="flex min-h-screen min-w-full flex-nowrap justify-center pb-16 lg:pb-0 lg:pt-20">
          {/* padding top and bottom matches the top/bottom navbar he */}
          {/* Sidebar */}
          <div className="hidden lg:contents">
            <div className=" min-w-[12rem] max-w-[12rem] bg-skin-default">
              <div className="sticky top-20 overscroll-contain">
                {/* this div prevents the sidebar from scrolling */}
                <div className="h-0.5 bg-skin-sidebarDivider" />
                {/* this is the border between navbar and sidebar */}
                <Sidebar
                  isSportPane={false}
                  sportsData={universalData.sports}
                />
              </div>
            </div>
          </div>
          {/* Sportpane routes */}
          <div className="w-full bg-skin-accent lg:max-w-2xl">
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
          <div className="hidden lg:contents">
            <div className=" sticky top-20 h-[calc(100vh-5rem)] min-w-[22rem] max-w-[22rem] bg-skin-overlay shadow-[0_3px_3px_3px_rgba(0,0,0,0.3)]">
              <div className=" w-full ">
                <div className="">
                  {" "}
                  {/* parent */}
                  <div className="sticky top-0 z-50 flex h-11 items-center border-b-2 border-gray-300 p-2">
                    <div className="relative flex h-7 w-7 items-center rounded-full bg-red-500 text-center">
                      <h1 className="text-md w-full font-mono font-semibold text-white">
                        {toggledBets.size}
                      </h1>
                    </div>
                    <h1 className="ml-1 text-lg font-bold text-skin-betslipHeader">
                      Betslip
                    </h1>
                  </div>
                  <div className="h-[calc(100vh-13.75rem)] overflow-y-auto">
                    <Betslip isSportPane={false} />
                  </div>
                  <div className="absolute bottom-0 h-[6rem] w-full border-t-2 border-gray-300">
                    <BetslipSubmission />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navbar */}
        <div className="contents lg:hidden">
          <div className="fixed inset-0 bottom-0 z-50 h-16 w-full">
            <BottomNavbar />
          </div>
        </div>
      </Router>
    </main>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Auth0Wrapper>
        <ApolloWrapper>
          <PersistGate loading={null} persistor={persistor}>
            <AppNested />
          </PersistGate>
        </ApolloWrapper>
      </Auth0Wrapper>
    </Provider>
  );
}
