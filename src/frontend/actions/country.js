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
      console.log('countries', countries)
      return dispatch(getCountriesAction({
        action: {
          type: CountryActions.COUNTRY_GETALL,
          status: AsyncStatus.SUCCESS
        },
        data: countries
      }))
    }
    , err => dispatch(getCountriesAction({
      data: [],
      action: {
        type: CountryActions.COUNTRY_GETALL,
        status: AsyncStatus.FAILED,
        message: err.message
      }
    })))
  }
}

