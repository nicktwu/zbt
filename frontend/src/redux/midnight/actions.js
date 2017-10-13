/**
 * Created by nwu on 10/4/17.
 */
import MidnightAPI from '../../api/midnight';
import {handle401} from '../session/filter';
import {WEEKLIST, TYPELIST, ACCOUNTS} from './types';

export function getWeekList(dispatch) {
  return (token)=> {
    MidnightAPI.getWeekList(token).then(handle401(dispatch)).then(res=>{
      // TODO: error handle
      return res.json()
    }).then(json=>{
      dispatch({type: WEEKLIST, midnights: json});
    }).catch(err=>{
      // TODO: handle errors
      console.log(err);
    })
  }
}

export function createMidnight(dispatch) {
  return (token, data) => {
    MidnightAPI.createMidnight(token, data).then(handle401(dispatch)).then(res=>{
      // TODO: error handle
      return res.json()
    }).then(()=>token).then(getWeekList(dispatch)).catch(err=>{
      // TODO: handle errors
      console.log(err);
    })
  }
}

export function editMidnight(dispatch) {
  return (token, data) => {
    MidnightAPI.editMidnight(token, data).then(handle401(dispatch)).then(res=>{
      console.log(res);
      // TODO: error handle
      return res.json()
    }).then(()=>token).then(getWeekList(dispatch)).catch(err=>{
      // TODO: handle errors
      console.log(err);
    })
  }
}

export function removeMidnight(dispatch) {
  return (token, id) => {
    MidnightAPI.removeMidnight(token, id).then(handle401(dispatch)).then(res=>{
      // TODO: error handle
      return res.json();
    }).then(()=>token).then(getWeekList(dispatch)).catch(err=>{
      // TODO: handle errors
      console.log(err);
    })
  }
}

export function getTypeList(dispatch) {
  return (token) => {
    MidnightAPI.getTypeList(token).then(handle401(dispatch)).then(res=>{
      // TODO: error handle
      return res.json()
    }).then(json=>{
      dispatch({type: TYPELIST, types: json});
    }).catch(err=>{
      // TODO: handle errors
      console.log(err);
    })
  }
}

export function createType(dispatch) {
  return (token, data) => {
    MidnightAPI.createType(token, data).then(handle401(dispatch)).then(res=>{
      // TODO: error handle
      return res.json()
    }).then(()=>token).then(getTypeList(dispatch)).catch(err=>{
      // TODO: handle errors
      console.log(err);
    })
  }
}

export function editType(dispatch) {
  return (token, data) => {
    MidnightAPI.editType(token, data).then(handle401(dispatch)).then(res=>{
      // TODO: error handle
      console.log(res);
      return res.json();
    }).then(()=>token).then(getTypeList(dispatch)).catch(err=>{
      // TODO: handle errors
      console.log(err);
    })
  }
}

export function removeType(dispatch) {
  return (token, id) => {
    MidnightAPI.removeType(token, id).then(handle401(dispatch)).then(res=>{
      // TODO: error handle
      console.log(res);
      return res.json();
    }).then(()=>token).then(getTypeList(dispatch)).catch(err=>{
      // TODO: handle errors
      console.log(err);
    })
  }
}

export function getAccountList(dispatch) {
  return (token) => {
    MidnightAPI.getAccountList(token).then(handle401(dispatch)).then(res=>{
      // TODO: error handle
      return res.json()
    }).then(json=>{
      dispatch({type: ACCOUNTS, accounts: json});
    }).catch(err=>{
      // TODO: handle errors
      console.log(err);
    })
  }
}

export function createAccount(dispatch) {
  return (token, data) => {
    MidnightAPI.createAccount(token, data).then(handle401(dispatch)).then(res=>{
      // TODO: error handle
      return res.json()
    }).then(()=>token).then(getAccountList(dispatch)).catch(err=>{
      // TODO: handle errors
      console.log(err);
    })
  }
}

export function editAccount(dispatch) {
  return (token, data) => {
    MidnightAPI.editAccount(token, data).then(handle401(dispatch)).then(res=>{
      // TODO: error handle
      console.log(res);
      return res.json();
    }).then(()=>token).then(getAccountList(dispatch)).catch(err=>{
      // TODO: handle errors
      console.log(err);
    })
  }
}

export function removeAccount(dispatch) {
  return (token, id) => {
    MidnightAPI.removeAccount(token, id).then(handle401(dispatch)).then(res=>{
      // TODO: error handle
      console.log(res);
      return res.json();
    }).then(()=>token).then(getAccountList(dispatch)).catch(err=>{
      // TODO: handle errors
      console.log(err);
    })
  }
}
