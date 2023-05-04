import { gql } from "@apollo/client";

export const LOAD_USERS = gql`
  query {
    getAllUsers {
      id
      firstName
      lastName
      email
      password
    }
  }
`;

export const UNIVERSAL_DATA_QUERY = gql`
  query UniversalDataQuery {
    universalData {
      homepage {
        title
        href
      }
      sports {
        title
        href
        sidebarIcon
        sidebarAlternateIcon
      }
    }
  }
`;

export const SPORT_PANE_QUERY = gql`
  query SportPaneQuery($sportTitle: String!) {
    sportPane(sportTitle: $sportTitle) {
      sportData {
        sportTitle
        href
        tabs {
          tabTitle
          availableBets {
            type
            betTitle
            ... on OutrightBet {
              contendersData {
                buttonId
                image
                name
              }
            }
            ... on GameBet {
              contender1Data {
                totalButtonId
                moneyButtonId
                spreadButtonId
                name
                image
              }
              contender2Data {
                name
                image
                spreadButtonId
                moneyButtonId
                totalButtonId
              }
            }
          }
        }
      }
      lines {
        buttonId
        type
        value
      }
    }
  }
`;

export const LINES_QUERY = gql`
  query LinesQuery($buttonIds: [ID!]!) {
    lines(buttonIds: $buttonIds) {
      buttonId
      type
      value
    }
  }
`;

export const MY_BETS_QUERY = gql`
  query MyBetsQuery {
    myBets {
      id
      wager
      timePlaced
      totalPayout
      buttonId
      status
    }
  }
`;

export const BALANCE_QUERY = gql`
  query BalanceQuery {
    balance {
      availableBalance
    }
  }
`;
