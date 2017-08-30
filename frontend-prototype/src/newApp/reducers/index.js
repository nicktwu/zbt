import { combineReducers } from 'redux';
import midnights from './midnights';

function auth(state = {token: null}, action) {
  switch(action.type) {
  case 'AUTH_SUCCESS':
    return {
      token: action.token,
    };

  default:
    return state;
  }
}

const appReducer = combineReducers({
  auth,
  midnights,
});

export default appReducer;
