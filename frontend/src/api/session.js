/**
 * Created by nwu on 9/26/17.
 */
import {session} from './urls';

class SessionAPI {
  static loginWithForm(credentials) {
    const request = new Request(session.form, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({username: credentials.username, password: credentials.password})
    });

    return fetch(request);
  }

  static loginWithCertificate() {
    return fetch(session.certificate);
  }
}

export default SessionAPI;