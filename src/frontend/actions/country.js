import { createAction } from 'redux-actions'
import { AsyncStatus, CountryActions } from 'lib/constants'
import API from 'lib/api'

export function getCountries () {
  return dispatch => {
    const getCountriesAction = createAction(CountryActions.COUNTRY_GETALL)
    dispatch(getCountriesAction({
      action: {
        type: CountryActions.COUNTRY_GETALL,
        status: AsyncStatus.LOADING
      }
    }))

    API.getCountries().subscribe(countries => {
      return dispatch(getCountriesAction({
        status: AsyncStatus.SUCCESS,
        data: countries
      }))
    }
    , err => dispatch(getCountriesAction({
      status: AsyncStatus.FAILED,
      message: err.message
    })))
  }
}

