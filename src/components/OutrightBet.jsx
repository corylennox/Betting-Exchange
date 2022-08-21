import React, { Component } from "react";
import { ContestantsData } from "../data";
import Contestant from "./Contestant";

export default class OutrightBet extends Component {
  render() {
    return (
      <div className="h-full w-full border-2 border-red-600">
        <h2 className="text-white text-xl">NBA Championship</h2>
        <div class="grid grid-cols-3 mb-4 border-2 border-green-600">
          {ContestantsData.basketball.nbaTeams.map((nbaTeam) => (
            <div class="mb-4 bg-gray-400 h-12">
              <Contestant contestantData={nbaTeam} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
