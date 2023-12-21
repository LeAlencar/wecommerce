import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInt
} from 'graphql';
import { connectionDefinitions, globalIdField } from 'graphql-relay';
import { registerTypeLoader, nodeInterface } from '../node/typeRegister';
import { load } from './ProductLoader';

export const ProductType = new GraphQLObjectType({
  name: 'Product',
  description: 'Product type',
  interfaces: () => [nodeInterface],
  fields: () => ({
    id: globalIdField('Product'),
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Product's name`,
      resolve: (Product) => Product.name
    },
    displayName: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Product's displayName`,
      resolve: (Product) => Product.displayName
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Product's description`,
      resolve: (Product) => Product.description
    },
    price: {
      type: new GraphQLNonNull(GraphQLInt),
      description: `Product's price`,
      resolve: (Product) => Product.price
    }
  })
});

registerTypeLoader(ProductType, load);

export const { connectionType: ProductConnection, edgeType: ProductEdge } =
  connectionDefinitions({
    name: 'Product',
    nodeType: ProductType
  });
