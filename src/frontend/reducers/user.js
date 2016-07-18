import { handleActions } from 'redux-actions'
import { AsyncStatus } from 'lib/constants'

const initialUserState = {
  status: AsyncStatus.IDLE
}

export default handleActions({
  USER_LOGIN: (state, action) => action.payload,
  USER_CHECK_AUTH_TOKEN: (state, action) => action.payload,
  USER_REGISTER: (state, action) => action.payload,
  USER_DELETE: (state, action) => initialUserState,
  USER_UPDATE: (state, action) => {
    if (action.payload.status === AsyncStatus.FAILED ||
        action.payload.status === AsyncStatus.REQUEST) {
      return Object.assign({}, state, { action: action.payload.action })
    }

    const user = action.payload.data
    const data = {
      username: user.getUsername(),
      firstName: user.attributes.firstName,
      lastName: user.attributes.lastName,
      email: user.attributes.email,
      id: user.id
    }

    return Object.assign({}, state, { data }, { action: action.payload.action })
  },
  USER_CHANGE_PASSWORD: (state, action) => {
    if (action.payload.action.status === AsyncStatus.FAILED ||
        action.payload.action.status === AsyncStatus.REQUEST) {
      return Object.assign({}, state, { action: action.payload.action })
    }

    return Object.assign({}, state, { action: action.payload.action })
  },
  USER_LOGOUT: (state, action) => action.payload
}, initialUserState)
