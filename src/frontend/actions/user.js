import { createAction } from 'redux-actions'
import { AsyncStatus } from 'lib/constants'
import API from 'lib/api'

export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'
export const USER_CHECK_TOKEN = 'USER_CHECK_TOKEN'

export function authenticate (authdata) {
  return dispatch => {
    const loginAction = createAction(USER_LOGIN)

    if (!authdata) {
      return dispatch(loginAction({
        status: AsyncStatus.FAILED,
        message: 'Empty credentials'
      }))
    }

    const { type, username, password } = authdata
    dispatch(loginAction({ status: AsyncStatus.LOADING }))

    switch (type) {
      case 'facebook':
        return API.facebookLogin().then(user => dispatch(loginAction({
          status: AsyncStatus.SUCCESS,
          data: {
            username: user.getUsername(),
            firstName: user.attributes.firstName,
            lastName: user.attributes.lastName,
            email: user.email,
            id: user.id
          }
        }))).catch(err => dispatch(loginAction({
          status: AsyncStatus.FAILED,
          message: err.message
        })))
      default:
        return API.login(username, password).then(user => dispatch(loginAction({
          status: AsyncStatus.SUCCESS,
          data: {
            username: user.getUsername(),
            firstName: user.attributes.firstName,
            lastName: user.attributes.lastName,
            email: user.email,
            id: user.id
          }
        }))).catch(err => dispatch(loginAction({
          status: AsyncStatus.FAILED,
          message: err.message
        })))
    }
  }
}

export function checkAuthToken () {
  return dispatch => {
    const loginAction = createAction(USER_LOGIN)

    dispatch(loginAction({ status: AsyncStatus.LOADING }))
    const user = API.getCurrentUser()
    if (user) {
      user.fetch().then(data => dispatch(loginAction({
        status: AsyncStatus.SUCCESS,
        data: {
          username: data.getUsername(),
          firstName: data.attributes.firstName,
          lastName: data.attributes.lastName,
          email: user.attributes.email,
          id: data.id
        }
      }))
      )
    }

    return dispatch(loginAction({ status: AsyncStatus.FAILED }))
  }
}

export function logout () {
  return dispatch => {
    const logoutAction = createAction(USER_LOGOUT)
    API.logout().then(() => dispatch(logoutAction()))
  }
}

export function updateUser () {
  return dispatch => {
    const logoutAction = createAction(USER_LOGOUT)
    API.logout().then(() => dispatch(logoutAction()))
  }
}
