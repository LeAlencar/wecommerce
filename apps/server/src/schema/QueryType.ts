import { GraphQLObjectType } from 'graphql';
import { UserType } from '../modules/user/UserType';
import { nodeField, nodesField } from '../modules/node/typeRegister';
import * as UserLoader from '../modules/user/UserLoader';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all queries',
  fields: () => ({
    node: nodeField,
    nodes: nodesField,
    //...userConnectionField(),
    me: {
      type: UserType,
      resolve: async (_, args, context) => {
        return await UserLoader.load(context, context.user?._id);
      }
    }
  })
});
export default QueryType;
