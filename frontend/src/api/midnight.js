/**
 * Created by nwu on 10/4/17.
 */
import API from './api';
import {midnight} from './urls';

export default class MidnightAPI {
  static getWeekList(token) {
    return API.makeCall("GET", midnight.weekList, token, null);
  }

  static createMidnight(token, data) {
    return API.makeCall("POST", midnight.createMidnight, token, data);
  }

  static editMidnight(token, data) {
    return API.makeCall("PUT", midnight.editMidnight + data._id, token, data);
  }

  static removeMidnight(token, id) {
    return API.makeCall("DELETE", midnight.removeMidnight + id, token, null);
  }

  static getTypeList(token) {
    return API.makeCall("GET", midnight.typeList, token, null);
  }

  static createType(token, data) {
    return API.makeCall("POST", midnight.createType, token, data);
  }

  static editType(token, data) {
    return API.makeCall("PUT", midnight.editType + data._id, token, data);
  }

  static removeType(token, id) {
    return API.makeCall("DELETE", midnight.removeType + id, token, null);
  }
}