import { ProductConnection } from './ProductType';
import {
  NullConnection,
  connectionArgs,
  withFilter
} from '@entria/graphql-mongo-helpers';
import * as ProductLoader from './ProductLoader';
import { GraphQLNonNull, GraphQLString } from 'graphql';

export const productConnectionField = () => ({
  products: {
    type: new GraphQLNonNull(ProductConnection),
    args: {
      ...connectionArgs,
      id: {
        type: GraphQLString
      }
    },
    resolve: async (obj, args, context) => {
      if (!context.user) {
        return NullConnection;
      }

      const argsWithCompany = withFilter(args, {
        user: context?.user?._id
      });

      return ProductLoader.loadAll(context, argsWithCompany);
    }
  }
});
