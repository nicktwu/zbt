/**
 * Created by nwu on 9/28/17.
 */
import UserAPI from '../../api/user';
import {handle401} from '../session/filter'
import {CURRENT_USER, ALL_USERS, PASSWORD_ERROR} from './types';

export function getCurrent(dispatch) {
  return (token) => {
    UserAPI.getCurrentUser(token).then(handle401(dispatch)).then((res) => {
      // TODO: Handle status codes
      return res.json();
    }).then((json) => {
      dispatch({type: CURRENT_USER, user: json});
    }).catch((err) => {
      // TODO: Handle errors
      console.log(err);
    })
  }
}

export function getAll(dispatch) {
  return (token) => {
    UserAPI.getAllCurrentUsers(token).then(handle401(dispatch)).then((res)=>{
      // TODO: Handle error codes
      return res.json();
    }).then((json)=>{
      dispatch({type: ALL_USERS, users: json});
    }).catch((err) => {
      // TODO: Handle errors
      console.log(err);
    })
  }
}

export function create(dispatch) {
  return (token, data) => {
    UserAPI.createUser(token, data).then(handle401(dispatch)).then((res)=>{
      // TODO: Handle errors
      return res.json();
    }).then(()=>token).then(getAll(dispatch)).catch((err)=>{
      console.log(err);
    })
  }
}

export function remove(dispatch) {
  return (token, kerberos) => {
    UserAPI.removeUser(token, kerberos).then(handle401(dispatch)).then((res)=>{
      //TODO: handle errors
      return res.json();
    }).then(()=>token).then(getAll(dispatch)).catch((err)=>{
      console.log(err);
    })
  }
}

export function edit(dispatch) {
  return (token, data) => {
    UserAPI.editUser(token, data).then(handle401(dispatch)).then((res)=>{
      //TODO: handle errors
      return res.json();
    }).then(()=>token).then(getAll(dispatch)).catch((err)=>{
      console.log(err);
    })
  }
}

export function reset(dispatch) {
  return (token, kerberos) => {
    UserAPI.resetUser(token, kerberos).then(handle401(dispatch)).then((res)=>{
      //TODO: handle errors
      return res.json();
    }).then(()=>token).then(getAll(dispatch)).catch((err)=>{
      console.log(err);
    })
  }
}

export function changePassword(dispatch) {
  return (token, password, confirm) => {
    if (password === confirm) {
      UserAPI.changePassword(token, password).then(handle401(dispatch)).then((res) => {
        //TODO: handle errors
        dispatch({type: PASSWORD_ERROR, message: "Password changed."})
      }).catch(err=>{
        console.log(err);
      })
    } else {
      dispatch({type: PASSWORD_ERROR, message: "Password mismatch"})
    }
  }
}