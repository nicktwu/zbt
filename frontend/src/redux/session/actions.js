/**
 * Created by nwu on 9/26/17.
 */
import SessionAPI from '../../api/session';
import {SESSION_ERROR, LOGIN, LOGOUT} from './types';
import UserAPI from '../../api/user';

export function loginWithCertificate(dispatch) {
  return ()=>{
    SessionAPI.loginWithCertificate().then(res => {
      if (res.status >= 500 && res.status < 600) {
        dispatch({type: SESSION_ERROR, certificateMessage: "Something bad happened."})
      } else if (res.status >= 400 && res.status < 500) {
        dispatch({type: SESSION_ERROR, certificateMessage: "You are not authorized. If you think this is an error, contact zbt-webmaster@mit.edu."})
      } else {
        return res.json();
      }
    }).then(json => {
      if (json.hasOwnProperty("token")) {
        dispatch({type: LOGIN, token: json.token});
      }
      return json.token
    }).then((token) => {
      UserAPI.getCurrentUser(token).then((res)=>{
        if (res.status >= 500 && res.status < 600) {
          dispatch({type: SESSION_ERROR, certificateMessage: "Something bad happened."})
        } else if (res.status >= 400 && res.status < 500) {
          dispatch({type: SESSION_ERROR, certificateMessage: "You are not authorized. If you think this is an error, contact zbt-webmaster@mit.edu."})
        }
      })
    }).catch(err => {
      console.log(err);
    })
  }
}

export function loginWithForm(dispatch) {
  return (credentials)=> {
    SessionAPI.loginWithForm(credentials).then(res => {
      if (res.status === 401) {
        dispatch({type: SESSION_ERROR, formMessage: "Incorrect username or password"})
      }
      return res.json()
    }).then(json => {
      if (json.hasOwnProperty("token")) {
        return dispatch({type: LOGIN, token: json.token});
      }
      return dispatch({type: SESSION_ERROR, formMessage: "Something bad happened."});
    }).catch(err => {
      console.log(err);
    })
  }
}

export function loginWithCookie(dispatch) {
  return (token) => {
    dispatch({type: LOGIN, token: token});
  }
}

export function logout(dispatch) {
  return ()=>{
    return dispatch({type:LOGOUT})
  }
}