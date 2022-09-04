import React, { Component } from "react";
import { ChevronRightIcon } from "@heroicons/react/outline";

export default class Sidebar extends Component {
  render() {
    return (
      <div class={this.props.sportsPane ? "pl-4 bg-white" : "pr-12"}>
        <div class={this.props.sportsPane ? "mb-1 mt-3" : "mb-3 mt-3"}>
          <h1 className={this.props.sportsPane ? "text-gray-700 font-bold" : "text-slate-200 font-bold"}>All Sports</h1>
        </div>
        <div>
          {this.props.betData.map((sportData, index) => (
            <div className="contents">
            <a class={this.props.sportsPane ? "flex justify-between items-center pb-4 pt-4 pl-1" : "flex justify-between items-center mb-3"} href={sportData.href}>
              <div className="flex items-center">
                <img
                    className="w-5 h-5 invert mr-3"
                    src={this.props.sportsPane ? sportData.imageBlue : sportData.imageWhite}
                    alt={sportData.href}
                />
                <p className={this.props.sportsPane ? "text-blue-500 font-light text-s" : ""}>{sportData.sport}</p>
              </div>
              <div className={this.props.sportsPane ? "" : "hidden"}>
                <ChevronRightIcon className="w-4 h-4 mr-3 text-blue-500"/>
              </div>
            </a>
            {(this.props.sportsPane && (index < this.props.betData.length - 1)) ? <div className="w-full h-px bg-gray-300"/> : <div/>}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
