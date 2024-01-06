import { graphql } from "react-relay";

export const UserLogout = graphql`
  mutation LogoutMutation($input: UserLogoutInput!) {
    userLogout(input: $input) {
      error
      success
    }
  }
`;
