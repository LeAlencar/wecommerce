import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInt
} from 'graphql';
import { connectionDefinitions, globalIdField } from 'graphql-relay';
import { registerTypeLoader, nodeInterface } from '../node/typeRegister';
import { load } from './ChargeLoader';

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
      type: new GraphQLNonNull(GraphQLInt),
      description: `Charge's customerEmail`,
      resolve: (Charge) => Charge.customerEmail
    }
  })
});

registerTypeLoader(ChargeType, load);

export const { connectionType: ChargeConnection, edgeType: ChargeEdge } =
  connectionDefinitions({
    name: 'Charge',
    nodeType: ChargeType
  });
