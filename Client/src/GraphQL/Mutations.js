import { gql } from "@apollo/client";

export const SUBMIT_BETSLIP_MUTATION = gql`
  mutation SubmitBetslip ($input: [BetInput!]!) {
    submitBetslip( input: $input) {
      returnedButtonIds
    }
  }
`;

export const ADD_FUNDS_MUTATION = gql`
  mutation AddFunds ($input: AddFundsInput!) {
    addFunds( input: $input) {
      availableBalance
    }
  }
`;
