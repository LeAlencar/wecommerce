import { GraphQLString, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { connectionDefinitions, globalIdField } from 'graphql-relay';
import { registerTypeLoader, nodeInterface } from '../node/typeRegister';
import { load } from './ChargeLoader';
import { ProductType } from '../product/ProductType';
import * as ProductLoader from '../product/ProductLoader';
export const ChargeType = new GraphQLObjectType({
  name: 'Charge',
  description: 'Charge type',
  interfaces: () => [nodeInterface],
  fields: () => ({
    id: globalIdField('Charge'),
    brCode: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Charge brCode`,
      resolve: (Charge) => Charge.brCode
    },
    customerName: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Charge's customerName`,
      resolve: (Charge) => Charge.customerName
    },
    customerTaxID: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Charge's customerTaxID`,
      resolve: (Charge) => Charge.customerTaxID
    },
    customerEmail: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Charge's customerEmail`,
      resolve: (Charge) => Charge.customerEmail
    },
    status: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Charge's status`,
      resolve: (Charge) => Charge.status
    },
    product: {
      type: new GraphQLNonNull(ProductType),
      description: `Charge's productID`,
      resolve: async (Charge, _, context) => {
        return await ProductLoader.load(context, Charge.product);
      }
    }
  })
});

registerTypeLoader(ChargeType, load);

export const { connectionType: ChargeConnection, edgeType: ChargeEdge } =
  connectionDefinitions({
    name: 'Charge',
    nodeType: ChargeType
  });
