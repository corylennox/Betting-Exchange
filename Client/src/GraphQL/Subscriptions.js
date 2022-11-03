import { gql } from "@apollo/client";

export const LINE_UPDATE_SUBSCRIPTION = gql`
    subscription LineUpdate {
        lineUpdate {
            buttonId
            newValue
        }
    }
`;
