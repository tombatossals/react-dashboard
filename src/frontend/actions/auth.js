import { createAction } from 'redux-actions';
import * as rest from 'lib/rest';
import { AsyncStatus } from 'lib/constants';

export const SET_AUTH = 'SET_AUTH';
export const RESET_AUTH = 'RESET_AUTH';
export const CHECK_AUTH_TOKEN = 'CHECK_AUTH_TOKEN';

export function authenticate(authdata) {
  return dispatch => {
    const url = `${endpoints.base}${endpoints.post.auth}`;
    const setAuthentication = createAction(SET_AUTH);

    if (!authdata) {
      return dispatch(setAuthentication({
        status: AsyncStatus.FAILED,
        message: 'Empty credentials',
      }));
    }

    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authdata),
    }).then(res => {
      if (res.status === 401) {
        return dispatch(setAuthentication({
          status: AsyncStatus.FAILED,
          message: 'Invalid credentials',
        }));
      } else if (res.status !== 200) {
        return dispatch(setAuthentication({
          status: AsyncStatus.FAILED,
          message: 'Can\'t contact auth server',
        }));
      }

      return res.json().then(data => {
        localStorage.setItem('token', data.token);
        return dispatch(setAuthentication({
          status: AsyncStatus.SUCCESS,
          user: data.user,
        }));
      });
    });
  };
}

export function checkAuthToken() {
  return dispatch => {
    const setAuthentication = createAction(RESET_AUTH);
    const url = `${endpoints.base}${endpoints.get.auth}`;
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(setAuthentication({ status: AsyncStatus.FAILED }));
    }

    console.log(token);
    return rest.get(url, token)
      .then(data => dispatch(setAuthentication(data)))
      .catch(() => dispatch(setAuthentication({ status: AsyncStatus.FAILED })));
  };
}

export function resetAuth() {
  return dispatch => {
    const resetAuthAction = createAction(RESET_AUTH);
    localStorage.removeItem('token');
    dispatch(resetAuthAction());
  };
}
