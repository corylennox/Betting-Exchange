import React, { Component } from "react";
import Navbar from "./components/Navbar";
import "./tailwind.css";
import SportPane from "./components/SportPane";
import Sidebar from "./components/Sidebar";
import { BetData } from "./betData";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BottomNavbar from "./components/BottomNavbar";
import Betslip from "./components/Betslip";
//import MyButton from "./components/MyButton";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeBets: [],
    };

    this.BottomNavbar = <BottomNavbar />;
    this.sidebar = <Sidebar sportsPane={false} betData={BetData} />;

    this.onMoneylineClick = this.onMoneylineClick.bind(this);
  }

  onMoneylineClick(isToggleOn, betInfo) {
    // change state and add this moneyline to running array of monelines
    if (isToggleOn === true) {
      this.setState({ activeBets: [...this.state.activeBets, betInfo] });
    } else {
      //button was toggled off; delete bet from array
      this.setState({
        activeBets: this.state.activeBets.filter(function (bet) {
          return bet !== betInfo;
        }),
      });
    }
  }

  render() {
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
              <div className=" bg-slate-900 border-t border-slate-100 flex justify-end min-h-screen">
                {this.sidebar}
              </div>
            </div>

            {/* Sportspane */}
            <div className="xs:col-span-1 lg:col-span-3 xl:w-auto w-full h-full min-h-screen">
              {
                <Routes>
                  <Route path="/">
                    {BetData.map((betData) => (
                      <Route
                        path={betData.href}
                        element={
                          <SportPane
                            betData={betData}
                            onMoneylineClick={this.onMoneylineClick}
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
                        <Sidebar sportsPane={true} betData={BetData} />
                      </div>
                    }
                  />

                  {/* route all other paths to home */}
                  <Route
                    path="*"
                    element={<SportPane betData={BetData[0]} />}
                  />
                </Routes>
              }
            </div>

            {/* Betslip */}
            <div className="hidden lg:block xs:col-span-1 lg:col-span-2 xl:auto w-full h-[calc(100vh-5rem)] sticky top-20 overflow-y-scroll overscroll-contain ">
              <div className="h-auto ">
                <div className="flex sticky top-0 border-b-2 h-11 items-center p-2">
                  <div className="rounded-full bg-red-500 flex relative h-7 w-7 items-center text-center">
                    <h1 className="w-full text-md font-semibold text-white font-mono">{this.state.activeBets.length}</h1>
                  </div>
                  <h1 className="text-slate-600 font-bold text-lg ml-1">Betslip</h1>
                </div>
                <Betslip activeBets={this.state.activeBets} />
              </div>
            </div>

            {/* Bottom Navbar */}
            <div className="contents lg:hidden 0">
              <div className="inset-0 bottom-0 z-50 sticky bg-slate-100 h-16">
                {this.BottomNavbar}
              </div>
            </div>
          </div>
        </Router>
      </main>
    );
  }
}
