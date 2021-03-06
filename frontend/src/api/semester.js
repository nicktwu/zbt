/**
 * Created by nwu on 10/4/17.
 */
import API from './api';
import {semester} from './urls';

export default class SemesterAPI {
  static getCurrent(token) {
    return API.makeCall("GET", semester.get, token, null);
  }

  static create(token, data) {
    return API.makeCall("POST", semester.create, token, data);
  }

  static getAll(token) {
    return API.makeCall("GET", semester.getAll, token, null);
  }

  static setCurrent(token, id) {
    return API.makeCall("PUT", semester.set + id, token, null);
  }
}