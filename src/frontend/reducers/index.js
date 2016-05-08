import { combineReducers } from 'redux'
import userReducers from 'reducers/user'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  user: userReducers,
  routing: routerReducer
})

export default rootReducer
