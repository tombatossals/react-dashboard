import { createAction } from 'redux-actions';
import { AsyncStatus } from 'lib/constants';
import Parse from 'parse';

export const SET_AUTH = 'SET_AUTH';
export const RESET_AUTH = 'RESET_AUTH';
export const CHECK_AUTH_TOKEN = 'CHECK_AUTH_TOKEN';

export function authenticate(authdata) {
  return dispatch => {
    const setAuthentication = createAction(SET_AUTH);

    if (!authdata) {
      return dispatch(setAuthentication({
        status: AsyncStatus.FAILED,
        message: 'Empty credentials',
      }));
    }

    const { username, password } = authdata;
    dispatch(setAuthentication({ status: AsyncStatus.LOADING }));
    return Parse.User.logIn(username, password).then(res =>
      dispatch(setAuthentication({
        status: AsyncStatus.SUCCESS,
        user: res,
      }))
    ).catch(err => dispatch(setAuthentication({
      status: AsyncStatus.FAILED,
      message: err.message,
    })));
  };
}

export function checkAuthToken() {
  return dispatch => {
    const setAuthentication = createAction(SET_AUTH);

    dispatch(setAuthentication({ status: AsyncStatus.LOADING }));
    const user = Parse.User.current();
    if (user) {
      return dispatch(setAuthentication({
        status: AsyncStatus.SUCCESS,
        user,
      }));
    }

    return dispatch(setAuthentication({ status: AsyncStatus.FAILED }));
  };
}

export function resetAuth() {
  return dispatch => {
    const resetAuthAction = createAction(RESET_AUTH);
    Parse.User.logOut().then(() => dispatch(resetAuthAction()));
  };
}
