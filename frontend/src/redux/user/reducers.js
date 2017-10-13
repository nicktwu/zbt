/**
 * Created by nwu on 9/28/17.
 */
import {CURRENT_USER, ALL_USERS, PASSWORD_ERROR} from './types';

const initialState = {
  user: {},
  allUsers: [],
  message: ""
};


export default function reducer(state=initialState, action) {
  switch(action.type) {
    case CURRENT_USER:
      return {
        user: action.user,
        allUsers: state.allUsers,
        message: "",
      };
    case ALL_USERS:
      return {
        user: state.user,
        allUsers: action.users,
        message: ""
      };
    case PASSWORD_ERROR:
      return {
        user: state.user,
        allUsers: state.allUsers,
        message: action.message
      };
    default:
      return state;
  }
}
