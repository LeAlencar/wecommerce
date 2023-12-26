import { graphql } from "react-relay";

export const RegisterUser = graphql`
  mutation RegisterMutation($input: UserRegisterInput!) {
    userCreate(input: $input) {
      user
      error
    }
  }
`;
