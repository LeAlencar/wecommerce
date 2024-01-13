import { graphql } from "react-relay";

export const DeleteProduct = graphql`
  mutation DeleteProductMutation(
    $input: ProductDeleteInput!
    $connections: [ID!]!
  ) {
    ProductDeleteMutation(input: $input) {
      error
      success
      productId @deleteEdge(connections: $connections)
    }
  }
`;
