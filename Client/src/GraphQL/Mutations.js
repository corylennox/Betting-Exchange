import { gql } from "@apollo/client";

export const SUBMIT_BETSLIP_MUTATION = gql`
  mutation SubmitBetslip ($input: [BetInput!]!) {
    submitBetslip( input: $input) {
      returnedButtonIds
    }
  }
`;
