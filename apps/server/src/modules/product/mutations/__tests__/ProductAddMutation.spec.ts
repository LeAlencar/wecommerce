import {
  clearDbAndRestartCounters,
  connectMongoose,
  defaultFrozenKeys,
  disconnectMongoose,
  sanitizeTestObject
} from '@wecommerce/test';
import { generateJwtToken } from '../../../../auth';
import { getContext } from '../../../../getContext';
import { graphql } from 'graphql';
import { schema } from '../../../../schema/schema';
import { createUser } from '../../../user/fixture/createUser';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it('should create an product', async () => {
  const user = await createUser();
  generateJwtToken(user);

  const query = /* GraphQL */ `
    mutation productAddMutation($input: ProductAddInput!) {
      ProductAddMutation(input: $input) {
        productEdge {
          node {
            id
            name
          }
          cursor
        }
        error
      }
    }
  `;

  const input = {
    name: 'Awesome-Product',
    displayName: 'Awesome Product',
    description: 'awesome product',
    price: 1000
  };

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

  expect(result.data?.ProductAddMutation.productEdge).toBeTruthy();
  expect(result.data?.ProductAddMutation.productEdge.node.name).toEqual(
    'awesome-product'
  );
  expect(result.data?.ProductAddMutation.error).toBeNull();
  expect(
    sanitizeTestObject(result.data, [...defaultFrozenKeys])
  ).toMatchSnapshot();
});
