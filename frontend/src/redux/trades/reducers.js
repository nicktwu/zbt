/**
 * Created by nwu on 10/29/17.
 */
import {ALL_MIDNIGHT} from './types';


const initialState = {
  midnight: []
};


export default function reducer(state=initialState, action) {
  switch (action.type) {
    case ALL_MIDNIGHT:
      return {
        midnight: action.trades,
      };
    default:
      return state
  }
}