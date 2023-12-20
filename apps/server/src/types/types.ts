import { Context } from 'koa';
import { DataLoaders } from '../modules/loader/loaderRegister';
import { IUser } from '../modules/user/UserModel';

export type GraphQLContext = {
  koaContext: Context;
  user?: IUser;
  dataloaders: DataLoaders;
};
