import { handleActions } from 'redux-actions'
import { AsyncStatus } from 'lib/constants'

const initialUserState = {
  status: AsyncStatus.IDLE
}

const authReducers = handleActions({
  USER_LOGIN: (state, action) => action.payload,
  USER_CHECK_TOKEN: (state, action) => action.payload,
  USER_LOGOUT: () => initialUserState
}, initialUserState)

export default authReducers
