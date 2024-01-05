import { graphql } from "react-relay";

export const CheckoutQuery = graphql`
  query CheckoutQuery($productId: ID!) {
    node(id: $productId) {
      __typename
      ... on Product {
        ...ProductFragment_product
      }
    }
  }
`;
