/**
 * Created by nwu on 9/28/17.
 */

export default class API {
  static makeCall(method, url, token, body) {
    return fetch(url, {
      method: method,
      headers: {
        "Authorization":"Bearer " + token,
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*.mit.edu"
      },
      body: body ? JSON.stringify(body) : null
    })
  }
}

