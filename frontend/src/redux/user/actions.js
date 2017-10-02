/**
 * Created by nwu on 9/28/17.
 */
import UserAPI from '../../api/user';
import {handle401} from '../session/filter'
import {CURRENT_USER} from './types';

export function getCurrent(dispatch) {
  return (token) => {
    console.log("getting user");
    UserAPI.getCurrentUser(token).then(handle401(dispatch)).then((res) => {
      // Handle status codes
      return res.json();
    }).then((json) => {
      dispatch({type: CURRENT_USER, user: json});
    })
  }
}