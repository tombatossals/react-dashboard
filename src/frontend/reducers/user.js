import { handleActions } from 'redux-actions';
const initialUserState = {};

const userReducers = handleActions({
  SET_AUTH: (state, action) => action.payload,
  RESET_AUTH: () => initialUserState,
}, initialUserState);

export default userReducers;
