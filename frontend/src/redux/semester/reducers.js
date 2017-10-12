/**
 * Created by nwu on 10/4/17.
 */
import {SEMESTER, SEMESTERS} from './types';

const initialState = {
  semester: {},
  semesters: []
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case SEMESTER:
      return {
        semester: action.semester
      };
    case SEMESTERS:
      return {
        semesters: action.semesters
      };
    default:
      return state
  }
}