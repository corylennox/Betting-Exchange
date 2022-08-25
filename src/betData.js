import { ContendersData } from "./contenders_data";

export const BetData = [
    {
        sport: "Basketball",
        availableBets: [
            {
                type: "outright",
                title: "2022-23 NBA Championship Winner",
                contendersData: ContendersData.basketball.nbaTeams,
            },
            {
                type: "outright",
                title: "2022-23 WNBA Championship Winner",
                contendersData: ContendersData.basketball.nbaTeams,
            },
            {
                type: "game",
                title: "Milwaukee Bucks @ Minnesota Timberwolves",
                contender1Data: {
                    name: "Milwaukee Bucks",
                    image: "https://assets.sportsbook.fanduel.com/images/team/nba/milwaukee_bucks.png",
                    spread: "+6.5",
                    money: "+140",
                    total: "U 160"
                },
                contender2Data: {
                    name: "Minnesota Timberwolves",
                    image: "https://assets.sportsbook.fanduel.com/images/team/nba/minnesota_timberwolves.png",
                    spread: "+6.5",
                    money: "+140",
                    total: "U 160"
                },
            },
        ]
    },
    {
        sport: "Baseball",
        availableBets: [
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
    },
    {
        sport: "Soccer",
        availableBets: [
            {
                type: "outright",
                title: "",
                contendersData: ContendersData.basketball.nbaTeams,
            },
            {
                type: "game",
                title: "",
                contender1Data: {
                    name: "",
                    image: "",
                    spread: "",
                    money: "",
                    total: ""
                },
                contender2Data: {
                    name: "",
                    image: "",
                    spread: "",
                    money: "",
                    total: ""
                },
            },
        ],
    }
];