import { ChargeConnection } from './ChargeType';
import { connectionArgs } from '@entria/graphql-mongo-helpers';
import * as ProductLoader from './ChargeLoader';
import { GraphQLNonNull, GraphQLString } from 'graphql';

export const chargeConnectionField = () => ({
  charges: {
    type: new GraphQLNonNull(ChargeConnection),
    args: {
      ...connectionArgs,
      id: {
        type: GraphQLString
      }
    },
    resolve: async (obj, args, context) => {
      /*
      const argsWithCompany = withFilter(args, {
        user: context?.user?._id
      });
      */
      return ProductLoader.loadAll(context, {});
    }
  }
});
