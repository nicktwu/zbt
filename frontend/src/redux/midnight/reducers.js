/**
 * Created by nwu on 10/4/17.
 */
import {WEEKLIST, TYPELIST, ACCOUNTS} from './types';

const initialState = {
  midnights: [...Array(7).keys()].map(()=>([])),
  types: [],
  accounts: [],
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case WEEKLIST:
      return {
        midnights: [...Array(7).keys()].map((day)=>(action.midnights.filter(entry => (new Date(entry.date)).getDay() === day))),
        types: state.types,
        accounts: state.accounts,
      };
    case TYPELIST:
      return {
        midnights: state.midnights,
        types: action.types,
        accounts: state.accounts,
      };
    case ACCOUNTS:
      return {
        midnights: state.midnights,
        types: state.types,
        accounts: action.accounts,
      };
    default:
      return state
  }
}