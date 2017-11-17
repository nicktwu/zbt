/**
 * Created by nwu on 10/29/17.
 */
import TradingAPI from "../../api/trading";
import {handle401} from '../session/filter';
import {ALL_MIDNIGHT} from './types';

export function getAllMidnightTrades(dispatch) {
  return (token) => {
    return TradingAPI.getMidnightTrades(token).then(handle401(dispatch)).then(res => {
      //TODO errors
      return res.json()
    }).then(json => {
      dispatch({type: ALL_MIDNIGHT, trades: json})
    }).catch(err => {
      // TODO deal with errors
      console.log(err)
    })
  }
}

export function postMidnightTrade(dispatch) {
  return (token, data) => {
    return TradingAPI.postMidnightTrade(token, data).then(handle401(dispatch)).then(res=>{
      //TODO errors
      return res.json()
    }).then(()=>token).then(getAllMidnightTrades(dispatch)).catch(err=> {
      //TODO deal
      console.log(err);
    })
  }
}