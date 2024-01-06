import { GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import ProductModel from '../ProductModel';

export default mutationWithClientMutationId({
  name: 'ProductDelete',
  description: 'dele a product',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  mutateAndGetPayload: async ({ id }, context) => {
    const productExists = await ProductModel.findOne({
      _id: fromGlobalId(id).id,
      user: context.user._id
    });

    if (!productExists) {
      return {
        error: 'Product does not exists'
      };
    }

    await ProductModel.deleteOne({
      _id: fromGlobalId(id).id
    });

    return {
      success: 'product deleted successfully',
      error: null
    };
  },
  outputFields: {
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    },
    success: {
      type: GraphQLString,
      resolve: ({ success }) => success
    }
  }
});
