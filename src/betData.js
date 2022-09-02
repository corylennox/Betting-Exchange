import { ContendersData } from "./contendersData";
import { svgs } from "./svgs";
import ContenderAndIcon from "./components/ContenderAndIcon"

export const BetData = [
  {
    sport: "Featured",
    href: "featured",
    icon: svgs.StarIcon,
    imageWhite: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
    imageBlue: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
    availableBets: [
      {
        type: "outright",
        title: "2022-23 NBA Championship Winner",
        contendersData: ContendersData.basketball.nbaTeams,
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
        type: "outright",
        title: "2022-23 WNBA Championship Winner",
        contendersData: ContendersData.basketball.wnbaTeams,
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
    
    sport: "Basketball",
    href: "basketball",
    icon: svgs.basketball,
    imageWhite: "https://cdn-icons-png.flaticon.com/512/921/921183.png",
    imageBlue: "https://cdn-icons-png.flaticon.com/512/921/921183.png",
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
          contender: ContendersData.basketball.nbaTeams[28],
          spread: "+7.5",
          money: "+140",
          total: "O 160",
        },
        contender2Data: {
          contender: ContendersData.basketball.nbaTeams[29],
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
    imageWhite: "https://cdn-icons-png.flaticon.com/512/3371/3371359.png",
    imageBlue: "https://cdn-icons-png.flaticon.com/512/3371/3371359.png",
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
    imageWhite: "https://cdn-icons-png.flaticon.com/512/907/907690.png",
    imageBlue: "https://cdn-icons-png.flaticon.com/512/907/907690.png",
    availableBets: [
      {
        type: "outright",
        title: "13 Contenders",
        contendersData: [
          <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />, <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />, <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />, <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />, <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />, <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />, <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />, <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />, <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />, <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />, <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />, <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />, <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />,
        ],
      },
      {
        type: "outright",
        title: "12 Contenders",
        contendersData: [
          <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />, <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />, <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />, <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />, <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />, <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />, <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />, <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />, <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />, <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />, <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />, <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />,
        ],
      },
      {
        type: "outright",
        title: "5 Contenders",
        contendersData: [
          <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />, <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />, <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />, <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />, <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />,
        ],
      },
      {
        type: "outright",
        title: "4 Contenders",
        contendersData: [
          <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />, <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />, <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />, <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />,
        ],
      },
      {
        type: "outright",
        title: "2 Contenders",
        contendersData: [
          <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />, <ContenderAndIcon
            name="Boston Celtics"
            image="https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png"
          />,
        ],
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
  {
    sport: "Football",
    href: "featured",
    icon: svgs.StarIcon,
    imageWhite: "https://cdn-icons-png.flaticon.com/128/2087/2087177.png",
    imageBlue: "https://cdn-icons-png.flaticon.com/128/2087/2087177.png",
    availableBets: []
  },
  {
    sport: "Boxing",
    href: "featured",
    icon: svgs.StarIcon,
    imageWhite: "https://cdn-icons-png.flaticon.com/128/1804/1804582.png",
    imageBlue: "https://cdn-icons-png.flaticon.com/128/1804/1804582.png",
    availableBets: []
  },
  {
    sport: "Bowling",
    href: "featured",
    icon: svgs.StarIcon,
    imageWhite: "https://cdn-icons-png.flaticon.com/128/3390/3390440.png",
    imageBlue: "https://cdn-icons-png.flaticon.com/128/3390/3390440.png",
    availableBets: []
  },
  {
    sport: "Rugby",
    href: "featured",
    icon: svgs.StarIcon,
    imageWhite: "https://cdn-icons-png.flaticon.com/128/902/902997.png",
    imageBlue: "https://cdn-icons-png.flaticon.com/128/902/902997.png",
    availableBets: []
  },
];
