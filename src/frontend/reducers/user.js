import { handleActions } from 'redux-actions';
import immutable from 'immutable';

const initialUserState = immutable.fromJS({});

const userReducers = handleActions({
  RESET_AUTH: () => initialUserState,
}, initialUserState);

export default userReducers;
