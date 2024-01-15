import { toGlobalId } from 'graphql-relay';
import UserModel from '../../../user/UserModel';
import * as bcrypt from 'bcryptjs';
import ProductModel from '../../../product/ProductModel';
import { getContext } from '../../../../getContext';
import { graphql } from 'graphql';
import fetchMock from 'jest-fetch-mock';
import { schema } from '../../../../schema/schema';
import {
  clearDbAndRestartCounters,
  connectMongoose,
  disconnectMongoose
} from '@wecommerce/test';

beforeAll(connectMongoose);

beforeEach(async () => {
  await clearDbAndRestartCounters();
  jest.clearAllMocks();
  fetchMock.resetMocks();
});

afterAll(disconnectMongoose);

describe('ChargeCreateMutation', () => {
  it('should create a new charge', async () => {
    const user = await new UserModel({
      email: 'heisen@test.com',
      password: bcrypt.hashSync('awesomepass', 8),
      username: 'heisen',
      pixKey: 'fake-pix-key'
    }).save();

    const fakeProduct = await new ProductModel({
      name: 'fake-product',
      description: 'fake-description',
      displayName: 'fake-display-name',
      price: 100,
      user: user._id
    }).save();

    const query = /* GraphQL */ `
      mutation ChargeCreateMutation($input: ChargeCreateInput!) {
        ChargeCreateMutation(input: $input) {
          success
          brCode
          qrCodeImage
          paymentLinkUrl
          error
        }
      }
    `;

    const input = {
      customerName: 'fake-customer',
      customerTaxID: 'fake-customer-id',
      customerEmail: 'heisen@test.com',
      product: toGlobalId('Product', fakeProduct._id)
    };

    const variables = {
      input
    };

    const context = await getContext({
      user
    });

    const rootValue = {};

    const pixQrCodePayload = {
      charge: {
        status: 'ACTIVE',
        customer: {
          name: 'Dan',
          email: 'email0@example.com',
          phone: '5511999999999',
          taxID: {}
        },
        value: 100,
        comment: 'good',
        correlationID: '9134e286-6f71-427a-bf00-241681624586',
        paymentLinkID: '7777a23s-6f71-427a-bf00-241681624586',
        paymentLinkUrl:
          'https://openpix.com.br/pay/9134e286-6f71-427a-bf00-241681624586',
        qrCodeImage:
          'https://api.openpix.com.br/openpix/charge/brcode/image/9134e286-6f71-427a-bf00-241681624586.png',
        expiresIn: 2592000,
        expiresDate: '2021-04-01T17:28:51.882Z',
        createdAt: '2021-03-02T17:28:51.882Z',
        updatedAt: '2021-03-02T17:28:51.882Z',
        brCode:
          '000201010212261060014br.gov.bcb.pix2584https://api.openpix.com.br/openpix/testing?transactionID=867ba5173c734202ac659721306b38c952040000530398654040.015802BR5909LOCALHOST6009Sao Paulo62360532867ba5173c734202ac659721306b38c963044BCA'
      }
    };

    // POST /api/v1/charge
    fetchMock.mockResponseOnce(JSON.stringify(pixQrCodePayload));

    const result = await graphql({
      schema: schema,
      source: query,
      rootValue,
      contextValue: context,
      variableValues: variables
    });
    expect(result.errors).toBeUndefined();

    expect(result.data.ChargeCreateMutation.error).toBeNull();
    expect(result.data.ChargeCreateMutation.success).toBe(
      'Charge created with success'
    );
  });

  it('should not create if product does not exists', async () => {
    const user = await new UserModel({
      email: 'heisen@test.com',
      password: bcrypt.hashSync('awesomepass', 8),
      username: 'heisen',
      pixKey: 'fake-pix-key'
    }).save();

    const query = /* GraphQL */ `
      mutation ChargeCreateMutation($input: ChargeCreateInput!) {
        ChargeCreateMutation(input: $input) {
          success
          brCode
          qrCodeImage
          paymentLinkUrl
          error
        }
      }
    `;

    const input = {
      customerName: 'fake-customer',
      customerTaxID: 'fake-customer-id',
      customerEmail: 'heisen@test.com',
      product: toGlobalId('Product', '65a413615f884cd116e56ff5')
    };

    const variables = {
      input
    };

    const context = await getContext({
      user
    });

    const rootValue = {};

    const pixQrCodePayload = {
      charge: {
        status: 'ACTIVE',
        customer: {
          name: 'Dan',
          email: 'email0@example.com',
          phone: '5511999999999',
          taxID: {}
        },
        value: 100,
        comment: 'good',
        correlationID: '9134e286-6f71-427a-bf00-241681624586',
        paymentLinkID: '7777a23s-6f71-427a-bf00-241681624586',
        paymentLinkUrl:
          'https://openpix.com.br/pay/9134e286-6f71-427a-bf00-241681624586',
        qrCodeImage:
          'https://api.openpix.com.br/openpix/charge/brcode/image/9134e286-6f71-427a-bf00-241681624586.png',
        expiresIn: 2592000,
        expiresDate: '2021-04-01T17:28:51.882Z',
        createdAt: '2021-03-02T17:28:51.882Z',
        updatedAt: '2021-03-02T17:28:51.882Z',
        brCode:
          '000201010212261060014br.gov.bcb.pix2584https://api.openpix.com.br/openpix/testing?transactionID=867ba5173c734202ac659721306b38c952040000530398654040.015802BR5909LOCALHOST6009Sao Paulo62360532867ba5173c734202ac659721306b38c963044BCA'
      }
    };

    // POST /api/v1/charge
    fetchMock.mockResponseOnce(JSON.stringify(pixQrCodePayload));

    const result = await graphql({
      schema: schema,
      source: query,
      rootValue,
      contextValue: context,
      variableValues: variables
    });
    console.log(result);

    expect(result.errors).toBeUndefined();

    expect(result.data.ChargeCreateMutation.error).toBe(
      'Product does not exists'
    );
    expect(result.data.ChargeCreateMutation.success).toBeNull();
  });
});
