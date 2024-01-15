import { GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import ProductModel from '../../product/ProductModel';
import ChargeModel from '../ChargeModel';
import { randomUUID } from 'crypto';
import UserModel from '../../user/UserModel';
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

    const productOwner = await UserModel.findOne({
      _id: productExists.user
    });

    if (!productOwner) {
      return {
        error: 'Product owner does not exists'
      };
    }

    if (!productExists) {
      return {
        error: 'Product does not exists'
      };
    }

    const ownerSplit = productExists.price * 0.7;
    const fee = productExists.price - ownerSplit;

    const wooviCharge = await fetch(
      `${process.env.WOOVI_BASE_URL}/api/v1/charge`,
      {
        method: 'POST',
        body: JSON.stringify({
          correlationID: randomUUID(),
          value: fee,
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
          Authorization: process.env.WOOVI_BAAS_KEY
        }
      }
    );

    if (wooviCharge.status !== 200) {
      return {
        error:
          'Unable to create a new charge for this product and this customer'
      };
    }

    const wooviChargeData = await wooviCharge.json();

    await new ChargeModel({
      product: fromGlobalId(product).id,
      customerName,
      customerEmail,
      customerTaxID,
      correlationID: wooviChargeData.correlationID,
      value: wooviChargeData.charge.value,
      brCode: wooviChargeData.brCode,
      status: 'WAITING_PAYMENT'
    }).save();

    return {
      success: 'Charge created with success',
      brCode: wooviChargeData.brCode,
      qrCodeImage: wooviChargeData.charge.qrCodeImage,
      paymentLinkUrl: wooviChargeData.charge.paymentLinkUrl,
      error: null
    };
  },
  outputFields: {
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    },
    brCode: {
      type: GraphQLString,
      resolve: ({ brCode }) => brCode
    },
    qrCodeImage: {
      type: GraphQLString,
      resolve: ({ qrCodeImage }) => qrCodeImage
    },
    paymentLinkUrl: {
      type: GraphQLString,
      resolve: ({ paymentLinkUrl }) => paymentLinkUrl
    },
    success: {
      type: GraphQLString,
      resolve: ({ success }) => success
    }
  }
});
