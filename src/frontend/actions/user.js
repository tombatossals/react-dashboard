import { createAction } from 'redux-actions'
import { AsyncStatus, UserActions } from 'lib/constants'
import API from 'lib/api'

export function authenticate (authdata) {
  return dispatch => {
    const loginAction = createAction(UserActions.USER_LOGIN)

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

export function signup (authdata) {
  return dispatch => {
    const signupAction = createAction(UserActions.USER_SIGNUP)

    if (!authdata) {
      return dispatch(signupAction({
        status: AsyncStatus.FAILED,
        message: 'Empty credentials'
      }))
    }

    dispatch(signupAction({ status: AsyncStatus.LOADING }))
    return API.signup(authdata).then(user => dispatch(signupAction({
      status: AsyncStatus.SUCCESS,
      data: {
        username: user.getUsername(),
        firstName: user.attributes.firstName,
        lastName: user.attributes.lastName,
        email: user.email,
        id: user.id
      }
    }))).catch(err => dispatch(signupAction({
      status: AsyncStatus.FAILED,
      message: err.message
    })))
  }
}

export function checkAuthToken () {
  return dispatch => {
    const loginAction = createAction(UserActions.USER_LOGIN)

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
    const logoutAction = createAction(UserActions.USER_LOGOUT)
    API.logout().then(() => dispatch(logoutAction()))
  }
}

export function updateUser (userdata, orig) {
  return dispatch => {
    const updateAction = createAction(UserActions.USER_UPDATE)
    dispatch(updateAction({
      type: 'update',
      status: AsyncStatus.LOADING
    }))
  }
}

export function deleteUser () {
  return dispatch => {
    const deleteAction = createAction(UserActions.USER_DELETE)
    API.deleteUser().then(() => dispatch(deleteAction()))
  }
}
