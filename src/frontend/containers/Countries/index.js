import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { AsyncStatus } from 'lib/constants'
import CountriesComponent from 'components/Countries'
import { getCountries } from 'actions'

class Countries extends React.Component {
  componentWillMount () {
    this.props.getCountries()
  }

  render () {
    if (this.props.countries.action === AsyncStatus.IDLE) {
      return null
    }
    console.log('ye', this.props.countries)
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
