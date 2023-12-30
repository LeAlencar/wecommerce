import { graphql } from "react-relay";

export const UserLogin = graphql`
  mutation LoginMutation($input: UserLoginInput!) {
    userLogin(input: $input) {
      token
      me {
        id
      }
    }
  }
`;
