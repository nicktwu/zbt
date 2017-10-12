/**
 * Created by nwu on 10/4/17.
 */
import SemesterAPI from '../../api/semester';
import {handle401} from '../session/filter';
import {SEMESTER, SEMESTERS} from './types';

export function getCurrent(dispatch) {
  return (token)=> {
    SemesterAPI.getCurrent(token).then(handle401(dispatch)).then(res=>{
      // TODO: error handle
      return res.json()
    }).then(json=>{
      dispatch({type: SEMESTER, semester: json});
    }).catch(err=>{
      // TODO: handle errors
      console.log(err);
    })
  }
}

export function getSemesters(dispatch) {
  return (token) => {
    SemesterAPI.getAll(token).then(handle401(dispatch)).then(res=>{
      // TODO: errors
      return res.json()
    }).then(json=>{
      dispatch({type: SEMESTERS, semesters: json})
    }).catch(err => {
      // TODO: errors
      console.log(err);
    })
  }
}

export function createSemester(dispatch) {
  return (token, data) => {
    SemesterAPI.create(token, data).then(handle401(dispatch)).then(res=>{
      // TODO: errors
      return res.json()
    }).then(()=>token).then(getSemesters(dispatch)).catch(err => {
      // TODO errors
      console.log(err);
    })
  }
}

export function setCurrent(dispatch) {
  return (token, id) => {
    SemesterAPI.setCurrent(token, id).then(handle401(dispatch)).then(res=>{
      // TODO: errors
      return res.json()
    }).then(()=>token).then(getCurrent(dispatch)).catch(err=>{
      // TODO: errors
      console.log(err);
    })
  }
}

