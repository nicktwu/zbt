/**
 * Created by nwu on 9/26/17.
 */
import SessionAPI from '../../api/session';
import {SESSION_ERROR, LOGIN, LOGOUT} from './types';

export function loginWithCertificate(dispatch) {
  return ()=>{
    SessionAPI.loginWithCertificate().then(res => {
      if (res.status >= 500 && res.status < 600) {
        dispatch({type: SESSION_ERROR, message: "Something bad happened."})
      } else if (res.status >= 400 && res.status < 500) {
        dispatch({type: SESSION_ERROR, message: "You are not authorized. If you think this is an error, contact zbt-webmaster@mit.edu."})
      } else {
        return res.json();
      }
    }).then(json => {
      if (json.hasOwnProperty("token")) {
        return dispatch({type: LOGIN, token: json.token});
      }
      return dispatch({type: SESSION_ERROR, certificateMessage: "Something bad happened."});
    }).catch(err => {
      return dispatch({type: SESSION_ERROR, message: err});
    })
  }
}

export function loginWithForm(dispatch) {
  return (credentials)=> {
    SessionAPI.loginWithForm(credentials).then()
  }
}

export function logout(dispatch) {
  return ()=>{
    return dispatch({type:LOGOUT})
  }
}