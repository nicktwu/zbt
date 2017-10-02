/**
 * Created by nwu on 9/28/17.
 */
import {SESSION_ERROR} from './types';

export function handle401(dispatch) {
  return (res) => {
    if (res.status === 401) {
      dispatch({type: SESSION_ERROR, message: ""})
    }
    return res
  }
}