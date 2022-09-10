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
  query SportPaneQuery {
    universalData {
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
              total
              money
              moneyButtonId
              spreadButtonId
              spread
              name
              image
            }
            contender2Data {
              name
              image
              spread
              money
              spreadButtonId
              moneyButtonId
              total
              totalButtonId
            }
          }
        }
      }
    }
  }
`;
