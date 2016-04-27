import { combineReducers } from 'redux';
import userReducers from 'reducers/user';
import authReducers from 'reducers/auth';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  user: userReducers,
  auth: authReducers,
  routing: routerReducer,
});

export default rootReducer;
