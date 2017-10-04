/**
 * Created by nwu on 9/28/17.
 */
import {CURRENT_USER, ALL_USERS} from './types';

const initialState = {
  user: {},
  allUsers: []
};


export default function reducer(state=initialState, action) {
  switch(action.type) {
    case CURRENT_USER:
      return {
        user: action.user,
        allUsers: state.allUsers,
      };
    case ALL_USERS:
      return {
        user: state.user,
        allUsers: action.users,
      };
    default:
      return state;
  }
}
