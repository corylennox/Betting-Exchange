// The App.jsx will request UniversalData from the server, and the server will reply with this data:
const UniversalData = {
  homepage: {
    title: "Popular",
    href: "/",
  },
  sports: [
    {
      title: "Basketball",
      href: "/basketball",
      sidebarIcon: "basketball",
      sidebarAlternateIcon: "basketballAlternate",
    },
    {
      title: "Baseball",
      href: "/baseball",
      sidebarIcon: "baseball",
      sidebarAlternateIcon: "baseballAlternate",
    },
    {
      title: "Soccer",
      href: "/soccer",
      sidebarIcon: "soccer",
      sidebarAlternateIcon: "soccerAlternate",
    },
    {
      title: "Football",
      href: "/football",
      sidebarIcon: "soccer",
      sidebarAlternateIcon: "soccerAlternate",
    },
    {
      title: "Boxing",
      href: "/boxing",
      sidebarIcon: "soccer",
      sidebarAlternateIcon: "soccerAlternate",
    },
    {
      title: "Bowling",
      href: "/bowling",
      sidebarIcon: "soccer",
      sidebarAlternateIcon: "soccerAlternate",
    },
    {
      title: "Rugby",
      href: "/rugby",
      sidebarIcon: "soccer",
      sidebarAlternateIcon: "soccerAlternate",
    },
  ],
};

// The SportPane will be passed the href and will request the information to the server, and the server will reply with this data:
const FeaturedSportBets = {
  sportTitle: "Popular",
  href: "/", //probably doesn't need to be here
  tabs: [
    {
      tabTitle: "NBA",
      availableBets: [
        {
          type: "OutrightBet",
          betTitle: "2022-23 NBA Championship Winner",
          contendersData: [
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
            {
              name: "Miami Heat",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/miami_heat.png",
              buttonId: 9043930,
              line: { type: "MoneyLine", value: -760 },
            },
            {
              name: "Golden State Warriors",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/golden_state_warriors.png",
              buttonId: 904390921,
              line: { type: "MoneyLine", value: 20 },
            },
            {
              name: "Dallas Mavericks",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/dallas_mavericks.png",
              buttonId: 433432,
              line: { type: "MoneyLine", value: 430 },
            },
            {
              name: "Detroit Pistons",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/detroit_pistons.png",
              buttonId: 906564390921,
              line: { type: "MoneyLine", value: 90 },
            },
            {
              name: "Memphis Grizzlies",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/memphis_grizzlies.png",
              buttonId: 9084390921,
              line: { type: "MoneyLine", value: -200 },
            },
            {
              name: "Chicago Bulls",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/chicago_bulls.png",
              buttonId: 2345,
              line: { type: "MoneyLine", value: 500 },
            },
            {
              name: "Brooklyn Nets",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/brooklyn_nets.png",
              buttonId: 9043903523921,
              line: { type: "MoneyLine", value: 670 },
            },
            {
              name: "Atlanta Hawks",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/atlanta_hawks.png",
              buttonId: 654,
              line: { type: "MoneyLine", value: 520 },
            },
            {
              name: "New Orleans Pelicans",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/new_orleans_pelicans.png",
              buttonId: 123,
              line: { type: "MoneyLine", value: -800 },
            },
            {
              name: "Orlando Magic",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/orlando_magic.png",
              buttonId: 456,
              line: { type: "MoneyLine", value: 810 },
            },
            {
              name: "Philadelphia 76ers",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/philadelphia_76ers.png",
              buttonId: 6543,
              line: { type: "MoneyLine", value: -540 },
            },
            {
              name: "Denver Nuggets",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/denver_nuggets.png",
              buttonId: 3265,
              line: { type: "MoneyLine", value: 910 },
            },
            {
              name: "Tornoto Raptors",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/toronto_raptors.png",
              buttonId: 65432,
              line: { type: "MoneyLine", value: 160 },
            },
            {
              name: "New York Knicks",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/new_york_knicks.png",
              buttonId: 236,
              line: { type: "MoneyLine", value: -170 },
            },
            {
              name: "Cleveland Cavaliers",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/cleveland_cavaliers.png",
              buttonId: 8492,
              line: { type: "MoneyLine", value: -920 },
            },
            {
              name: "Charlotte Hornets",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/charlotte_hornets.png",
              buttonId: 43534,
              line: { type: "MoneyLine", value: -500 },
            },
            {
              name: "Portland Trail Blazers",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/portland_trail_blazers.png",
              buttonId: 52345,
              line: { type: "MoneyLine", value: -20 },
            },
            {
              name: "Washington Wizards",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/washington_wizards.png",
              buttonId: 126437,
              line: { type: "MoneyLine", value: -500 },
            },
            {
              name: "Utah Jazz",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/utah_jazz.png",
              buttonId: 654325,
              line: { type: "MoneyLine", value: -140 },
            },
            {
              name: "Sacramento Kings",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/sacramento_kings.png",
              buttonId: 7583,
              line: { type: "MoneyLine", value: -290 },
            },
            {
              name: "Oklahoma City Thunder",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/oklahoma_city_thunder.png",
              buttonId: 62049,
              line: { type: "MoneyLine", value: -640 },
            },
            {
              name: "Indiana Pacers",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/indiana_pacers.png",
              buttonId: 2346626,
              line: { type: "MoneyLine", value: 530 },
            },
            {
              name: "Phoenix Suns",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/phoenix_suns.png",
              buttonId: 236266622,
              line: { type: "MoneyLine", value: -710 },
            },
            {
              name: "Houston Rockets",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/houston_rockets.png",
              buttonId: 544,
              line: { type: "MoneyLine", value: -50 },
            },
            {
              name: "San Antonio Spurs",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/san_antonio_spurs.png",
              buttonId: 999333,
              line: { type: "MoneyLine", value: 170 },
            },
            {
              name: "Los Angeles Clippers",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/los_angeles_clippers.png",
              buttonId: 2932552,
              line: { type: "MoneyLine", value: 20 },
            },
            {
              name: "Milwaukee Bucks",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/milwaukee_bucks.png",
              buttonId: 6653246,
              line: { type: "MoneyLine", value: 1000 },
            },
            {
              name: "Minnesota Timberwolves",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/minnesota_timberwolves.png",
              buttonId: 9889028,
              line: { type: "MoneyLine", value: 200 },
            },
          ],
        },
      ],
    },
    {
      tabTitle: "MLB",
      availableBets: [
        {
          type: "GameBet",
          betTitle: "Cincinnati Reds @ Philadelphia Phillies",
          contender1Data: {
            name: "Cincinnati Reds",
            image:
              "https://assets.sportsbook.fanduel.com/images/team/mlb/cincinnati_reds.png",
            spread: { type: "SpreadLine", value: -5.5 },
            spreadButtonId: 42663243,
            money: { type: "MoneyLine", value: 530 },
            moneyButtonId: 42663244,
            total: { type: "TotalLine", value: -7.0 }, // -6.5 translates to "O 6.5"
            totalButtonId: 42663245,
          },
          contender2Data: {
            name: "Philadelphia Phillies",
            image:
              "https://assets.sportsbook.fanduel.com/images/team/mlb/philadelphia_phillies.png",
            spread: { type: "SpreadLine", value: -11.0 },
            spreadButtonId: 42663246,
            money: { type: "MoneyLine", value: -290 },
            moneyButtonId: 42663247,
            total: { type: "TotalLine", value: 6.5 }, // -6.5 translates to "U 6.5"
            totalButtonId: 42663248,
          },
        },
        {
          type: "GameBet",
          betTitle: "Atlanta Braves @ Pittsburgh Pirates",
          contender1Data: {
            name: "Atlanta Braves",
            image:
              "https://assets.sportsbook.fanduel.com/images/team/mlb/atlanta_braves.png",
            spread: { type: "SpreadLine", value: 11.0 },
            spreadButtonId: 2930423,
            money: { type: "MoneyLine", value: 180 },
            moneyButtonId: 23409234,
            total: { type: "TotalLine", value: -13.0 }, // negative indicates "O 8.5"
            totalButtonId: 90234234,
          },
          contender2Data: {
            name: "Pittsburgh Pirates",
            image:
              "https://assets.sportsbook.fanduel.com/images/team/mlb/pittsburgh_pirates.png",
            spread: { type: "SpreadLine", value: -4.5 },
            spreadButtonId: 203094,
            money: { type: "MoneyLine", value: 280 },
            moneyButtonId: 393242,
            total: { type: "TotalLine", value: 12.5 }, // positive indicates "U 8.5"
            totalButtonId: 99323444,
          },
        },
      ],
    },
    {
      tabTitle: "WNBA",
      availableBets: [
        {
          type: "OutrightBet",
          betTitle: "2022-23 WNBA Championship Winner",
          contendersData: [
            {
              name: "Chicago Sky",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/wnba/chicago_sky.png",
              buttonId: 9934322,
              line: { type: "MoneyLine", value: 980 },
            },
            {
              name: "Minnesota Lynx",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/wnba/minnesota_lynx.png",
              buttonId: 8237,
              line: { type: "MoneyLine", value: -900 },
            },
            {
              name: "Washington Mystics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/wnba/washington_mystics.png",
              buttonId: 89012,
              line: { type: "MoneyLine", value: -120 },
            },
            {
              name: "Seattle Storm",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/wnba/seattle_storm.png",
              buttonId: 489242,
              line: { type: "MoneyLine", value: 160 },
            },
            {
              name: "Los Angeles Sparks",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/wnba/los_angeles_sparks.png",
              buttonId: 73529,
              line: { type: "MoneyLine", value: 750 },
            },
            {
              name: "Phoenix Mercury",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/wnba/phoenix_mercury.png",
              buttonId: 66936,
              line: { type: "MoneyLine", value: 990 },
            },
            {
              name: "Dallas Wings",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/wnba/dallas_wings.png",
              buttonId: 552431,
              line: { type: "MoneyLine", value: 550 },
            },
            {
              name: "Connecticut Sun",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/wnba/connecticut_sun.png",
              buttonId: 903656,
              line: { type: "MoneyLine", value: 540 },
            },
            {
              name: "Chicago Sky Test",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/wnba/chicago_sky.png",
              buttonId: 994322,
              line: { type: "MoneyLine", value: 80 },
            },
          ],
        },
      ],
    },
  ],
};

const BasketballSportBets = {
  sportTitle: "Basketball",
  href: "basketball",
  tabs: [
    {
      tabTitle: "NBA",
      availableBets: [
        {
          type: "OutrightBet",
          betTitle: "2022-23 NBA Championship Winner",
          contendersData: [
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
            {
              name: "Miami Heat",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/miami_heat.png",
              buttonId: 9043930,
              line: { type: "MoneyLine", value: -760 },
            },
            {
              name: "Golden State Warriors",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/golden_state_warriors.png",
              buttonId: 904390921,
              line: { type: "MoneyLine", value: 20 },
            },
            {
              name: "Dallas Mavericks",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/dallas_mavericks.png",
              buttonId: 433432,
              line: { type: "MoneyLine", value: 430 },
            },
            {
              name: "Detroit Pistons",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/detroit_pistons.png",
              buttonId: 906564390921,
              line: { type: "MoneyLine", value: 90 },
            },
            {
              name: "Memphis Grizzlies",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/memphis_grizzlies.png",
              buttonId: 9084390921,
              line: { type: "MoneyLine", value: -200 },
            },
            {
              name: "Chicago Bulls",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/chicago_bulls.png",
              buttonId: 2345,
              line: { type: "MoneyLine", value: 500 },
            },
            {
              name: "Brooklyn Nets",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/brooklyn_nets.png",
              buttonId: 9043903523921,
              line: { type: "MoneyLine", value: 670 },
            },
            {
              name: "Atlanta Hawks",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/atlanta_hawks.png",
              buttonId: 654,
              line: { type: "MoneyLine", value: 520 },
            },
            {
              name: "New Orleans Pelicans",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/new_orleans_pelicans.png",
              buttonId: 123,
              line: { type: "MoneyLine", value: -800 },
            },
            {
              name: "Orlando Magic",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/orlando_magic.png",
              buttonId: 456,
              line: { type: "MoneyLine", value: 810 },
            },
            {
              name: "Philadelphia 76ers",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/philadelphia_76ers.png",
              buttonId: 6543,
              line: { type: "MoneyLine", value: -540 },
            },
            {
              name: "Denver Nuggets",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/denver_nuggets.png",
              buttonId: 3265,
              line: { type: "MoneyLine", value: 910 },
            },
            {
              name: "Tornoto Raptors",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/toronto_raptors.png",
              buttonId: 65432,
              line: { type: "MoneyLine", value: 160 },
            },
            {
              name: "New York Knicks",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/new_york_knicks.png",
              buttonId: 236,
              line: { type: "MoneyLine", value: -170 },
            },
            {
              name: "Cleveland Cavaliers",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/cleveland_cavaliers.png",
              buttonId: 8492,
              line: { type: "MoneyLine", value: -920 },
            },
            {
              name: "Charlotte Hornets",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/charlotte_hornets.png",
              buttonId: 43534,
              line: { type: "MoneyLine", value: -500 },
            },
            {
              name: "Portland Trail Blazers",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/portland_trail_blazers.png",
              buttonId: 52345,
              line: { type: "MoneyLine", value: -20 },
            },
            {
              name: "Washington Wizards",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/washington_wizards.png",
              buttonId: 126437,
              line: { type: "MoneyLine", value: -500 },
            },
            {
              name: "Utah Jazz",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/utah_jazz.png",
              buttonId: 654325,
              line: { type: "MoneyLine", value: -140 },
            },
            {
              name: "Sacramento Kings",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/sacramento_kings.png",
              buttonId: 7583,
              line: { type: "MoneyLine", value: -290 },
            },
            {
              name: "Oklahoma City Thunder",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/oklahoma_city_thunder.png",
              buttonId: 62049,
              line: { type: "MoneyLine", value: -640 },
            },
            {
              name: "Indiana Pacers",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/indiana_pacers.png",
              buttonId: 2346626,
              line: { type: "MoneyLine", value: 530 },
            },
            {
              name: "Phoenix Suns",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/phoenix_suns.png",
              buttonId: 236266622,
              line: { type: "MoneyLine", value: -710 },
            },
            {
              name: "Houston Rockets",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/houston_rockets.png",
              buttonId: 544,
              line: { type: "MoneyLine", value: -50 },
            },
            {
              name: "San Antonio Spurs",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/san_antonio_spurs.png",
              buttonId: 999333,
              line: { type: "MoneyLine", value: 170 },
            },
            {
              name: "Los Angeles Clippers",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/los_angeles_clippers.png",
              buttonId: 2932552,
              line: { type: "MoneyLine", value: 20 },
            },
            {
              name: "Milwaukee Bucks",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/milwaukee_bucks.png",
              buttonId: 6653246,
              line: { type: "MoneyLine", value: 1000 },
            },
            {
              name: "Minnesota Timberwolves",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/minnesota_timberwolves.png",
              buttonId: 9889028,
              line: { type: "MoneyLine", value: 200 },
            },
          ],
        },
        {
          type: "GameBet",
          betTitle: "Milwaukee Bucks @ Minnesota Timberwolves",
          contender1Data: {
            name: "Milwaukee Bucks",
            image:
              "https://assets.sportsbook.fanduel.com/images/team/nba/milwaukee_bucks.png",
            spread: { type: "SpreadLine", value: -8.0 },
            spreadButtonId: 93940,
            money: { type: "MoneyLine", value: -490 },
            moneyButtonId: 3452,
            total: { type: "TotalLine", value: -26.0 },
            totalButtonId: 129438,
          },
          contender2Data: {
            name: "Minnesota Timberwolves",
            image:
              "https://assets.sportsbook.fanduel.com/images/team/nba/minnesota_timberwolves.png",
            spread: { type: "SpreadLine", value: -1.0 },
            spreadButtonId: 637326,
            money: { type: "MoneyLine", value: -530 },
            moneyButtonId: 33322,
            total: { type: "TotalLine", value: 25.5 },
            totalButtonId: 777847,
          },
        },
      ],
    },
    {
      tabTitle: "WNBA",
      availableBets: [
        {
          type: "OutrightBet",
          betTitle: "2022-23 WNBA Championship Winner",
          contendersData: [
            {
              name: "Chicago Sky",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/wnba/chicago_sky.png",
              buttonId: 9934322,
              line: { type: "MoneyLine", value: 980 },
            },
            {
              name: "Minnesota Lynx",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/wnba/minnesota_lynx.png",
              buttonId: 8237,
              line: { type: "MoneyLine", value: -900 },
            },
            {
              name: "Washington Mystics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/wnba/washington_mystics.png",
              buttonId: 89012,
              line: { type: "MoneyLine", value: -120 },
            },
            {
              name: "Seattle Storm",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/wnba/seattle_storm.png",
              buttonId: 489242,
              line: { type: "MoneyLine", value: 160 },
            },
            {
              name: "Los Angeles Sparks",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/wnba/los_angeles_sparks.png",
              buttonId: 73529,
              line: { type: "MoneyLine", value: 750 },
            },
            {
              name: "Phoenix Mercury",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/wnba/phoenix_mercury.png",
              buttonId: 66936,
              line: { type: "MoneyLine", value: 990 },
            },
            {
              name: "Dallas Wings",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/wnba/dallas_wings.png",
              buttonId: 552431,
              line: { type: "MoneyLine", value: 550 },
            },
            {
              name: "Connecticut Sun",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/wnba/connecticut_sun.png",
              buttonId: 903656,
              line: { type: "MoneyLine", value: 540 },
            },
            {
              name: "Chicago Sky Test",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/wnba/chicago_sky.png",
              buttonId: 994322,
              line: { type: "MoneyLine", value: 80 },
            },
          ],
        },
        {
          type: "GameBet",
          betTitle: "Chicago Sky @ Minnesota Lynx",
          contender1Data: {
            name: "Chicago Sky",
            image:
              "https://assets.sportsbook.fanduel.com/images/team/wnba/chicago_sky.png",
            spread: { type: "SpreadLine", value: 13.5 },
            spreadButtonId: 756837,
            money: { type: "MoneyLine", value: -40 },
            moneyButtonId: 15409,
            total: { type: "TotalLine", value: -43.5 },
            totalButtonId: 893654,
          },
          contender2Data: {
            name: "Minnesota Lynx",
            image:
              "https://assets.sportsbook.fanduel.com/images/team/wnba/minnesota_lynx.png",
            spread: { type: "SpreadLine", value: -6.5 },
            spreadButtonId: 628578,
            money: { type: "MoneyLine", value: -370 },
            moneyButtonId: 48395,
            total: { type: "TotalLine", value: 43.0 },
            totalButtonId: 958473,
          },
        },
      ],
    },
  ],
};

const BaseballSportBets = {
  sportTitle: "Baseball",
  href: "baseball",
  tabs: [
    {
      tabTitle: "MLB",
      availableBets: [
        {
          type: "GameBet",
          betTitle: "Chicago Cubs @ Seattle Mariners",
          contender1Data: {
            name: "Chicago Cubs",
            image:
              "https://assets.sportsbook.fanduel.com/images/team/mlb/chicago_cubs.png",
            spread: { type: "SpreadLine", value: 8.5 },
            spreadButtonId: 422223551,
            money: { type: "MoneyLine", value: 360 },
            moneyButtonId: 422223552,
            total: { type: "TotalLine", value: -42.0 },
            totalButtonId: 422223553,
          },
          contender2Data: {
            name: "Seattle Mariners",
            image:
              "https://assets.sportsbook.fanduel.com/images/team/mlb/seattle_mariners.png",
            spread: { type: "SpreadLine", value: -7.0 },
            spreadButtonId: 422223554,
            money: { type: "MoneyLine", value: -640 },
            moneyButtonId: 422223555,
            total: { type: "TotalLine", value: 41.5 },
            totalButtonId: 422223556,
          },
        },
        {
          type: "GameBet",
          betTitle: "Cincinnati Reds @ Philadelphia Phillies",
          contender1Data: {
            name: "Cincinnati Reds",
            image:
              "https://assets.sportsbook.fanduel.com/images/team/mlb/cincinnati_reds.png",
            spread: { type: "SpreadLine", value: -5.5 },
            spreadButtonId: 42663243,
            money: { type: "MoneyLine", value: 530 },
            moneyButtonId: 42663244,
            total: { type: "TotalLine", value: -7.0 },
            totalButtonId: 42663245,
          },
          contender2Data: {
            name: "Philadelphia Phillies",
            image:
              "https://assets.sportsbook.fanduel.com/images/team/mlb/philadelphia_phillies.png",
            spread: { type: "SpreadLine", value: -11.0 },
            spreadButtonId: 42663246,
            money: { type: "MoneyLine", value: -290 },
            moneyButtonId: 42663247,
            total: { type: "TotalLine", value: 6.5 },
            totalButtonId: 42663248,
          },
        },
        {
          type: "GameBet",
          betTitle: "Atlanta Braves @ Pittsburgh Pirates",
          contender1Data: {
            name: "Atlanta Braves",
            image:
              "https://assets.sportsbook.fanduel.com/images/team/mlb/atlanta_braves.png",
            spread: { type: "SpreadLine", value: 11.0 },
            spreadButtonId: 2930423,
            money: { type: "MoneyLine", value: 180 },
            moneyButtonId: 23409234,
            total: { type: "TotalLine", value: -13.0 },
            totalButtonId: 90234234,
          },
          contender2Data: {
            name: "Pittsburgh Pirates",
            image:
              "https://assets.sportsbook.fanduel.com/images/team/mlb/pittsburgh_pirates.png",
            spread: { type: "SpreadLine", value: -4.5 },
            spreadButtonId: 203094,
            money: { type: "MoneyLine", value: 280 },
            moneyButtonId: 393242,
            total: { type: "TotalLine", value: 12.5 },
            totalButtonId: 99323444,
          },
        },
      ],
    },
  ],
};

const SoccerSportBets = {
  sportTitle: "Soccer",
  href: "soccer",
  tabs: [
    {
      tabTitle: "MLS",
      availableBets: [
        {
          type: "OutrightBet",
          betTitle: "13 Contenders",
          contendersData: [
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
          ],
        },
        {
          type: "OutrightBet",
          betTitle: "12 Contenders",
          contendersData: [
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
          ],
        },
        {
          type: "OutrightBet",
          betTitle: "5 Contenders",
          contendersData: [
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
          ],
        },
        {
          type: "OutrightBet",
          betTitle: "4 Contenders",
          contendersData: [
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
          ],
        },
        {
          type: "OutrightBet",
          betTitle: "2 Contenders",
          contendersData: [
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 93452,
              line: { type: "MoneyLine", value: 400 },
            },
          ],
        },
      ],
    },
  ],
};

const SportsBets = new Map([
  [FeaturedSportBets.sportTitle, FeaturedSportBets],
  [BasketballSportBets.sportTitle, BasketballSportBets],
  [BaseballSportBets.sportTitle, BaseballSportBets],
  [SoccerSportBets.sportTitle, SoccerSportBets],
]);

module.exports = { UniversalData, FeaturedSportBets, SportsBets };
