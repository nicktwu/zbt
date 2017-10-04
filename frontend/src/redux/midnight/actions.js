/**
 * Created by nwu on 10/4/17.
 */
import MidnightAPI from '../../api/midnight';
import {handle401} from '../session/filter';
import {WEEKLIST, TYPELIST} from './types';

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
      return res.json()
    }).then(()=>token).then(getTypeList(dispatch)).catch(err=>{
      // TODO: handle errors
      console.log(err);
    })
  }
}