import jwt from 'jsonwebtoken';
import { jwtSecret } from './config';
import UserModel, { IUser } from './modules/user/UserModel';

export const getUser = async (token: string | null | undefined) => {
  if (!token) return { user: null };
  console.log(token);
  try {
    const decodedToken = jwt.verify(token?.trim(), jwtSecret);
    console.log(decodedToken);

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
