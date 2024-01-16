import { graphql } from "react-relay";

export const CreateCharge = graphql`
  mutation CreateChargeMutation($input: ChargeCreateInput!) {
    ChargeCreateMutation(input: $input) {
      success
      error
      node {
        id
        brCode
        customerName
        customerTaxID
        customerEmail
      }
    }
  }
`;
