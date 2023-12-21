import { createLoader } from '@entria/graphql-mongo-helpers';
import { registerLoader } from '../loader/loaderRegister';
import ProductModel from './ProductModel';

const {
  Wrapper: Product,
  getLoader,
  clearCache,
  load,
  loadAll
} = createLoader({
  model: ProductModel,
  loaderName: 'ProductLoader'
});

registerLoader('ProductLoader', getLoader);
export { getLoader, clearCache, load, loadAll };
export default Product;
