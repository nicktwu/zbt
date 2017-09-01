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

    let body;
    if (params) {
      body = new FormData();
      body.append('json', JSON.stringify(params));
    }

    return fetch(new Request(url, {
      method,
      body,
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
    const auth = {};
    const callAPI = callAPIMiddleware({
      dispatch,
      getState: () => ({auth}),
    })(() => {});

    if (type === 'AUTH_INIT') {
      fetch(url).then(res => res.json()).then(json => {
        auth.token = json.token;

        callAPI({
          types: ['LOAD_USER_START', 'LOAD_USER_SUCCESS', 'LOAD_USER_FAIL'],
          route: '/user/',
        }).then(() => {
          dispatch({
            type: 'AUTH_SUCCESS',
            token: json.token,
          });
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
