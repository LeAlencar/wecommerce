import { GraphQLObjectType } from 'graphql';

import UserMutations from '../modules/user/mutations';
import ProductMutations from '../modules/product/mutations';

export default new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root of ... mutations',
  fields: () => ({
    ...UserMutations,
    ...ProductMutations
  })
});
