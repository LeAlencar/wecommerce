/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DataLoaders {
  UserLoader: ReturnType<typeof import('../user/UserLoader').getLoader>;
  ProductLoader: ReturnType<
    typeof import('../product/ProductLoader').getLoader
  >;
  ChargeLoader: ReturnType<typeof import('../charge/ChargeLoader').getLoader>;
}

const loaders = {} as any;

export const registerLoader = <T extends keyof DataLoaders>(
  key: T,
  getLoader: () => DataLoaders[T]
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
