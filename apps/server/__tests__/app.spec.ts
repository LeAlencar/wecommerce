import request from 'supertest';

import {
  clearDbAndRestartCounters,
  connectMongoose,
  disconnectMongoose
} from '@wecommerce/test';
import { createUser } from '../src/modules/user/fixture/createUser';
import { generateJwtToken } from '../src/auth';
import app from '../src/app';
import { getContext } from '../src/getContext';
import { graphql } from 'graphql';
import { schema } from '../src/schema/schema';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it('should return 200 and return logged user', async () => {
  const user = await createUser();
  const token = generateJwtToken(user);

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
});
