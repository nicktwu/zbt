/**
 * Created by nwu on 9/26/17.
 */
import {SESSION_ERROR, LOGIN, LOGOUT} from './types';

const initialState = {
  token: "",
  certificateMessage: "",
  formMessage:"",
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case SESSION_ERROR:
      return {
        token: "",
        certificateMessage: action.certificateMessage || "",
        formMessage: action.formMessage || "",
      };
    case LOGIN:
      return {token: action.token, certificateMessage:"", formMessage:""};
    case LOGOUT:
      return initialState;
    default:
      return state
  }
}