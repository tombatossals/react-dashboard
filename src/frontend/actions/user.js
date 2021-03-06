import { AsyncStatus, UserStatus, UserActions } from 'lib/constants'
import { createAction } from 'redux-actions'
import API from 'lib/api'

export const authenticate = (authdata) =>
  dispatch => {
    const loginAction = createAction(UserActions.USER_LOGIN)

    if (!authdata) {
      return dispatch(loginAction({
        status: UserStatus.FAILED,
        message: 'Empty credentials'
      }))
    }

    const { type, username, password } = authdata
    dispatch(loginAction({ status: UserStatus.REQUEST }))

    switch (type) {
      case 'github':
        return API.githubLogin().subscribe(endpoint => {
          window.location.pathname = endpoint
        }, err => dispatch(loginAction({
          status: UserStatus.FAILED,
          message: err.message
        })))
      case 'google':
        return API.googleLogin().subscribe(endpoint => {
          window.location.pathname = endpoint
        }, err => dispatch(loginAction({
          status: UserStatus.FAILED,
          message: err.message
        })))
      case 'facebook':
        return API.facebookLogin().then(user => dispatch(loginAction({
          status: UserStatus.SUCCESS,
          data: {
            username: user.getUsername(),
            firstName: user.attributes.firstName,
            lastName: user.attributes.lastName,
            email: user.email,
            id: user.id
          }
        }))).catch(err => dispatch(loginAction({
          status: UserStatus.FAILED,
          message: err.message
        })))
      default:
        return API.login(username, password).then(user => dispatch(loginAction({
          status: UserStatus.SUCCESS,
          data: {
            username: user.getUsername(),
            firstName: user.attributes.firstName,
            lastName: user.attributes.lastName,
            email: user.email,
            id: user.id
          }
        }))).catch(err => dispatch(loginAction({
          status: UserStatus.FAILED,
          message: err.message
        })))
    }
  }


export const signup = (authdata) =>
  dispatch => {
    const signupAction = createAction(UserActions.USER_SIGNUP)

    if (!authdata) {
      return dispatch(signupAction({
        status: UserStatus.FAILED,
        message: 'Empty credentials'
      }))
    }

    dispatch(signupAction({ status: UserStatus.REQUEST }))
    return API.signup(authdata).then(user => dispatch(signupAction({
      status: UserStatus.SUCCESS,
      data: {
        username: user.getUsername(),
        firstName: user.attributes.firstName,
        lastName: user.attributes.lastName,
        email: user.email,
        id: user.id
      }
    }))).catch(err => dispatch(signupAction({
      status: UserStatus.FAILED,
      message: err.message
    })))
  }

export const checkAuthToken = () =>
  dispatch => {
    const checkAuthTokenAction = createAction(UserActions.USER_CHECK_AUTH_TOKEN)
    dispatch(checkAuthTokenAction({
      actionStatus: AsyncStatus.REQUEST
    }))

    API.getCurrentUser().then(user => dispatch(checkAuthTokenAction({
      status: UserStatus.AUTHENTICATED,
      actionStatus: AsyncStatus.SUCCESS,
      data: user
    })), () => {
      API.logout()
      dispatch(checkAuthTokenAction({
        status: UserStatus.ANONYMOUS,
        actionStatus: AsyncStatus.SUCCESS
      }))
    })
  }

export const logout = () =>
  dispatch => {
    const logoutAction = createAction(UserActions.USER_LOGOUT)
    API.logout()
    dispatch(logoutAction({
      actionStatus: AsyncStatus.SUCCESS,
      status: UserStatus.ANONYMOUS
    }))
  }

export const updateUser = (userdata, orig) =>
  dispatch => {
    const updateAction = createAction(UserActions.USER_UPDATE)
    dispatch(updateAction({
      type: UserActions.USER_UPDATE,
      status: UserStatus.REQUEST
    }))

    if (!userdata.username) {
      return dispatch(updateAction({
        type: UserActions.USER_UPDATE,
        status: UserStatus.FAILED,
        message: 'Empty user is not valid'
      }))
    }
    API.updateUser(userdata).then(user =>
      dispatch(updateAction({
        type: UserActions.USER_UPDATE,
        status: UserStatus.SUCCESS,
        data: user
      }))
    ).fail(err => dispatch(updateAction({
      type: UserActions.USER_UPDATE,
      status: UserStatus.FAILED,
      message: err.message
    })))
  }

export const changePassword = (pass1, pass2) =>
  dispatch => {
    const changePasswordAction = createAction(UserActions.USER_CHANGE_PASSWORD)
    dispatch(changePasswordAction({
      type: UserActions.USER_CHANGE_PASSWORD,
      status: UserStatus.REQUEST
    }))

    if (pass1 !== pass2) {
      return dispatch(changePasswordAction({
        type: UserActions.USER_CHANGE_PASSWORD,
        status: UserStatus.FAILED,
        message: 'Passwords doesn\'t match'
      }))
    }

    API.changePassword(pass1).then(user =>
      dispatch(changePasswordAction({
        type: UserActions.USER_CHANGE_PASSWORD,
        status: UserStatus.SUCCESS
      }))
    ).fail(err => dispatch(changePasswordAction({
      type: UserActions.USER_CHANGE_PASSWORD,
      status: UserStatus.FAILED,
      message: err.message
    })))
  }

export const deleteUser = () =>
  dispatch => {
    const deleteAction = createAction(UserActions.USER_DELETE)
    API.deleteUser().then(() => dispatch(deleteAction()))
  }
