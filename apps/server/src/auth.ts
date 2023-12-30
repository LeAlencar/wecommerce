import jwt from 'jsonwebtoken';
import { jwtSecret } from './config';
import UserModel, { IUser } from './modules/user/UserModel';
import getLogtailClient from './logtail';

export const getUser = async (token: string | null | undefined) => {
  if (!token) return { user: null };
  const LogtailClient = getLogtailClient();
  try {
    const decodedToken = jwt.verify(token?.trim(), jwtSecret);
    LogtailClient.info(`TOKEN DECODED - ${decodedToken}`);
    const user = await UserModel.findOne({
      _id: (decodedToken as { id: string }).id
    });

    return {
      user
    };
  } catch (err) {
    console.log(err);
    return { user: null };
  }
};

export const generateJwtToken = (user: IUser) => {
  return `${jwt.sign({ id: user._id }, jwtSecret)}`;
};
