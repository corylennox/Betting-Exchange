import React, { Component } from "react";

export default class Sidebar extends Component {
  render() {
    return (
      <div class="hidden lg:contents">
      <div class="pr-12">
        <div class="mb-3 mt-3">
          <h1>All Sports</h1>
        </div>
        <div class="pl-1">
          {this.props.betData.map((sportData) => (
            <a class="flex items-center mb-3" href={sportData.href}>
              <img
                className="w-6 h-6 invert mr-3"
                src={sportData.image}
                alt={sportData.href}
              />
              <body>{sportData.sport}</body>
            </a>
          ))}
        </div>
      </div>
      </div>
    );
  }
}
