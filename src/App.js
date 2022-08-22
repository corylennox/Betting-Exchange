import React from 'react';
import Navbar from './components/Navbar';
import OutrightBet from './components/OutrightBet';
import "./tailwind.css"
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { ContestantsData } from "./data";

export default function App() {
  return (
    <main class="absolute inset-0 text-gray-400 bg-gray-900">
      <Router>
        <Navbar />
        <OutrightBet betName="2023 Nba Championship" contestantsData={ContestantsData.basketball.nbaTeams}/>
      </Router>
    </main>
  );
}