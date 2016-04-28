import { combineReducers } from 'redux';
import authReducers from 'reducers/auth';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  auth: authReducers,
  routing: routerReducer,
});

export default rootReducer;
