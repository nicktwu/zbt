/**
 * Created by nwu on 10/4/17.
 */
import {SEMESTER, SEMESTERS} from './types';

const initialState = {
  semester: {},
  all: []
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case SEMESTER:
      return {
        semester: action.semester,
        all: state.all,
      };
    case SEMESTERS:
      return {
        semester: state.semester,
        all: action.semesters
      };
    default:
      return state
  }
}