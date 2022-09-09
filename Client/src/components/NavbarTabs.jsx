import React from "react";

// Designed to be a tab for the "Home" and "My Bets" page so that a "border bottom" can be applied to those two tabs depending on which one has been clicked
export default class NavbarTabs extends React.Component {
    render() {
        return (
            <div>
                <a href={this.props.navs.home.href} className="px-3 py-7">
                    {this.props.navs.home.name}
                </a>
                <a href={this.props.navs.myBets.href} className="px-3 py-7">
                    {this.props.navs.myBets.name}
                </a>
            </div>
        );
    }
}
