import { GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';
import ProductModel from '../ProductModel';
import { ProductEdge } from '../ProductType';
import * as ProductLoader from '../ProductLoader';

export default mutationWithClientMutationId({
  name: 'ProductAdd',
  description: 'add a new product',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    displayName: {
      type: new GraphQLNonNull(GraphQLString)
    },
    description: {
      type: new GraphQLNonNull(GraphQLString)
    },
    price: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  mutateAndGetPayload: async (
    { description, name, displayName, price },
    context
  ) => {
    const productExists = await ProductModel.findOne({
      name: name.trim().toLowerCase()
    });

    if (productExists) {
      return {
        error: 'Product already exists'
      };
    }

    const product = await new ProductModel({
      description,
      name: name.trim().toLowerCase(),
      displayName,
      price,
      user: context.user._id
    }).save();

    return {
      id: product._id,
      error: null
    };
  },
  outputFields: {
    productEdge: {
      type: ProductEdge,
      resolve: async ({ id }, _, context) => {
        // Load new edge from loader
        const product = await ProductLoader.load(context, id);

        if (!product) {
          return null;
        }

        return {
          cursor: toGlobalId('Product', product._id),
          node: product
        };
      }
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    }
  }
});
