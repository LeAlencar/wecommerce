import cors from '@koa/cors';
import Router from '@koa/router';
import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  sendResult,
  shouldRenderGraphiQL
} from 'graphql-helix';
import Koa, { Context } from 'koa';
import bodyParser from 'koa-bodyparser';
import koaLogger from 'koa-logger';
import koaPlayground from 'graphql-playground-middleware-koa';
import { getContext } from './getContext';
import { schema } from './schema/schema';
import { getUser } from './auth';
import getLogtailClient from './logtail';

const app = new Koa();

const router = new Router();
const logtailClient = getLogtailClient();

export const statusMiddleware = async (ctx: Record<string, unknown>) => {
  try {
    ctx.body = 'Server Working';
    ctx.status = 200;
  } catch (err: unknown) {
    console.log({
      err
    });
    ctx.body = err.toString();
    ctx.status = 400;
  }
};

app.use(bodyParser());

app.use(koaLogger());
app.use(
  cors({
    maxAge: 86400,
    credentials: true,
    origin: '*'
  })
);

export const setCookie =
  (context: Context) => async (cookieName: string, token: string) => {
    context.cookies.set(cookieName, token, {
      domain:
        process.env.NODE_ENV === 'production' ? 'lealencar.dev' : undefined,
      httpOnly: true,
      secure: process.env.NODE_ENV == 'production' ? true : false,
      sameSite: 'lax',
      path: '/',
      maxAge: 365 * 24 * 60 * 60 * 100
    });
  };

router.get('/status', statusMiddleware);

router.all(
  '/playground',
  koaPlayground({
    endpoint: '/graphql'
  })
);

router.all('/graphql', async (ctx) => {
  const userToken = ctx.cookies.get('userToken');
  logtailClient.info(`COOKIES - ${userToken}`);
  const { user } = await getUser(ctx.cookies.get('userToken'));

  logtailClient.info(`USER NA APP - ${user}`);
  const request = {
    body: ctx.request.body,
    headers: ctx.req.headers,
    method: ctx.request.method,
    query: ctx.request.query
  };

  if (shouldRenderGraphiQL(request)) {
    ctx.body = renderGraphiQL({
      subscriptionsEndpoint: '/graphql'
    });
  } else {
    const { operationName, query, variables } = getGraphQLParameters(request);

    const result = await processRequest({
      operationName,
      query,
      variables,
      request,
      schema,
      contextFactory: () => {
        return getContext({
          req: request,
          user,
          koaContext: ctx as Context,
          setCookie: setCookie(ctx)
        });
      }
    });

    ctx.respond = false;
    sendResult(result, ctx.res);
  }
});

app.use(router.routes()).use(router.allowedMethods());

export default app;
