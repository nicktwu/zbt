/**
 * Created by nwu on 9/28/17.
 */
import API from './api';
import {user} from './urls';

export default class UserAPI {
  static getCurrentUser(token) {
    return API.makeCall("GET", user.info, token, {})
  }
}