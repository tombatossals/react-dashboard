import React from 'react'
import { connect } from 'react-redux'
import { AsyncStatus } from 'lib/constants'
import CountriesComponent from 'components/Countries'
import { fetchCountries } from 'actions'

class Countries extends React.Component {
  componentDidMount () {
    this.props.fetchCountries()
  }

  render () {
    if (this.props.countries.status !== AsyncStatus.SUCCESS) {
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
  fetchCountries: React.PropTypes.func.isRequired
}

const mapStateToProps = ({ countries }) => ({
  countries
})

export default connect(mapStateToProps, { fetchCountries })(Countries)
