import React, { Component } from "react";
import { ChevronRightIcon } from "@heroicons/react/outline";
import ImageMap from "../images/ImageMap";

export default class Sidebar extends Component {
  render() {
    return (
      <div className={this.props.sportsPane ? "bg-white" : ""}>
        <div
          className={
            this.props.sportsPane ? "mb-1 mt-3 ml-4" : "mb-3 mt-3 ml-5"
          }
        >
          {" "}
          {/* margin left to match the padding left in the <a/> tag */}
          <h1
            className={
              this.props.sportsPane
                ? "text-gray-700 font-bold"
                : "text-slate-200 font-bold"
            }
          >
            All Sports
          </h1>
        </div>
        <div>
          {this.props.betData.map((sportData, index) => (
            <div key={sportData.sport} className="contents">
              <a
                className={
                  this.props.sportsPane
                    ? "flex justify-between items-center pb-4 pt-4 pl-5"
                    : "flex justify-between items-center pb-2 pt-2 pl-5 pr-12"
                }
                href={sportData.href}
              >
                <div className="flex items-center">
                  <div className="mr-3">
                    {ImageMap.get(
                      this.props.sportsPane
                        ? sportData.alternateIcon
                        : sportData.icon
                    )}
                  </div>
                  <p
                    className={
                      this.props.sportsPane
                        ? "text-blue-500 font-light text-s"
                        : ""
                    }
                  >
                    {sportData.sport}
                  </p>
                </div>
                <div className={this.props.sportsPane ? "" : "hidden"}>
                  <ChevronRightIcon className="w-4 h-4 mr-3 text-blue-500" />
                </div>
              </a>
              {this.props.sportsPane &&
              index < this.props.betData.length - 1 ? (
                <div className="w-full h-px bg-gray-300 ml-4" />
              ) : (
                <div />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
