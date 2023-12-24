import type { GetServerSidePropsContext } from "next";
import type {
  RequestParameters,
  Variables,
  GraphQLResponse,
  CacheConfig,
  ConcreteRequest,
} from "relay-runtime";
import {
  Environment,
  Network,
  RecordSource,
  Store,
  QueryResponseCache,
} from "relay-runtime";

const HTTP_ENDPOINT = "http://localhost:3002/graphql";
const IS_SERVER = typeof window === typeof undefined;
const CACHE_TTL = 5 * 1000; // 5 seconds, to resolve preloaded results

export async function networkFetch(
  request: RequestParameters,
  variables: Variables,
  headers?: HeadersInit
): Promise<GraphQLResponse> {
  const resp = await fetch(HTTP_ENDPOINT, {
    method: "POST",
    credentials: "include",
    headers: {
      ...headers,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  });
  const json = await resp.json();

  // GraphQL returns exceptions (for example, a missing required variable) in the "errors"
  // property of the response. If any exceptions occurred when processing the request,
  // throw an error to indicate to the developer what went wrong.
  if (Array.isArray(json.errors)) {
    console.error(json.errors);
    throw new Error(
      `Error fetching GraphQL query '${
        request.name
      }' with variables '${JSON.stringify(variables)}': ${JSON.stringify(
        json.errors
      )}`
    );
  }

  return json;
}

export const responseCache: QueryResponseCache | null = IS_SERVER
  ? null
  : new QueryResponseCache({
      size: 100,
      ttl: CACHE_TTL,
    });

function createNetwork() {
  async function fetchResponse(
    params: RequestParameters,
    variables: Variables,
    cacheConfig: CacheConfig
  ) {
    const isQuery = params.operationKind === "query";
    const cacheKey = params.id ?? params.cacheID;
    const forceFetch = cacheConfig.force;
    if (responseCache != null && isQuery && !forceFetch) {
      const fromCache = responseCache.get(cacheKey, variables);
      if (fromCache != null) {
        return Promise.resolve(fromCache);
      }
    }

    return networkFetch(params, variables);
  }

  const network = Network.create(fetchResponse);
  return network;
}

function createEnvironment() {
  return new Environment({
    network: createNetwork(),
    store: new Store(RecordSource.create()),
    isServer: IS_SERVER,
  });
}

export const environment = createEnvironment();

export function getCurrentEnvironment() {
  if (IS_SERVER) {
    return createEnvironment();
  }

  return environment;
}

export async function getPreloadedQuery(
  { params }: ConcreteRequest,
  variables: Variables,
  ctx: GetServerSidePropsContext<any>
) {
  const headers = {
    Cookie: ctx.req.headers.cookie,
  };

  const response = await networkFetch(params, variables, headers);
  return {
    params,
    variables,
    response,
  };
}
