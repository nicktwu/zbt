/**
 * Created by nwu on 10/4/17.
 */
import {WEEKLIST, TYPELIST, ACCOUNTS, UNREVIEWED, REVIEWED} from './types';

const initialState = {
  midnights: [...Array(7).keys()].map(()=>([])),
  types: [],
  accounts: [],
  unreviewed: [],
  reviewed: [],
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case WEEKLIST:
      return {
        midnights: [...Array(7).keys()].map((day)=>(action.midnights.filter(entry => ((new Date(entry.date)).getDay()+1)%7 === day))),
        types: state.types,
        accounts: state.accounts,
        unreviewed: state.unreviewed,
        reviewed: state.reviewed
      };
    case TYPELIST:
      return {
        midnights: state.midnights,
        types: action.types,
        accounts: state.accounts,
        unreviewed: state.unreviewed,
        reviewed: state.reviewed
      };
    case ACCOUNTS:
      return {
        midnights: state.midnights,
        types: state.types,
        accounts: action.accounts,
        unreviewed: state.unreviewed,
        reviewed: state.reviewed
      };
    case UNREVIEWED:
      return {
        midnights: state.midnights,
        types: state.types,
        accounts: state.accounts,
        unreviewed: action.midnights.sort((a,b) => Date.parse(a.date)-Date.parse(b.date)),
        reviewed: state.reviewed
      };
    case REVIEWED:
      return {
        midnights: state.midnights,
        types: state.types,
        accounts: state.accounts,
        unreviewed: state.unreviewed,
        reviewed: action.midnights.sort((a,b) => Date.parse(a.date)-Date.parse(b.date))
      };
    default:
      return state
  }
}