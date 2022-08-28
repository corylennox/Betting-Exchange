import React, { Component } from "react";

export default class Sidebar extends Component {

    render() {
        return (
            <div class="pr-12">
            <div class="mb-3"><body>All Sports</body></div>
            <div class="pl-1">
                {
                    this.props.betData.map((sportData) => (
                        <a class="flex items-center mb-3" href={sportData.href}>
                            <img className="w-6 h-6 invert mr-3" src={sportData.image} />
                            <body>{sportData.sport}</body>
                        </a>
                    ))
                }
            </div>
            </div>
        );
    }
}
