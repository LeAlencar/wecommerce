import { ChargeConnection } from './ChargeType';
import {
  NullConnection,
  connectionArgs,
  withFilter
} from '@entria/graphql-mongo-helpers';
//import * as ProductLoader from '../product/ProductLoader';
import * as ChargeLoader from './ChargeLoader';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import ProductModel from '../product/ProductModel';

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
      const products = await ProductModel.find({
        user: context?.user?._id
      });

      if (!products) {
        return NullConnection;
      }

      const productsIds = products.map((product) => product._id);

      const argsWithProduct = withFilter(args, {
        product: productsIds
      });
      const charges = await ChargeLoader.loadAll(context, argsWithProduct);

      return charges;
    }
  }
});
