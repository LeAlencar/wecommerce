import { graphql } from "react-relay";

export const AddProduct = graphql`
  mutation AddProductMutation($input: ProductAddInput!, $connections: [ID!]!) {
    ProductAddMutation(input: $input) {
      productEdge @prependEdge(connections: $connections) {
        node {
          ...Product_product
        }
        cursor
      }
      error
    }
  }
`;
