import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import bcrypt from 'bcryptjs';
import UserModel from '../UserModel';
import { generateJwtToken } from '../../../auth';

export default mutationWithClientMutationId({
  name: 'UserRegister',
  inputFields: {
    username: {
      type: new GraphQLNonNull(GraphQLString)
    },
    pixKey: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  mutateAndGetPayload: async (
    { username, email, password, pixKey },
    context
  ) => {
    const userExists = await UserModel.findOne({
      email: email.trim().toLowerCase()
    });

    if (userExists) {
      return {
        error: 'User already exists'
      };
    }

    const hashPassword = bcrypt.hashSync(password, 8);

    const user = await new UserModel({
      username,
      email,
      password: hashPassword,
      pixKey
    }).save();

    const subAccount = await fetch(
      `${process.env.WOOVI_BASE_URL}/api/v1/subaccount`,
      {
        method: 'POST',
        body: JSON.stringify({
          pixKey: pixKey,
          name: email
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.WOOVI_BAAS_KEY
        }
      }
    );

    if (subAccount.status !== 200) {
      return {
        error: 'Unable to create a new subaccount for this user'
      };
    }

    const token = generateJwtToken(user._id);

    context.setCookie('userToken', token);

    return {
      user: user._id,
      error: null
    };
  },
  outputFields: {
    user: {
      type: GraphQLString,
      resolve: ({ user }) => user
    },
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    }
  }
});
