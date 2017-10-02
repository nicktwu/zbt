/**
 * Created by nwu on 9/28/17.
 */
import {CURRENT_USER} from './types';

const initialState = {
  user: {}
};


export default function reducer(state=initialState, action) {
  switch(action.type) {
    case CURRENT_USER:
      return {
        user: action.user,
      };
    default:
      return state
  }
}