import { handleActions } from 'redux-actions';
import { AsyncStatus } from 'lib/constants';

const initialAuthState = {
  status: AsyncStatus.IDLE,
};

const authReducers = handleActions({
  SET_AUTH: (state, action) => action.payload,
  RESET_AUTH: () => initialAuthState,
}, initialAuthState);

export default authReducers;
