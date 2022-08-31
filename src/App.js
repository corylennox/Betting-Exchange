import React from "react";
import Navbar from "./components/Navbar";
import "./tailwind.css";
import SportPane from "./components/SportPane";
import Sidebar from "./components/Sidebar";
import { BetData } from "./betData";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BottomNavbar from "./components/BottomNavbar";
import Betslip from "./components/Betslip";

export default function App() {
  return (
    <main class="absolute inset-0 w-full h-full text-gray-400">
      <Router>
        <div className="hidden lg:contents">
          <Navbar />
        </div>
        <div className="h-full grid xs:grid-cols-1 lg:grid-cols-6">

          {/* Sidebar */}
          <div className="hidden lg:contents">
            <div className=" bg-slate-900 border-t border-slate-100 flex justify-end h-full">
              <Sidebar sportsPane={false} betData={BetData} />
            </div>
          </div>

          {/* Sportspane */}
          <div className="xs:col-span-1 lg:col-span-3 xl:w-auto min-h-screen w-full h-full">
            {
              <Routes>
                <Route path="/">
                  {BetData.map((betData) => (
                    <Route
                      path={betData.href}
                      element={<SportPane betData={betData} />}
                    />
                  ))}
                </Route>

                {/* All Sports in sports pane */}
                <Route path="/all-sports"
                  element= {
                    <div>
                      <Sidebar sportsPane={true} betData={BetData} />
                    </div>
                  }
                />

                {/* route all other paths to home */}
                <Route path="*"
                  element={<SportPane betData={BetData[0]} />}
                />
              </Routes>
            }
          </div>

          {/* Betslip */}
          <div className="hidden lg:block xs:col-span-1 lg:col-span-2 xl:auto w-full h-full">
            <div className=" bg-slate-50 shadow-xl drop-shadow-md h-full">
              <Betslip />
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
    </main >
  );
}
