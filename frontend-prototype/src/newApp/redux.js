import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import appReducer from './reducers';

function callAPIMiddleware({ dispatch, getState }) {
  return next => action => {
    const {
      types,
      shouldCallAPI = () => true,
      payload = {},
      route,
      params,
      method = 'GET',
    } = action;

    if (!types) {
      // Normal action: pass it on
      return next(action);
    }

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.');
    }

    if (!shouldCallAPI(getState())) {
      return;
    }

    const [requestType, successType, failureType] = types;

    dispatch(
      Object.assign({}, payload, {
        type: requestType
      })
    );

    const url = `/api/v1${route}`;

    const token = getState().auth.token;

    if (!token) {
      throw new Error('Can\'t make API request, unauthorized');
    }

    return fetch(new Request(url, {
      method,
      body: params ? JSON.stringify(params) : undefined,
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }),
      mode: 'cors',
    })).then(res => res.json()).then(
      response =>
        dispatch(
          Object.assign({}, payload, {
            response,
            type: successType
          })
        ),
      error =>
        dispatch(
          Object.assign({}, payload, {
            error,
            type: failureType
          })
        )
    );
  }
}

function authMiddleware({ dispatch, getState }) {
  return next => action => {
    const { type, url } = action;

    if (type === 'AUTH_INIT') {
      fetch(url).then(res => res.json()).then(json => {
        dispatch({
          type: 'AUTH_SUCCESS',
          token: json.token,
        });
      });
    }

    next(action);
  };
}

export default function makeStore() {
  return createStore(appReducer, composeWithDevTools(applyMiddleware(
    authMiddleware,
    callAPIMiddleware,
  )));
}
