import { createAction } from 'redux-actions';
import { AsyncStatus } from 'lib/constants';
import Parse from 'parse';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_CHECK_TOKEN = 'USER_CHECK_TOKEN';

export function authenticate(authdata) {
  return dispatch => {
    const loginAction = createAction(USER_LOGIN);

    if (!authdata) {
      return dispatch(loginAction({
        status: AsyncStatus.FAILED,
        message: 'Empty credentials',
      }));
    }

    const { username, password } = authdata;
    dispatch(loginAction({ status: AsyncStatus.LOADING }));
    return Parse.User.logIn(username, password).then(res =>
      res.fetch().then(user =>
        dispatch(loginAction({
          status: AsyncStatus.SUCCESS,
          data: {
            username: user.getUsername(),
            firstName: user.attributes.firstName,
            lastName: user.attributes.lastName,
            id: user.id,
          },
        }))
      )
    ).catch(err => dispatch(loginAction({
      status: AsyncStatus.FAILED,
      message: err.message,
    })));
  };
}

export function checkAuthToken() {
  return dispatch => {
    const loginAction = createAction(USER_LOGIN);

    dispatch(loginAction({ status: AsyncStatus.LOADING }));
    const user = Parse.User.current();
    if (user) {
      user.fetch().then(data =>
        dispatch(loginAction({
          status: AsyncStatus.SUCCESS,
          data: {
            username: data.getUsername(),
            firstName: data.attributes.firstName,
            lastName: data.attributes.lastName,
            id: data.id,
          },
        }))
      );
    }

    return dispatch(loginAction({ status: AsyncStatus.FAILED }));
  };
}

export function logout() {
  return dispatch => {
    const logoutAction = createAction(USER_LOGOUT);
    Parse.User.logOut().then(() => dispatch(logoutAction()));
  };
}

export function updateUser() {
  return dispatch => {
    const logoutAction = createAction(USER_LOGOUT);
    Parse.User.logOut().then(() => dispatch(logoutAction()));
  };
}
