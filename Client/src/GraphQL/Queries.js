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
              line {
                type
                value
              }
            }
          }
          ... on GameBet {
            contender1Data {
              totalButtonId
              total {
                type
                value
              }
              money {
                type
                value
              }
              moneyButtonId
              spreadButtonId
              spread {
                type
                value
              }
              name
              image
            }
            contender2Data {
              name
              image
              spread {
                type
                value
              }
              money {
                type
                value
              }
              spreadButtonId
              moneyButtonId
              total {
                type
                value
              }
              totalButtonId
            }
          }
        }
      }
    }
  }
`;

export const USER_INFO_QUERY = gql`
  query UserInfoQuery {
    userInfo {
      name
    }
  }
`;
