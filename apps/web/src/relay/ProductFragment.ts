import { graphql } from "react-relay";

export const ProductFragment = graphql`
  fragment ProductFragment_product on Product {
    id
    name
    price
    displayName
    description
  }
`;
