import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import { HomeIcon, LightningBoltIcon, DocumentTextIcon, DocumentReportIcon, /*RectangleStackIcon,*/ UserIcon } from "@heroicons/react/outline";
import { HomeIcon as HomeIconSolid, LightningBoltIcon as LightningBoltIconSolid, DocumentTextIcon as DocumentTextIconSolid, DocumentReportIcon as DocumentReportIconSolid, /*RectangleStackIcon as RectangleStackIconSolid,*/ UserIcon as UserIconSolid } from "@heroicons/react/solid";

const BottomNavbarItems = [
    {
        name: 'Home',
        unselectedIcon: <HomeIcon className="h-5 w-5"/>,
        selectedIcon: <HomeIconSolid className="h-5 w-5"/>,
        hideTopBorderOnClick: false,
        href: "/home",
    },
    {
        name: 'All Sports',
        unselectedIcon: <LightningBoltIcon className="h-5 w-5"/>,
        selectedIcon: <LightningBoltIconSolid className="h-5 w-5"/>,
        hideTopBorderOnClick: false,
        href: "/all-sports",
    },
    {
        name: 'Betslip',
        unselectedIcon: <DocumentTextIcon className="h-5 w-5"/>,
        selectedIcon: <DocumentTextIconSolid className="h-5 w-5"/>,
        hideTopBorderOnClick: true,
        href: "/betslip",
    },
    {
        name: 'My Bets',
        unselectedIcon: <DocumentReportIcon className="h-5 w-5"/>, /* RectangleStackIcon */
        selectedIcon: <DocumentReportIconSolid className="h-5 w-5"/>, /* RectangleStackIconSolid */
        hideTopBorderOnClick: false,
        href: "/my-bets",
    },
    {
        name: 'Account',
        unselectedIcon: <UserIcon className="h-5 w-5"/>,
        selectedIcon: <UserIconSolid className="h-5 w-5"/>,
        hideTopBorderOnClick: false,
        href: "/account",
    },
]

function bodyFocusedCss() {
    return "text-slate-400";
}

function bodyDeFocusedCss() {
    return "text-black";
}

function divBaseCss() {
    return "grid grid-cols-1 pt-3 pb-4 items-center justify-items-center w-full h-full";
}

function divDefaultCss() {
    return divBaseCss() + " border-t-2";
}

function divHideTopBorderCss() {
    return divBaseCss() + " border-l-2 border-r-2";
}

function BottomNavbarNameAndIcon(props) {
    const location = useLocation();

    return (
        <div className={ (props.itemInfo.hideTopBorderOnClick && location.pathname === props.itemInfo.href) ? divHideTopBorderCss() : divDefaultCss() }>
            {location.pathname === props.itemInfo.href ? props.itemInfo.selectedIcon : props.itemInfo.unselectedIcon }
            <body className={location.pathname === props.itemInfo.href ? bodyFocusedCss() : bodyDeFocusedCss()}>{props.itemInfo.name}</body>
        </div>
    )
}

export default class BottomNavbar extends Component {
    constructor(props) {
        super(props);

        this.onTabClicked = this.onTabClicked.bind(this);
    }

    onTabClicked(clickedIndex) {

    }
    
d
    render() {
        return (
            <div className="flex justify-between w-full bg-white h-16">
                {
                    BottomNavbarItems.map((navbarItem, index) =>
                        (
                            <a className="w-full h-full" href={navbarItem.href} onClick={() => this.onTabClicked(index)}>
                            <div className="w-full h-full">      
                                <BottomNavbarNameAndIcon itemInfo={navbarItem} />
                            </div>
                            </a>
                        )
                    )
                }
            </div>
        )
    }
}
