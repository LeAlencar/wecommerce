import { graphql } from 'graphql';
import { getContext } from '../../../../getContext';
import { schema } from '../../../../schema/schema';
import ProductModel from '../../ProductModel';
import { createUser } from '../../../user/fixture/createUser';
import {
  clearDbAndRestartCounters,
  connectMongoose,
  disconnectMongoose
} from '@wecommerce/test';
import { toGlobalId } from 'graphql-relay';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it('should not delete a product if the product does not exist', async () => {
  const user = await createUser();

  const query = /* GraphQL */ `
    mutation productDeleteMutation($input: ProductDeleteInput!) {
      ProductDeleteMutation(input: $input) {
        success
        error
      }
    }
  `;

  const input = { id: 'UHJvZHVjdDo2NTk0MGVmMTg1MTc4NDAxMDA5YzIwYTg=' };

  const variables = {
    input
  };

  const context = await getContext({
    user
  });

  const rootValue = {};

  const result = await graphql({
    schema: schema,
    source: query,
    rootValue,
    contextValue: context,
    variableValues: variables
  });

  expect(result.data?.ProductDeleteMutation?.success).toBeNull();
  expect(result.data?.ProductDeleteMutation?.error).toEqual(
    'Product does not exists'
  );
});

it('should delete a product with the correct id', async () => {
  const user = await createUser();

  const product = await new ProductModel({
    name: 'Awesome-Product',
    price: 1000,
    description: 'awesome product',
    displayName: 'Awesome Product',
    user: user._id
  }).save();

  const query = /* GraphQL */ `
    mutation productDeleteMutation($input: ProductDeleteInput!) {
      ProductDeleteMutation(input: $input) {
        success
        error
      }
    }
  `;

  const input = { id: toGlobalId('Product', product._id.toString()) };

  const variables = {
    input
  };

  const context = await getContext({
    user
  });

  const rootValue = {};

  const result = await graphql({
    schema: schema,
    source: query,
    rootValue,
    contextValue: context,
    variableValues: variables
  });

  expect(result.data?.ProductDeleteMutation?.success).toEqual(
    'product deleted successfully'
  );
  expect(result.data?.ProductDeleteMutation?.error).toBeNull();
});
