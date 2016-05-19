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
      action: {
        type: UserActions.USER_UPDATE,
        status: AsyncStatus.LOADING
      }
    }))

    if (!userdata.username) {
      return dispatch(updateAction({
        action: {
          type: UserActions.USER_UPDATE,
          status: AsyncStatus.FAILED,
          message: 'Empty user is not valid'
        }
      }))
    }
    API.updateUser(userdata).then(user =>
      dispatch(updateAction({
        action: {
          type: UserActions.USER_UPDATE,
          status: AsyncStatus.SUCCESS
        },
        user
      }))
    ).fail(err => dispatch(updateAction({
      action: {
        type: UserActions.USER_UPDATE,
        status: AsyncStatus.FAILED,
        message: err.message
      }
    })))
  }
}

export function changePassword (pass1, pass2) {
  return dispatch => {
    const changePasswordAction = createAction(UserActions.USER_CHANGE_PASSWORD)
    dispatch(changePasswordAction({
      action: {
        type: UserActions.USER_CHANGE_PASSWORD,
        status: AsyncStatus.LOADING
      }
    }))

    console.log(pass1, pass2)
    if (pass1 !== pass2) {
      return dispatch(changePasswordAction({
        action: {
          type: UserActions.USER_CHANGE_PASSWORD,
          status: AsyncStatus.FAILED,
          message: 'Passwords doesn\'t match'
        }
      }))
    }

    API.changePassword(pass1).then(user =>
      dispatch(changePasswordAction({
        action: {
          type: UserActions.USER_CHANGE_PASSWORD,
          status: AsyncStatus.SUCCESS
        }
      }))
    ).fail(err => dispatch(changePasswordAction({
      action: {
        type: UserActions.USER_CHANGE_PASSWORD,
        status: AsyncStatus.FAILED,
        message: err.message
      }
    })))
  }
}

export function deleteUser () {
  return dispatch => {
    const deleteAction = createAction(UserActions.USER_DELETE)
    API.deleteUser().then(() => dispatch(deleteAction()))
  }
}
