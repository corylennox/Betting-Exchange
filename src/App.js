import React from "react";
import Navbar from "./components/Navbar";
import "./tailwind.css";
import SportPane from "./components/SportPane";
import Sidebar from "./components/Sidebar";
import { BetData } from "./betData";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BottomNavbar from "./components/BottomNavbar";

export default function App() {
  return (
    <main class="absolute inset-0 text-gray-400">
      <Router>
        <Navbar />
        <div className="h-full grid xs:grid-cols-1 lg:grid-cols-4">
          <div className="hidden lg:contents">
          <div className=" bg-slate-900 border-t border-slate-100 flex justify-end h-full">
            <Sidebar betData={BetData} />
          </div>
          </div>
          <div className="xs:col-span-1 lg:col-span-2 xl:w-auto w-full h-full">
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
              </Routes>
            }
          </div>
          <div className="hidden lg:contents">
          <div className=" bg-slate-50 shadow-xl drop-shadow-md h-full">
            <body>Betslip</body>
          </div>
          </div>
          <div className="contents lg:hidden">
          <div className="bottom-0 z-50 sticky">
            <BottomNavbar />
          </div>
          </div>
        </div>
      </Router>
    </main>
  );
}
