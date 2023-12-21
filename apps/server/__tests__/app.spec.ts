import {
  clearDbAndRestartCounters,
  connectMongoose,
  defaultFrozenKeys,
  disconnectMongoose,
  sanitizeTestObject
} from '@wecommerce/test';
import { getContext } from '../src/getContext';
import { graphql } from 'graphql';
import { schema } from '../src/schema/schema';

it('should return 200 and show current version', async () => {
  const query = `
    query Q {
      version
    }
  `;

  const variables = {};

  const context = await getContext({});

  const rootValue = {};

  const result = await graphql({
    schema: schema,
    source: query,
    rootValue,
    contextValue: context,
    variableValues: variables
  });

  expect(result.data?.version).toBeTruthy();
  expect(
    sanitizeTestObject(result.data, [...defaultFrozenKeys])
  ).toMatchSnapshot();
});
