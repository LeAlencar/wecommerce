import {
  clearDbAndRestartCounters,
  connectMongoose,
  defaultFrozenKeys,
  disconnectMongoose,
  sanitizeTestObject
} from '@wecommerce/test';
import { createUser } from '../fixture/createUser';
import { generateJwtToken } from '../../../auth';
import { getContext } from '../../../getContext';
import { graphql } from 'graphql';
import { schema } from '../../../schema/schema';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it('should return 200 and return logged user', async () => {
  const user = await createUser();
  generateJwtToken(user);

  const query = `
    query Q {
      me {
        id
        username
        email
      }
    }
  `;

  const variables = {};

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

  expect(result.data.me.id).toBeTruthy();
  expect(result.data.me.username).toBeTruthy();
  expect(
    sanitizeTestObject(result.data, [...defaultFrozenKeys])
  ).toMatchSnapshot();
});
