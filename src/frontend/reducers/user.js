import { handleActions } from 'redux-actions';
import immutable from 'immutable';

const initialUserState = immutable.fromJS({});

const userReducers = handleActions({
  USER_LOGGED_IN: (state, action) => action.payload,
  USER_LOGGED_OUT: {},
  RESET_AUTH: () => initialUserState,
}, initialUserState);

export default userReducers;
