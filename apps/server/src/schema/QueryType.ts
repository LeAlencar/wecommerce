import { GraphQLObjectType, GraphQLString } from 'graphql';
import { UserType } from '../modules/user/UserType';
import { nodeField, nodesField } from '../modules/node/typeRegister';
import * as UserLoader from '../modules/user/UserLoader';
import { productConnectionField } from '../modules/product/ProductConnectionField';
import pkg from '../../package.json';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all queries',
  fields: () => ({
    node: nodeField,
    nodes: nodesField,
    ...productConnectionField(),
    me: {
      type: UserType,
      resolve: async (_, args, context) => {
        return await UserLoader.load(context, context.user?._id);
      }
    },
    version: {
      type: GraphQLString,
      resolve: () => pkg.version
    }
  })
});
export default QueryType;
