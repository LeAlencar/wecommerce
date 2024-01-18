import { GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import ProductModel from '../../product/ProductModel';
import ChargeModel from '../ChargeModel';
import { randomUUID } from 'crypto';
import UserModel from '../../user/UserModel';
import { ChargeType } from '../ChargeType';
import * as ChargeLoader from '../ChargeLoader';

export default mutationWithClientMutationId({
  name: 'ChargeCreate',
  description: 'create a new charge',
  inputFields: {
    customerName: {
      type: new GraphQLNonNull(GraphQLString)
    },
    customerTaxID: {
      type: new GraphQLNonNull(GraphQLString)
    },
    customerEmail: {
      type: new GraphQLNonNull(GraphQLString)
    },
    product: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  mutateAndGetPayload: async ({
    customerName,
    customerTaxID,
    customerEmail,
    product
  }) => {
    const productExists = await ProductModel.findOne({
      _id: fromGlobalId(product).id
    });

    if (!productExists) {
      return {
        error: 'Product does not exists'
      };
    }

    const productOwner = await UserModel.findOne({
      _id: productExists.user
    });

    if (!productOwner) {
      return {
        error: 'Product owner does not exists'
      };
    }

    const ownerSplit = productExists.price * 0.7;

    const wooviCharge = await fetch(
      `${process.env.WOOVI_BASE_URL}/api/v1/charge`,
      {
        method: 'POST',
        body: JSON.stringify({
          correlationID: randomUUID(),
          value: productExists.price,
          customer: {
            name: customerName,
            email: customerEmail,
            taxID: customerTaxID
          },
          splits: [
            {
              pixKey: productOwner.pixKey,
              value: ownerSplit,
              splitType: 'SPLIT_SUB_ACCOUNT'
            }
          ]
        }),
        headers: {
          'content-type': 'application/json',
          Authorization: process.env.WOOVI_API_KEY
        }
      }
    );
    if (wooviCharge.status !== 200) {
      const error = await wooviCharge.text();
      console.log(error);
      return {
        error:
          'Unable to create a new charge for this product and this customer'
      };
    }

    const wooviChargeData = await wooviCharge.json();

    const charge = await new ChargeModel({
      product: fromGlobalId(product).id,
      customerName,
      customerEmail,
      customerTaxID,
      correlationID: wooviChargeData.charge.correlationID,
      value: wooviChargeData.charge.value,
      brCode: wooviChargeData.charge.brCode,
      status: 'WAITING_PAYMENT',
      raw: JSON.stringify(wooviChargeData)
    }).save();

    return {
      success: 'Charge created with success',
      id: charge._id,
      error: null
    };
  },
  outputFields: {
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    },
    node: {
      type: ChargeType,
      resolve: async ({ id }, _, context) => {
        return await ChargeLoader.load(context, id);
      }
    },
    success: {
      type: GraphQLString,
      resolve: ({ success }) => success
    }
  }
});
