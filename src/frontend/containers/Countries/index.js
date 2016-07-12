import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { AsyncStatus } from 'lib/constants'
import CountriesComponent from 'components/Countries'
import { getCountries } from 'actions'

class Countries extends React.Component {
  componentDidMount () {
    this.props.getCountries()
  }

  render () {
    if (this.props.countries.action.status !== AsyncStatus.SUCCESS) {
      return null
    }
    return (
      <CountriesComponent
        countries={this.props.countries}
      />
    )
  }
}

Countries.propTypes = {
  countries: React.PropTypes.any,
  getCountries: React.PropTypes.func.isRequired
}

function mapStateToProps (state, ownProps) {
  return {
    countries: state.countries
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    getCountries
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Countries)
