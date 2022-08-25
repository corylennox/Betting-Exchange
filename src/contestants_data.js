import React, { Component } from 'react'

class Contender extends Component {
  constructor (name) {
    super(props);
    
  }

}


export const ContendersData =
{
    basketball: {
        nbaTeams: {   
            celtics: {
                name: "Boston Celtics",
                image: "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
                moneyline: "-1000"
            },
            heat: {
                name: "Miami Heat",
                image: "https://assets.sportsbook.fanduel.com/images/team/nba/miami_heat.png",
                moneyline: "+350"
            },
            warriors: {
                name: "Golden State Warriors",
                image: "https://assets.sportsbook.fanduel.com/images/team/nba/golden_state_warriors.png",
                moneyline: "+250"
            },
            pelicans: {
                name: "New Orleans Pelicans",
                image: "https://assets.sportsbook.fanduel.com/images/team/nba/new_orleans_pelicans.png",
                moneyline: "+350"
            },
            mavericks: {
                name: "Dallas Mavericks",
                image: "https://assets.sportsbook.fanduel.com/images/team/nba/dallas_mavericks.png",
                moneyline: "+400"
            },
            pistons: {
                name: "Detroit Pistons",
                image: "https://assets.sportsbook.fanduel.com/images/team/nba/detroit_pistons.png",
                moneyline: "+125"
            },
            grizzlies: {
                name: "Memphis Grizzlies",
                image: "https://assets.sportsbook.fanduel.com/images/team/nba/memphis_grizzlies.png",
                moneyline: "+510"
            },
            bulls: {
                name: "Chicago Bulls",
                image: "https://assets.sportsbook.fanduel.com/images/team/nba/chicago_bulls.png",
                moneyline: "+760"
            },
            nets: {
                name: "Brooklyn Nets",
                image: "https://assets.sportsbook.fanduel.com/images/team/nba/brooklyn_nets.png",
                moneyline: "+160"
            },
            hawks: {
                name: "Atlanta Hawks",
                image: "https://assets.sportsbook.fanduel.com/images/team/nba/atlanta_hawks.png",
                moneyline: "+230"
            },
            magic: {
                name: "Orlando Magic",
                image: "https://assets.sportsbook.fanduel.com/images/team/nba/orlando_magic.png",
                moneyline: "+290"
            },
        },
        wnbaTeams: 
        [
            {
                name: "Nobody",
                moneyline: "+25"
            },
            {
                name: "Cares",
                moneyline: "+350"
            },
            {
                name: "About",
                moneyline: "+250"
            },
            {
                name: "The",
                moneyline: "+350"
            },
            {
                name: "WNBA",
                moneyline: "+400"
            },
            {
                name: "Sry not sry",
                moneyline: "+125"
            },
        ],
        euroTeams: 
        [
            {
                name: "Nobody",
                moneyline: "+25"
            },
            {
                name: "Cares",
                moneyline: "+350"
            },
            {
                name: "About",
                moneyline: "+250"
            },
            {
                name: "The",
                moneyline: "+350"
            },
            {
                name: "WNBA",
                moneyline: "+400"
            },
            {
                name: "Sry not sry",
                moneyline: "+125"
            },
        ],
    },

    baseball: {

    },
    soccer: {

    },

};

export const SkyLynxGameContenderData = {
    contenderData1: {
        name: "Minnesota Lynx",
        image: "https://assets.sportsbook.fanduel.com/images/team/wnba/minnesota_lynx.png",
        spread: "-7",
        money: "-120",
        total: "O 160"
    },

    contenderData2: {
        name: "Chicago Sky",
        image: "https://assets.sportsbook.fanduel.com/images/team/wnba/chicago_sky.png",
        spread: "+6.5",
        money: "+140",
        total: "U 160"
    }
};

export const BasketballBetData =
{
    sport: "Basketball",
    availableBets:
    [
        {
            type: "outright",
            title: "2022-23 NBA Championship Winner",
            contendersData: ContendersData.basketball.nbaTeams,
        },
        {
            type: "outright",
            title: "2022-23 WNBA Championship Winner",
            contendersData: ContendersData.basketball.wnbaTeams,
        },
        {
            type: "game",
            title: "Chicago Sky @ Minnesota Lynx",
            contenderData1: SkyLynxGameContenderData.contenderData1,
            contenderData2: SkyLynxGameContenderData.contenderData2
        },
    ]
};

export const BaseballBetData =
{
    sport: "Baseball",
    availableBets:
    [
        {
            type: "game",
            title: "Chicago Cubs @ Seattle Mariners",
            contenderData1: {
                name: "Chicago Cubs",
                image: "https://assets.sportsbook.fanduel.com/images/team/mlb/chicago_cubs.png",
                spread: "-2.5",
                money: "-160",
                total: "O 16"
            },
            contenderData2: {
                name: "Seattle Mariners",
                image: "https://assets.sportsbook.fanduel.com/images/team/mlb/seattle_mariners.png",
                spread: "+2",
                money: "+180",
                total: "U 16"
            }
        },
        {
            type: "game",
            title: "Cincinnati Reds @ Philadelphia Phillies",
            contenderData1: {
                name: "Cincinnati Reds",
                image: "https://assets.sportsbook.fanduel.com/images/team/mlb/cincinnati_reds.png",
                spread: "-1.5",
                money: "-350",
                total: "O 6.5"
            },
            contenderData2: {
                name: "Philadelphia Phillies",
                image: "https://assets.sportsbook.fanduel.com/images/team/mlb/philadelphia_phillies.png",
                spread: "+1",
                money: "+250",
                total: "U 6.5"
            }
        },
        {
            type: "game",
            title: "Atlanta Braves @ Pittsburgh Pirates",
            contenderData1: {
                name: "Atlanta Braves",
                image: "https://assets.sportsbook.fanduel.com/images/team/mlb/atlanta_braves.png",
                spread: "-5",
                money: "-600",
                total: "O 8.5"
            },
            contenderData2: {
                name: "Pittsburgh Pirates",
                image: "https://assets.sportsbook.fanduel.com/images/team/mlb/pittsburgh_pirates.png",
                spread: "+5.5",
                money: "+300",
                total: "U 8.5"
            }
        },
    ]
};

// export const basketballBets = {
//     tabs: [
//         {
//             tabName: "Featured",
//             bets: [
//                 {
//                     betId: 01
//                     betName: "2023 Champion",
//                     betType: "outright",
//                     ...
//                 },
//                 {
//                     betId: 02
//                     betName: "2023 MVP",
//                     betType: "outright",
//                     valueNames: ["Luka Doncic", "Lebron James", ...],
//                     ...
//                 }
//             ]
//         },
//         {
//             tabName: "WNBA",
//             bets: [
//                 {
//                     betName: "Lynx @ Stars",
//                     betType: "spread, money, total",
//                 },
//                 {
//                     betName: "Sun @ Pussies",
//                     betType: "spread, money, total",
//                 },
//             ]
//         }
//     ]
// }