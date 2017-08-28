import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import appReducer from './reducers';

function callAPIMiddleware({ dispatch, getState }) {
  return next => action => {
    const {
      types,
      callAPI,
      shouldCallAPI = () => true,
      payload = {}
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

    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.');
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

    return callAPI().then(
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
