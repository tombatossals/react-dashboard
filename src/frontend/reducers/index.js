import { combineReducers } from 'redux';

import userReducers from 'reducers/user';
import authReducers from 'reducers/auth';

const rootReducer = combineReducers({
  users: userReducers,
  auth: authReducers,
});

export default rootReducer;
