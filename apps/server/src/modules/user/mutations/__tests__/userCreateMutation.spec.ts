import {
  clearDbAndRestartCounters,
  connectMongoose,
  defaultFrozenKeys,
  disconnectMongoose,
  sanitizeTestObject
} from '@wecommerce/test';
import { createUser } from '../../fixture/createUser';
import { generateJwtToken } from '../../../../auth';
import { getContext } from '../../../../getContext';
import { graphql } from 'graphql';
import { schema } from '../../../../schema/schema';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it('should create an user', async () => {
  //const user = await createUser();
  //const token = generateJwtToken(user);

  const query = /* GraphQL */ `
    mutation userCreate($input: UserRegisterInput!) {
      userCreate(input: $input) {
        user
        error
      }
    }
  `;

  const input = {
    username: 'leandro',
    email: 'heisen@test.com',
    password: 'awesomepass',
    pixKey: 'heisen@test.com'
  };

  const variables = {
    input
  };

  const context = await getContext({});

  context.setCookie = (name, value) => {
    // Implementação de um método simples de setCookie para testes
    // Armazenar cookie em um objeto ou variável para verificação posterior, se necessário
  };

  const rootValue = {};

  const result = await graphql({
    schema: schema,
    source: query,
    rootValue,
    contextValue: context,
    variableValues: variables
  });

  expect(result.data?.userCreate.user).toBeTruthy();
  expect(result.data?.userCreate.error).toBeNull();
  expect(
    sanitizeTestObject(result.data, [...defaultFrozenKeys])
  ).toMatchSnapshot();
});
