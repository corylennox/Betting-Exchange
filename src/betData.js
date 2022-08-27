import { ContendersData } from "./contendersData";
import { svgs } from "./svgs";

export const BetData = [
  {
    sport: "Basketball",
    href: "basketball",
    icon: svgs.basketball,
    image: "https://cdn-icons-png.flaticon.com/512/921/921183.png",
    availableBets: [
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
        title: "Milwaukee Bucks @ Minnesota Timberwolves",
        contender1Data: {
          contender: ContendersData.basketball.nbaTeams[0],
          spread: "+7.5",
          money: "+140",
          total: "O 160",
        },
        contender2Data: {
          contender: ContendersData.basketball.nbaTeams[1],
          spread: "-7",
          money: "-120",
          total: "U 160",
        },
      },
      {
        type: "game",
        title: "Chicago Sky @ Minnesota Lynx",
        contender1Data: {
          contender: ContendersData.basketball.wnbaTeams[0],
          spread: "+6.5",
          money: "+140",
          total: "O 160",
        },
        contender2Data: {
          contender: ContendersData.basketball.wnbaTeams[1],
          spread: "-7",
          money: "-120",
          total: "U 160",
        },
      },
    ],
  },
  {
    sport: "Baseball",
    href: "baseball",
    icon: svgs.baseball,
    image: "https://cdn-icons-png.flaticon.com/512/3371/3371359.png",
    availableBets: [
      {
        type: "game",
        title: "Chicago Cubs @ Seattle Mariners",
        contender1Data: {
          contender: ContendersData.baseball.mlbTeams[0],
          spread: "-2.5",
          money: "-160",
          total: "O 16",
        },
        contender2Data: {
          contender: ContendersData.baseball.mlbTeams[1],
          spread: "+2",
          money: "+180",
          total: "U 16",
        },
      },
      {
        type: "game",
        title: "Cincinnati Reds @ Philadelphia Phillies",
        contender1Data: {
          contender: ContendersData.baseball.mlbTeams[2],
          spread: "-1.5",
          money: "-350",
          total: "O 6.5",
        },
        contender2Data: {
          contender: ContendersData.baseball.mlbTeams[3],
          spread: "+1",
          money: "+250",
          total: "U 6.5",
        },
      },
      {
        type: "game",
        title: "Atlanta Braves @ Pittsburgh Pirates",
        contender1Data: {
          contender: ContendersData.baseball.mlbTeams[4],
          spread: "-5",
          money: "-600",
          total: "O 8.5",
        },
        contender2Data: {
          contender: ContendersData.baseball.mlbTeams[5],
          spread: "+5.5",
          money: "+300",
          total: "U 8.5",
        },
      },
    ],
  },
  {
    sport: "Soccer",
    href: "soccer",
    icon: svgs.soccer,
    image: "https://cdn-icons-png.flaticon.com/512/907/907690.png",
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
          total: "",
        },
        contender2Data: {
          name: "",
          image: "",
          spread: "",
          money: "",
          total: "",
        },
      },
    ],
  },
];
