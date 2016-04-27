import { handleActions } from 'redux-actions';
const initialAuthState = {};

const authReducers = handleActions({
  SET_AUTH: (state, action) => action.payload,
  RESET_AUTH: () => initialAuthState,
}, initialAuthState);

export default authReducers;
