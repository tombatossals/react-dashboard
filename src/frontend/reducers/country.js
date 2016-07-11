import { handleActions } from 'redux-actions'
import { AsyncStatus } from 'lib/constants'

const initialCountryState = {
  status: AsyncStatus.IDLE,
  action: {
    status: AsyncStatus.IDLE
  },
  data: []
}

export default handleActions({
  COUNTRY_GETALL: (state, action) => action.payload
}, initialCountryState)
