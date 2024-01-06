import { mutationWithClientMutationId } from 'graphql-relay';
import { GraphQLString } from 'graphql';

export const userLogout = mutationWithClientMutationId({
  name: 'UserLogout',
  inputFields: {},
  mutateAndGetPayload: async (_, context) => {
    await context.setCookie('userToken', null);

    return {
      error: null,
      success: 'logout successful'
    };
  },
  outputFields: {
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    },
    success: {
      type: GraphQLString,
      resolve: ({ success }) => success
    }
  }
});
