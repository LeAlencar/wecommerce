import { createLoader } from '@entria/graphql-mongo-helpers';
import { registerLoader } from '../loader/loaderRegister';
import ChargeModel from './ChargeModel';

const {
  Wrapper: Charge,
  getLoader,
  clearCache,
  load,
  loadAll
} = createLoader({
  model: ChargeModel,
  loaderName: 'ChargeLoader'
});

registerLoader('ChargeLoader', getLoader);
export { getLoader, clearCache, load, loadAll };
export default Charge;
