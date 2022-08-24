export const ContestantsData =
{
    basketball: {
        nbaTeams: 
        [
            {
                name: "Boston Celtics",
                image: "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
                moneyline: "-1000"
            },
            {
                name: "Miami Heat",
                image: "https://assets.sportsbook.fanduel.com/images/team/nba/miami_heat.png",
                moneyline: "+350"
            },
            {
                name: "Golden State Wariors",
                image: "https://assets.sportsbook.fanduel.com/images/team/nba/golden_state_warriors.png",
                moneyline: "+250"
            },
            {
                name: "New Orleans Pelicans",
                image: "https://assets.sportsbook.fanduel.com/images/team/nba/new_orleans_pelicans.png",
                moneyline: "+350"
            },
            {
                name: "Dallas Mavericks",
                image: "https://assets.sportsbook.fanduel.com/images/team/nba/dallas_mavericks.png",
                moneyline: "+400"
            },
            {
                name: "Detroit Pistons",
                image: "https://assets.sportsbook.fanduel.com/images/team/nba/detroit_pistons.png",
                moneyline: "+125"
            },
            {
                name: "Memphis Grizzlies",
                image: "https://assets.sportsbook.fanduel.com/images/team/nba/memphis_grizzlies.png",
                moneyline: "+510"
            },
            {
                name: "Chicago Bulls",
                image: "https://assets.sportsbook.fanduel.com/images/team/nba/chicago_bulls.png",
                moneyline: "+760"
            },
            {
                name: "Brooklyn Nets",
                image: "https://assets.sportsbook.fanduel.com/images/team/nba/brooklyn_nets.png",
                moneyline: "+160"
            },
            {
                name: "Atlanta Hawks",
                image: "https://assets.sportsbook.fanduel.com/images/team/nba/atlanta_hawks.png",
                moneyline: "+230"
            },
            {
                name: "Orlando Magic",
                image: "https://assets.sportsbook.fanduel.com/images/team/nba/orlando_magic.png",
                moneyline: "+290"
            },
        ],
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
    },

    baseball: {

    },
    soccer: {

    },

};

export const SkyLynxGame = {
    title: "Chicago Sky @ Minnesota Lynx",

    contestantData1: {
        name: "Minnesota Lynx",
        image: "https://assets.sportsbook.fanduel.com/images/team/wnba/minnesota_lynx.png",
        spread: "-7",
        money: "-120",
        total: "O 160"
    },

    contestantData2: {
        name: "Chicago Sky",
        image: "https://assets.sportsbook.fanduel.com/images/team/wnba/chicago_sky.png",
        spread: "+6.5",
        money: "+140",
        total: "U 160"
    }
};

export const BetData =
[
    {
        title: "2022-23 NBA Championship Winner",
        contestantsData: ContestantsData.basketball.nbaTeams,
    },
    {
        title: "2022-23 WNBA Championship Winner",
        contestantsData: ContestantsData.basketball.wnbaTeams,
    },
]

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