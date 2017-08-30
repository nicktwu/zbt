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

function user(state = {}, action) {
  switch(action.type) {
  case 'LOAD_USER_SUCCESS':
    return action.response;

  default:
    return state;
  }
}

const appReducer = combineReducers({
  auth,
  user,
  midnights,
});

export default appReducer;
