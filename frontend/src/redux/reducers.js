/**
 * Created by nwu on 9/26/17.
 */
import {combineReducers} from 'redux';
import session from './session/reducers';
import user from './user/reducers';
import midnight from './midnight/reducers';
import semester from './semester/reducers';
import trades from './trades/reducers';

function ready(state={ready: true}, action) {
  return state
}

const rootReducer = combineReducers({
  ready,
  session,
  user,
  midnight,
  semester,
  trades
});

export default rootReducer;