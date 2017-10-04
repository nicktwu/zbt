/**
 * Created by nwu on 10/4/17.
 */
import {WEEKLIST, TYPELIST} from './types';

const initialState = {
  midnights: [...Array(7).keys()].map(()=>([])),
  types: []
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case WEEKLIST:
      console.log(action.midnights);
      return {
        midnights: [...Array(7).keys()].map((day)=>(action.midnights.filter(entry => entry.date.getDay() === day))),
        types: state.types
      };
    case TYPELIST:
      return {
        midnights: state.midnights,
        types: action.types
      };
    default:
      return state
  }
}