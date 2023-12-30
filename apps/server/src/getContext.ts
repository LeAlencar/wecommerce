import { IUser } from './modules/user/UserModel';
import { Context } from 'koa';
import { getDataloaders } from './modules/loader/loaderRegister';
import { GraphQLContext } from './types/types';
import { Request as HelixRequest } from 'graphql-helix';
import { load } from './modules/user/UserLoader';
import getLogtailClient from './logtail';

type ContextVars = {
  user?: IUser | null;
  req?: HelixRequest;
  koaContext: Context;
  setCookie: (cookieName: string, token: string) => void;
};

export const getContext = async (ctx: Record<string, unknown>) => {
  const LogtailClient = getLogtailClient();

  const context = {
    ...ctx
  };

  const dataloaders = getDataloaders();

  if (context.user) {
    LogtailClient.info(`CONTEXT USER - ${context.user}`);
    context.user = await load({ ...context, dataloaders }, context.user._id);
  }

  return {
    req: ctx.req,
    dataloaders,
    user: ctx.user,
    koaContext: ctx.koaContext,
    setCookie: ctx.setCookie
  } as GraphQLContext;
};
