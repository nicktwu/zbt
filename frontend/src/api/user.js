/**
 * Created by nwu on 9/28/17.
 */
import API from './api';
import {user} from './urls';

export default class UserAPI {
  static getCurrentUser(token) {
    return API.makeCall("GET", user.info, token, null)
  }

  static getAllCurrentUsers(token) {
    return API.makeCall("GET", user.all, token, null)
  }

  static createUser(token, data) {
    return API.makeCall("POST", user.create, token, data)
  }

  static removeUser(token, kerberos) {
    return API.makeCall("DELETE", user.remove + kerberos, token, null)
  }

  static resetUser(token, kerberos) {
    return API.makeCall("POST", user.reset + kerberos, token, null)
  }

  static editUser(token, data) {
    return API.makeCall("PUT", user.edit + data.kerberos, token, data)
  }

  static changePassword(token, password) {
    return API.makeCall("POST", user.change, token, {password: password})
  }
}