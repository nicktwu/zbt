/**
 * Created by nwu on 9/26/17.
 */
import { createStore, compose } from 'redux';
import { autoRehydrate, persistStore} from 'redux-persist';
import reducers from './reducers';


const store = compose(
  autoRehydrate()
)(createStore)(reducers);

persistStore(store);

export default store;