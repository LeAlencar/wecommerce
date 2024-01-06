import { graphql } from 'graphql';
import { getContext } from '../../../../getContext';
import UserModel from '../../UserModel';
import {
  clearDbAndRestartCounters,
  connectMongoose,
  defaultFrozenKeys,
  disconnectMongoose,
  sanitizeTestObject
} from '@wecommerce/test';
import { schema } from '../../../../schema/schema';
import bcrypt from 'bcryptjs';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it.only('should login a user', async () => {
  const user = await new UserModel({
    email: 'heisen@test.com',
    password: bcrypt.hashSync('awesomepass', 8),
    username: 'heisen'
  }).save();

  const query = /* GraphQL */ `
    mutation M($input: UserLoginInput!) {
      userLogin(input: $input) {
        me {
          id
        }
      }
    }
  `;

  const variables = {
    input: {
      email: user.email,
      password: 'awesomepass'
    }
  };

  const context = await getContext({});
  context.setCookie = jest.fn();

  const rootValue = {};

  const result = await graphql({
    schema: schema,
    source: query,
    rootValue,
    contextValue: context,
    variableValues: variables
  });

  expect(result.data.userLogin.me.id).toBeDefined();

  expect(
    sanitizeTestObject(result.data, [...defaultFrozenKeys])
  ).toMatchSnapshot();
});
