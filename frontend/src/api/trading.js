/**
 * Created by nwu on 10/29/17.
 */
import {trades} from './urls';
import API from './api';

export default class TradingAPI {
  static getMidnightTrades(token) {
    return API.makeCall("GET", trades.midnightTrades, token, null)
  }

  static postMidnightTrade(token, data) {
    return API.makeCall("POST", trades.midnightTrades, token, data)
  }
}