import { combineReducers } from 'redux'
import userReducers from 'reducers/user'
import countryReducers from 'reducers/country'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  user: userReducers,
  countries: countryReducers,
  routing: routerReducer
})

export default rootReducer
