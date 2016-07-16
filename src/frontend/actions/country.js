import { createAction } from 'redux-actions'
import { AsyncStatus, CountryActions } from 'lib/constants'
import API from 'lib/api'

export function fetchCountries () {
  return dispatch => {
    const fetchCountriesAction = createAction(CountryActions.COUNTRY_GETALL)
    dispatch(fetchCountriesAction({
      status: AsyncStatus.REQUEST
    }))

    API.getCountries().subscribe(countries => {
      return dispatch(fetchCountriesAction({
        status: AsyncStatus.SUCCESS,
        data: countries
      }))
    }
    , err => dispatch(fetchCountriesAction({
      status: AsyncStatus.FAILED,
      message: err.message
    })))
  }
}

