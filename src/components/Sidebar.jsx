import React, { Component } from "react";
import { ChevronRightIcon } from "@heroicons/react/outline";

export default class Sidebar extends Component {
  render() {
    return (
      <div class={this.props.sportsPane ? "bg-white" : ""}>
        <div class={this.props.sportsPane ? "mb-1 mt-3 ml-4" : "mb-3 mt-3 ml-5"}> {/* margin left to match the padding left in the <a/> tag */}
          <h1 className={this.props.sportsPane ? "text-gray-700 font-bold" : "text-slate-200 font-bold"}>All Sports</h1>
        </div>
        <div>
          {this.props.betData.map((sportData, index) => (
            <div className="contents">
            <a class={this.props.sportsPane ? "flex justify-between items-center pb-4 pt-4 pl-5" : "flex justify-between items-center pb-2 pt-2 pl-5 pr-12"} href={sportData.href}>
              <div className="flex items-center">
                <img
                    className="w-5 h-5 invert mr-3"
                    src={this.props.sportsPane ? sportData.imageBlue : sportData.imageWhite}
                    alt={sportData.href}
                />
                <body className={this.props.sportsPane ? "text-blue-500 font-light text-s" : ""}>{sportData.sport}</body>
              </div>
              <div className={this.props.sportsPane ? "" : "hidden"}>
                <ChevronRightIcon className="w-4 h-4 mr-3 text-blue-500"/>
              </div>
            </a>
            {(this.props.sportsPane && (index < this.props.betData.length - 1)) ? <div className="w-full h-px bg-gray-300 ml-4"/> : <div/>}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
