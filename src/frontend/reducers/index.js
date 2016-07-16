import { combineReducers } from 'redux'
import userReducers from 'reducers/user'
import countryReducers from 'reducers/country'

const rootReducer = combineReducers({
  user: userReducers,
  countries: countryReducers
})

export default rootReducer
