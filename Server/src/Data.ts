// The App.jsx will request UniversalData from the server, and the server will reply with this data:
export const UniversalData = {
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
export const FeaturedSportBets = {
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
              buttonId: 43452,
            },
            {
              name: "Miami Heat",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/miami_heat.png",
              buttonId: 43930,
            },
            {
              name: "Golden State Warriors",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/golden_state_warriors.png",
              buttonId: 40921,
            },
            {
              name: "Dallas Mavericks",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/dallas_mavericks.png",
              buttonId: 33432,
            },
            {
              name: "Detroit Pistons",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/detroit_pistons.png",
              buttonId: 40925,
            },
            {
              name: "Memphis Grizzlies",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/memphis_grizzlies.png",
              buttonId: 40928,
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
              buttonId: 23921,
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
              buttonId: 15432,
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
              buttonId: 2349,
            },
            {
              name: "Washington Wizards",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/washington_wizards.png",
              buttonId: 26437,
            },
            {
              name: "Utah Jazz",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/utah_jazz.png",
              buttonId: 4325,
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
              buttonId: 12049,
            },
            {
              name: "Indiana Pacers",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/indiana_pacers.png",
              buttonId: 46626,
            },
            {
              name: "Phoenix Suns",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/phoenix_suns.png",
              buttonId: 16622,
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
              buttonId: 49333,
            },
            {
              name: "Los Angeles Clippers",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/los_angeles_clippers.png",
              buttonId: 32552,
            },
            {
              name: "Milwaukee Bucks",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/milwaukee_bucks.png",
              buttonId: 3246,
            },
            {
              name: "Minnesota Timberwolves",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/minnesota_timberwolves.png",
              buttonId: 39028,
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
            spreadButtonId: 13243,
            moneyButtonId: 13244,
            totalButtonId: 13245,
          },
          contender2Data: {
            name: "Philadelphia Phillies",
            image:
              "https://assets.sportsbook.fanduel.com/images/team/mlb/philadelphia_phillies.png",
            spreadButtonId: 13246,
            moneyButtonId: 13247,
            totalButtonId: 13248,
          },
        },
        {
          type: "GameBet",
          betTitle: "Atlanta Braves @ Pittsburgh Pirates",
          contender1Data: {
            name: "Atlanta Braves",
            image:
              "https://assets.sportsbook.fanduel.com/images/team/mlb/atlanta_braves.png",
            spreadButtonId: 30423,
            moneyButtonId: 9234,
            totalButtonId: 34234,
          },
          contender2Data: {
            name: "Pittsburgh Pirates",
            image:
              "https://assets.sportsbook.fanduel.com/images/team/mlb/pittsburgh_pirates.png",
            spreadButtonId: 3094,
            moneyButtonId: 43242,
            totalButtonId: 23444,
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
              buttonId: 34322,
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
              buttonId: 39012,
            },
            {
              name: "Seattle Storm",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/wnba/seattle_storm.png",
              buttonId: 39242,
            },
            {
              name: "Los Angeles Sparks",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/wnba/los_angeles_sparks.png",
              buttonId: 23529,
            },
            {
              name: "Phoenix Mercury",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/wnba/phoenix_mercury.png",
              buttonId: 16936,
            },
            {
              name: "Dallas Wings",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/wnba/dallas_wings.png",
              buttonId: 2431,
            },
            {
              name: "Connecticut Sun",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/wnba/connecticut_sun.png",
              buttonId: 3656,
            },
            {
              name: "Chicago Sky Test",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/wnba/chicago_sky.png",
              buttonId: 44322,
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
              buttonId: 43452,
            },
            {
              name: "Miami Heat",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/miami_heat.png",
              buttonId: 43930,
            },
            {
              name: "Golden State Warriors",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/golden_state_warriors.png",
              buttonId: 40921,
            },
            {
              name: "Dallas Mavericks",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/dallas_mavericks.png",
              buttonId: 33432,
            },
            {
              name: "Detroit Pistons",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/detroit_pistons.png",
              buttonId: 40925,
            },
            {
              name: "Memphis Grizzlies",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/memphis_grizzlies.png",
              buttonId: 40928,
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
              buttonId: 23921,
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
              buttonId: 15432,
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
              buttonId: 2349,
            },
            {
              name: "Washington Wizards",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/washington_wizards.png",
              buttonId: 26437,
            },
            {
              name: "Utah Jazz",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/utah_jazz.png",
              buttonId: 4325,
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
              buttonId: 12049,
            },
            {
              name: "Indiana Pacers",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/indiana_pacers.png",
              buttonId: 46626,
            },
            {
              name: "Phoenix Suns",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/phoenix_suns.png",
              buttonId: 16622,
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
              buttonId: 49333,
            },
            {
              name: "Los Angeles Clippers",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/los_angeles_clippers.png",
              buttonId: 32552,
            },
            {
              name: "Milwaukee Bucks",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/milwaukee_bucks.png",
              buttonId: 3246,
            },
            {
              name: "Minnesota Timberwolves",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/minnesota_timberwolves.png",
              buttonId: 39028,
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
            spreadButtonId: 43940,
            moneyButtonId: 3452,
            totalButtonId: 29438,
          },
          contender2Data: {
            name: "Minnesota Timberwolves",
            image:
              "https://assets.sportsbook.fanduel.com/images/team/nba/minnesota_timberwolves.png",
            spreadButtonId: 37326,
            moneyButtonId: 33322,
            totalButtonId: 27847,
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
              buttonId: 34322,
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
              buttonId: 39012,
            },
            {
              name: "Seattle Storm",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/wnba/seattle_storm.png",
              buttonId: 39242,
            },
            {
              name: "Los Angeles Sparks",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/wnba/los_angeles_sparks.png",
              buttonId: 23529,
            },
            {
              name: "Phoenix Mercury",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/wnba/phoenix_mercury.png",
              buttonId: 16936,
            },
            {
              name: "Dallas Wings",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/wnba/dallas_wings.png",
              buttonId: 2431,
            },
            {
              name: "Connecticut Sun",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/wnba/connecticut_sun.png",
              buttonId: 3656,
            },
            {
              name: "Chicago Sky Test",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/wnba/chicago_sky.png",
              buttonId: 44322,
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
            spreadButtonId: 6837,
            moneyButtonId: 15409,
            totalButtonId: 43654,
          },
          contender2Data: {
            name: "Minnesota Lynx",
            image:
              "https://assets.sportsbook.fanduel.com/images/team/wnba/minnesota_lynx.png",
            spreadButtonId: 28578,
            moneyButtonId: 48395,
            totalButtonId: 8473,
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
            spreadButtonId: 23551,
            moneyButtonId: 23552,
            totalButtonId: 23553,
          },
          contender2Data: {
            name: "Seattle Mariners",
            image:
              "https://assets.sportsbook.fanduel.com/images/team/mlb/seattle_mariners.png",
            spreadButtonId: 23554,
            moneyButtonId: 23555,
            totalButtonId: 23556,
          },
        },
        {
          type: "GameBet",
          betTitle: "Cincinnati Reds @ Philadelphia Phillies",
          contender1Data: {
            name: "Cincinnati Reds",
            image:
              "https://assets.sportsbook.fanduel.com/images/team/mlb/cincinnati_reds.png",
            spreadButtonId: 13243,
            moneyButtonId: 13244,
            totalButtonId: 13245,
          },
          contender2Data: {
            name: "Philadelphia Phillies",
            image:
              "https://assets.sportsbook.fanduel.com/images/team/mlb/philadelphia_phillies.png",
            spreadButtonId: 13246,
            moneyButtonId: 13247,
            totalButtonId: 13248,
          },
        },
        {
          type: "GameBet",
          betTitle: "Atlanta Braves @ Pittsburgh Pirates",
          contender1Data: {
            name: "Atlanta Braves",
            image:
              "https://assets.sportsbook.fanduel.com/images/team/mlb/atlanta_braves.png",
            spreadButtonId: 30423,
            moneyButtonId: 9234,
            totalButtonId: 34234,
          },
          contender2Data: {
            name: "Pittsburgh Pirates",
            image:
              "https://assets.sportsbook.fanduel.com/images/team/mlb/pittsburgh_pirates.png",
            spreadButtonId: 3094,
            moneyButtonId: 43242,
            totalButtonId: 23444,
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
              buttonId: 43452,
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 43452,
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 43452,
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 43452,
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 43452,
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 43452,
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 43452,
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 43452,
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 43452,
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 43452,
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 43452,
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 43452,
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 43452,
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
              buttonId: 43452,
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 43452,
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 43452,
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 43452,
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 43452,
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 43452,
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 43452,
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 43452,
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 43452,
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 43452,
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 43452,
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 43452,
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
              buttonId: 43452,
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 43452,
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 43452,
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 43452,
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 43452,
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
              buttonId: 43452,
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 43452,
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 43452,
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 43452,
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
              buttonId: 43452,
            },
            {
              name: "Boston Celtics",
              image:
                "https://assets.sportsbook.fanduel.com/images/team/nba/boston_celtics.png",
              buttonId: 43452,
            },
          ],
        },
      ],
    },
  ],
};

export const SportsBets = new Map<string, any>([
  [FeaturedSportBets.sportTitle, FeaturedSportBets],
  [BasketballSportBets.sportTitle, BasketballSportBets],
  [BaseballSportBets.sportTitle, BaseballSportBets],
  [SoccerSportBets.sportTitle, SoccerSportBets],
]);
