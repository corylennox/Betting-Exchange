// The App.jsx will request UniversalData from the server, and the server will reply with this data:
export const UniversalData = {
  sports: [
    {
      title: "Featured",
      href: "featured",
      sidebarIcon: "featured",
      sidebarAlternateIcon: "featuredAlternate",
    },
    {
      title: "Basketball",
      href: "basketball",
      sidebarIcon: "basketball",
      sidebarAlternateIcon: "basketballAlternate",
    },
    {
      title: "Baseball",
      href: "baseball",
      sidebarIcon: "baseball",
      sidebarAlternateIcon: "baseballAlternate",
    },
    {
      title: "Soccer",
      href: "soccer",
      sidebarIcon: "soccer",
      sidebarAlternateIcon: "soccerAlternate",
    },
    {
      title: "Football",
      href: "football",
      sidebarIcon: "soccer",
      sidebarAlternateIcon: "soccerAlternate",
    },
    {
      title: "Boxing",
      href: "boxing",
      sidebarIcon: "soccer",
      sidebarAlwternateIcon: "soccerAlternate",
    },
    {
      title: "Bowling",
      href: "bowling",
      sidebarIcon: "soccer",
      sidebarAlternateIcon: "soccerAlternate",
    },
    {
      title: "Rugby",
      href: "rugby",
      sidebarIcon: "soccer",
      sidebarAlternateIcon: "soccerAlternate",
    },
  ],
};

// The SportPane will be passed the href and will request the information to the server, and the server will reply with this data:
export const SportBets = [
  {
    sportTitle: "Featured",
    href: "featured",
    tabs: [
      {
        tabTitle: "NBA",
        availableBets: [
          {
            type: "outright",
            betTitle: "2022-23 NBA Championship Winner",
            contendersData: [
              {
                name: "Boston Celtics",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
                buttonId: 93452,
              },
              {
                name: "Miami Heat",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/nba/miami_heat.png",
                buttonId: 9043930,
              },
              {
                name: "Golden State Warriors",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/nba/golden_state_warriors.png",
                buttonId: 904390921,
              },
              {
                name: "Dallas Mavericks",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/nba/dallas_mavericks.png",
                buttonId: 433432,
              },
              {
                name: "Detroit Pistons",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/nba/detroit_pistons.png",
                buttonId: 906564390921,
              },
              {
                name: "Memphis Grizzlies",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/nba/memphis_grizzlies.png",
                buttonId: 9084390921,
              },
              {
                name: "Chicago Bulls",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/nba/chicago_bulls.png",
                buttonId: 2345,
              },
              {
                name: "Brooklyn Nets",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/nba/brooklyn_nets.png",
                buttonId: 9043903523921,
              },
              {
                name: "Atlanta Hawks",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/nba/atlanta_hawks.png",
                buttonId: 654,
              },
              {
                name: "New Orleans Pelicans",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/nba/new_orleans_pelicans.png",
                buttonId: 123,
              },
              {
                name: "Orlando Magic",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/nba/orlando_magic.png",
                buttonId: 456,
              },
              {
                name: "Philadelphia 76ers",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/nba/philadelphia_76ers.png",
                buttonId: 6543,
              },
              {
                name: "Denver Nuggets",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/nba/denver_nuggets.png",
                buttonId: 3265,
              },
              {
                name: "Tornoto Raptors",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/nba/toronto_raptors.png",
                buttonId: 65432,
              },
              {
                name: "New York Knicks",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/nba/new_york_knicks.png",
                buttonId: 236,
              },
              {
                name: "Cleveland Cavaliers",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/nba/cleveland_cavaliers.png",
                buttonId: 8492,
              },
              {
                name: "Charlotte Hornets",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/nba/charlotte_hornets.png",
                buttonId: 43534,
              },
              {
                name: "Portland Trail Blazers",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/nba/portland_trail_blazers.png",
                buttonId: 52345,
              },
              {
                name: "Washington Wizards",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/nba/washington_wizards.png",
                buttonId: 126437,
              },
              {
                name: "Utah Jazz",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/nba/utah_jazz.png",
                buttonId: 654325,
              },
              {
                name: "Sacramento Kings",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/nba/sacramento_kings.png",
                buttonId: 7583,
              },
              {
                name: "Oklahoma City Thunder",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/nba/oklahoma_city_thunder.png",
                buttonId: 62049,
              },
              {
                name: "Indiana Pacers",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/nba/indiana_pacers.png",
                buttonId: 2346626,
              },
              {
                name: "Phoenix Suns",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/nba/phoenix_suns.png",
                buttonId: 236266622,
              },
              {
                name: "Houston Rockets",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/nba/houston_rockets.png",
                buttonId: 544,
              },
              {
                name: "San Antonio Spurs",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/nba/san_antonio_spurs.png",
                buttonId: 999333,
              },
              {
                name: "Los Angeles Clippers",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/nba/los_angeles_clippers.png",
                buttonId: 2932552,
              },
              {
                name: "Milwaukee Bucks",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/nba/milwaukee_bucks.png",
                buttonId: 6653246,
              },
              {
                name: "Minnesota Timberwolves",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/nba/minnesota_timberwolves.png",
                buttonId: 9889028,
              },
            ],
          },
        ],
      },
      {
        tabTitle: "MLB",
        availableBets: [
          {
            type: "game",
            betTitle: "Cincinnati Reds @ Philadelphia Phillies",
            contender1Data: {
              name: "Cincinnati Reds",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/mlb/cincinnati_reds.png",
              spread: -1.5,
              spreadButtonId: 42663243,
              money: -350,
              moneyButtonId: 42663244,
              total: -6.5, // -6.5 translates to "O 6.5"
              totalButtonId: 42663245,
            },
            contender2Data: {
              name: "Philadelphia Phillies",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/mlb/philadelphia_phillies.png",
              spread: 1,
              spreadButtonId: 42663246,
              money: 250,
              moneyButtonId: 42663247,
              total: 6.5, // -6.5 translates to "U 6.5"
              totalButtonId: 42663248,
            },
          },
          {
            type: "game",
            betTitle: "Atlanta Braves @ Pittsburgh Pirates",
            contender1Data: {
              name: "Atlanta Braves",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/mlb/atlanta_braves.png",
              spread: -5,
              spreadButtonId: 2930423,
              money: -600,
              moneyButtonId: 23409234,
              total: -8.5, // negative indicates "O 8.5"
              totalButtonId: 90234234,
            },
            contender2Data: {
              name: "Pittsburgh Pirates",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/mlb/pittsburgh_pirates.png",
              spread: 5.5,
              spreadButtonId: 203094,
              money: 300,
              moneyButtonId: 393242,
              total: 8.5, // positive indicates "U 8.5"
              totalButtonId: 99323444,
            },
          },
        ],
      },
      {
        tabTitle: "WNBA",
        availableBets: [
          {
            type: "outright",
            betTitle: "2022-23 WNBA Championship Winner",
            contendersData: [
              {
                name: "Chicago Sky",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/wnba/chicago_sky.png",
                buttonId: 9934322,
              },
              {
                name: "Minnesota Lynx",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/wnba/minnesota_lynx.png",
                buttonId: 8237,
              },
              {
                name: "Washington Mystics",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/wnba/washington_mystics.png",
                buttonId: 89012,
              },
              {
                name: "Seattle Storm",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/wnba/seattle_storm.png",
                buttonId: 489242,
              },
              {
                name: "Los Angeles Sparks",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/wnba/los_angeles_sparks.png",
                buttonId: 73529,
              },
              {
                name: "Phoenix Mercury",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/wnba/phoenix_mercury.png",
                buttonId: 66936,
              },
              {
                name: "Dallas Wings",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/wnba/dallas_wings.png",
                buttonId: 552431,
              },
              {
                name: "Connecticut Sun",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/wnba/connecticut_sun.png",
                buttonId: 903656,
              },
              {
                name: "Chicago Sky",
                image:
                  "https://assets.sportsbook.fanduel.com/images/team/wnba/chicago_sky.png",
                buttonId: 994322,
              },
            ],
          },
        ],
      },
    ],
  },
];

// At startup, we pull data from the backend to determine what SportPanes exist
// backend sends a list to frontend -> ["Featured", "Basketball", "Baseball", ...]
//
//
// Featured -> When this is loaded, pulls "featured" BetData from backend
// loads Featured view
// Basketball -> When this is loaded, pull "basketball" BetData from backend
// ...
//

export const BetData = [
  {
    sport: "Featured",
    href: "featured",
    icon: "featured",
    alternateIcon: "featuredAlternate",
    imageWhite: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
    imageBlue: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
    availableBets: [
      {
        type: "outright",
        title: "2022-23 NBA Championship Winner",
        contendersData: [
          { contenderId: "bostonceltics", buttonId: 93452 },
          { contenderId: "miamiheat", buttonId: 9043930 },
          { contenderId: "goldenstatewarriors", buttonId: 904390921 },
          { contenderId: "dallasmavericks", buttonId: 433432 },
          { contenderId: "detroitpistons", buttonId: 906564390921 },
          { contenderId: "memphisgrizzlies", buttonId: 9084390921 },
          { contenderId: "chicagobulls", buttonId: 2345 },
          { contenderId: "brooklynnets", buttonId: 9043903523921 },
          { contenderId: "atlantahawks", buttonId: 654 },
          { contenderId: "neworleanspelicans", buttonId: 123 },
          { contenderId: "orlandomagic", buttonId: 456 },
          { contenderId: "philadelphia76ers", buttonId: 6543 },
          { contenderId: "denvernuggets", buttonId: 3265 },
          { contenderId: "torontoraptors", buttonId: 65432 },
          { contenderId: "newyorkknicks", buttonId: 236 },
          { contenderId: "clevelandcavaliers", buttonId: 8492 },
          { contenderId: "charlottehornets", buttonId: 43534 },
          { contenderId: "portlandtrailblazers", buttonId: 52345 },
          { contenderId: "washingtonwizards", buttonId: 126437 },
          { contenderId: "utahjazz", buttonId: 654325 },
          { contenderId: "sacramentokings", buttonId: 7583 },
          { contenderId: "oklahomacitythunder", buttonId: 62049 },
          { contenderId: "indianapacers", buttonId: 2346626 },
          { contenderId: "phoenixsunds", buttonId: 236266622 },
          { contenderId: "houstonrockets", buttonId: 544 },
          { contenderId: "sanantoniospurs", buttonId: 999333 },
          { contenderId: "losangelesclippers", buttonId: 2932552 },
          { contenderId: "milwaukeebucks", buttonId: 6653246 },
          { contenderId: "minnesotatimberwolves", buttonId: 9889028 },
        ],
      },
      {
        type: "game",
        title: "Cincinnati Reds @ Philadelphia Phillies",
        contender1Data: {
          contenderId: "cincinnatireds",
          spread: "-1.5",
          spreadButtonId: 42663243,
          money: "-350",
          moneyButtonId: 42663244,
          total: "O 6.5",
          totalButtonId: 42663245,
        },
        contender2Data: {
          contenderId: "philadelphiaphillies",
          spread: "+1",
          spreadButtonId: 42663246,
          money: "+250",
          moneyButtonId: 42663247,
          total: "U 6.5",
          totalButtonId: 42663248,
        },
      },
      {
        type: "outright",
        title: "2022-23 WNBA Championship Winner",
        contendersData: [
          { contenderId: "chicagosky", buttonId: 9934322 },
          { contenderId: "minnesotalynx", buttonId: 8237 },
          { contenderId: "washingtonmystics", buttonId: 89012 },
          { contenderId: "seattlestorm", buttonId: 489242 },
          { contenderId: "losangelessparks", buttonId: 73529 },
          { contenderId: "phoenixmercury", buttonId: 66936 },
          { contenderId: "dallaswings", buttonId: 552431 },
          { contenderId: "connecticutsun", buttonId: 903656 },
          { contenderId: "chicagosky", buttonId: 994322 },
        ],
      },
      {
        type: "game",
        title: "Atlanta Braves @ Pittsburgh Pirates",
        contender1Data: {
          contenderId: "atlantabraves",
          spread: "-5",
          spreadButtonId: 2930423,
          money: "-600",
          moneyButtonId: 23409234,
          total: "O 8.5",
          totalButtonId: 90234234,
        },
        contender2Data: {
          contenderId: "pittsburghpirates",
          spread: "+5.5",
          spreadButtonId: 203094,
          money: "+300",
          moneyButtonId: 393242,
          total: "U 8.5",
          totalButtonId: 99323444,
        },
      },
    ],
  },
  {
    sport: "Basketball",
    href: "basketball",
    icon: "basketball",
    alternateIcon: "basketballAlternate",
    imageWhite: "https://cdn-icons-png.flaticon.com/512/921/921183.png",
    imageBlue: "https://cdn-icons-png.flaticon.com/512/921/921183.png",
    availableBets: [
      {
        type: "outright",
        title: "2022-23 NBA Championship Winner",
        contendersData: [
          { contenderId: "bostonceltics", buttonId: 93452 },
          { contenderId: "miamiheat", buttonId: 9043930 },
          { contenderId: "goldenstatewarriors", buttonId: 904390921 },
          { contenderId: "dallasmavericks", buttonId: 433432 },
          { contenderId: "detroitpistons", buttonId: 906564390921 },
          { contenderId: "memphisgrizzlies", buttonId: 9084390921 },
          { contenderId: "chicagobulls", buttonId: 2345 },
          { contenderId: "brooklynnets", buttonId: 9043903523921 },
          { contenderId: "atlantahawks", buttonId: 654 },
          { contenderId: "neworleanspelicans", buttonId: 123 },
          { contenderId: "orlandomagic", buttonId: 456 },
          { contenderId: "philadelphia76ers", buttonId: 6543 },
          { contenderId: "denvernuggets", buttonId: 3265 },
          { contenderId: "torontoraptors", buttonId: 65432 },
          { contenderId: "newyorkknicks", buttonId: 236 },
          { contenderId: "clevelandcavaliers", buttonId: 8492 },
          { contenderId: "charlottehornets", buttonId: 43534 },
          { contenderId: "portlandtrailblazers", buttonId: 52345 },
          { contenderId: "washingtonwizards", buttonId: 126437 },
          { contenderId: "utahjazz", buttonId: 654325 },
          { contenderId: "sacramentokings", buttonId: 7583 },
          { contenderId: "oklahomacitythunder", buttonId: 62049 },
          { contenderId: "indianapacers", buttonId: 2346626 },
          { contenderId: "phoenixsunds", buttonId: 236266622 },
          { contenderId: "houstonrockets", buttonId: 544 },
          { contenderId: "sanantoniospurs", buttonId: 999333 },
          { contenderId: "losangelesclippers", buttonId: 2932552 },
          { contenderId: "milwaukeebucks", buttonId: 6653246 },
          { contenderId: "minnesotatimberwolves", buttonId: 9889028 },
        ],
      },
      {
        type: "outright",
        title: "2022-23 WNBA Championship Winner",
        contendersData: [
          { contenderId: "chicagosky", buttonId: 9934322 },
          { contenderId: "minnesotalynx", buttonId: 8237 },
          { contenderId: "washingtonmystics", buttonId: 89012 },
          { contenderId: "seattlestorm", buttonId: 489242 },
          { contenderId: "losangelessparks", buttonId: 73529 },
          { contenderId: "phoenixmercury", buttonId: 66936 },
          { contenderId: "dallaswings", buttonId: 552431 },
          { contenderId: "connecticutsun", buttonId: 903656 },
          { contenderId: "chicagosky", buttonId: 994322 },
        ],
      },
      {
        type: "game",
        title: "Milwaukee Bucks @ Minnesota Timberwolves",
        contender1Data: {
          contenderId: "milwaukeebucks",
          spread: "+7.5",
          spreadButtonId: 93940,
          money: "+140",
          moneyButtonId: 3452,
          total: "O 160",
          totalButtonId: 129438,
        },
        contender2Data: {
          contenderId: "minnesotatimberwolves",
          spread: "-7",
          spreadButtonId: 637326,
          money: "-120",
          moneyButtonId: 33322,
          total: "U 160",
          totalButtonId: 777847,
        },
      },
      {
        type: "game",
        title: "Chicago Sky @ Minnesota Lynx",
        contender1Data: {
          contenderId: "chicagosky",
          spread: "+6.5",
          spreadButtonId: 756837,
          money: "+140",
          moneyButtonId: 15409,
          total: "O 160",
          totalButtonId: 893654,
        },
        contender2Data: {
          contenderId: "minnesotalynx",
          spread: "-7",
          spreadButtonId: 628578,
          money: "-120",
          moneyButtonId: 48395,
          total: "U 160",
          totalButtonId: 958473,
        },
      },
    ],
  },
  {
    sport: "Baseball",
    href: "baseball",
    icon: "baseball",
    alternateIcon: "baseballAlternate",
    imageWhite: "https://cdn-icons-png.flaticon.com/512/3371/3371359.png",
    imageBlue: "https://cdn-icons-png.flaticon.com/512/3371/3371359.png",
    availableBets: [
      {
        type: "game",
        title: "Chicago Cubs @ Seattle Mariners",
        contender1Data: {
          contenderId: "chicagocubs",
          spread: "-2.5",
          spreadButtonId: 422223551,
          money: "-160",
          moneyButtonId: 422223552,
          total: "O 16",
          totalButtonId: 422223553,
        },
        contender2Data: {
          contenderId: "seattlemariners",
          spread: "+2",
          spreadButtonId: 422223554,
          money: "+180",
          moneyButtonId: 422223555,
          total: "U 16",
          totalButtonId: 422223556,
        },
      },
      {
        type: "game",
        title: "Cincinnati Reds @ Philadelphia Phillies",
        contender1Data: {
          contenderId: "cincinnatireds",
          spread: "-1.5",
          spreadButtonId: 42663243,
          money: "-350",
          moneyButtonId: 42663244,
          total: "O 6.5",
          totalButtonId: 42663245,
        },
        contender2Data: {
          contenderId: "philadelphiaphillies",
          spread: "+1",
          spreadButtonId: 42663246,
          money: "+250",
          moneyButtonId: 42663247,
          total: "U 6.5",
          totalButtonId: 42663248,
        },
      },
      {
        type: "game",
        title: "Atlanta Braves @ Pittsburgh Pirates",
        contender1Data: {
          contenderId: "atlantabraves",
          spread: "-5",
          spreadButtonId: 2930423,
          money: "-600",
          moneyButtonId: 23409234,
          total: "O 8.5",
          totalButtonId: 90234234,
        },
        contender2Data: {
          contenderId: "pittsburghpirates",
          spread: "+5.5",
          spreadButtonId: 203094,
          money: "+300",
          moneyButtonId: 393242,
          total: "U 8.5",
          totalButtonId: 99323444,
        },
      },
    ],
  },
  {
    sport: "Soccer",
    href: "soccer",
    icon: "soccer",
    alternateIcon: "soccerAlternate",
    imageWhite: "https://cdn-icons-png.flaticon.com/512/907/907690.png",
    imageBlue: "https://cdn-icons-png.flaticon.com/512/907/907690.png",
    availableBets: [
      {
        type: "outright",
        title: "13 Contenders",
        contendersData: [
          { contenderId: "bostonceltics", buttonId: 93452 },
          { contenderId: "bostonceltics", buttonId: 93452 },
          { contenderId: "bostonceltics", buttonId: 93452 },
          { contenderId: "bostonceltics", buttonId: 93452 },
          { contenderId: "bostonceltics", buttonId: 93452 },
          { contenderId: "bostonceltics", buttonId: 93452 },
          { contenderId: "bostonceltics", buttonId: 93452 },
          { contenderId: "bostonceltics", buttonId: 93452 },
          { contenderId: "bostonceltics", buttonId: 93452 },
          { contenderId: "bostonceltics", buttonId: 93452 },
          { contenderId: "bostonceltics", buttonId: 93452 },
          { contenderId: "bostonceltics", buttonId: 93452 },
          { contenderId: "bostonceltics", buttonId: 93452 },
        ],
      },
      {
        type: "outright",
        title: "12 Contenders",
        contendersData: [
          { contenderId: "bostonceltics", buttonId: 93452 },
          { contenderId: "bostonceltics", buttonId: 93452 },
          { contenderId: "bostonceltics", buttonId: 93452 },
          { contenderId: "bostonceltics", buttonId: 93452 },
          { contenderId: "bostonceltics", buttonId: 93452 },
          { contenderId: "bostonceltics", buttonId: 93452 },
          { contenderId: "bostonceltics", buttonId: 93452 },
          { contenderId: "bostonceltics", buttonId: 93452 },
          { contenderId: "bostonceltics", buttonId: 93452 },
          { contenderId: "bostonceltics", buttonId: 93452 },
          { contenderId: "bostonceltics", buttonId: 93452 },
          { contenderId: "bostonceltics", buttonId: 93452 },
        ],
      },
      {
        type: "outright",
        title: "5 Contenders",
        contendersData: [
          { contenderId: "bostonceltics", buttonId: 93452 },
          { contenderId: "bostonceltics", buttonId: 93452 },
          { contenderId: "bostonceltics", buttonId: 93452 },
          { contenderId: "bostonceltics", buttonId: 93452 },
          { contenderId: "bostonceltics", buttonId: 93452 },
        ],
      },
      {
        type: "outright",
        title: "4 Contenders",
        contendersData: [
          { contenderId: "bostonceltics", buttonId: 93452 },
          { contenderId: "bostonceltics", buttonId: 93452 },
          { contenderId: "bostonceltics", buttonId: 93452 },
          { contenderId: "bostonceltics", buttonId: 93452 },
        ],
      },
      {
        type: "outright",
        title: "2 Contenders",
        contendersData: [
          { contenderId: "bostonceltics", buttonId: 93452 },
          { contenderId: "bostonceltics", buttonId: 93452 },
        ],
      },
    ],
  },
  {
    sport: "Football",
    href: "football",
    icon: "soccer",
    alternateIcon: "soccerAlternate",
    imageWhite: "https://cdn-icons-png.flaticon.com/128/2087/2087177.png",
    imageBlue: "https://cdn-icons-png.flaticon.com/128/2087/2087177.png",
    availableBets: [],
  },
  {
    sport: "Boxing",
    href: "boxing",
    icon: "soccer",
    alternateIcon: "soccerAlternate",
    imageWhite: "https://cdn-icons-png.flaticon.com/128/1804/1804582.png",
    imageBlue: "https://cdn-icons-png.flaticon.com/128/1804/1804582.png",
    availableBets: [],
  },
  {
    sport: "Bowling",
    href: "bowling",
    icon: "soccer",
    alternateIcon: "soccerAlternate",
    imageWhite: "https://cdn-icons-png.flaticon.com/128/3390/3390440.png",
    imageBlue: "https://cdn-icons-png.flaticon.com/128/3390/3390440.png",
    availableBets: [],
  },
  {
    sport: "Rugby",
    href: "rugby",
    icon: "soccer",
    alternateIcon: "soccerAlternate",
    imageWhite: "https://cdn-icons-png.flaticon.com/128/902/902997.png",
    imageBlue: "https://cdn-icons-png.flaticon.com/128/902/902997.png",
    availableBets: [],
  },
];
