/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DataLoaders {
  UserLoader: ReturnType<typeof import('../user/UserLoader').getLoader>;
}

const loaders: {
  [Name in keyof DataLoaders]: () => DataLoaders[Name];
} = {} as any;

export const registerLoader = <Name extends keyof DataLoaders>(
  key: Name,
  getLoader: () => DataLoaders[Name]
) => {
  loaders[key] = getLoader;
};

export const getDataloaders = (): DataLoaders =>
  (Object.keys(loaders) as (keyof DataLoaders)[]).reduce(
    (prev, loaderKey) => ({
      ...prev,
      [loaderKey]: loaders[loaderKey]()
    }),
    {}
  ) as any;
