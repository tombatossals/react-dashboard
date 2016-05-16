import React from 'react'
import RegistrationComponent from 'components/User/Signup'
import { AsyncStatus } from 'lib/constants'
import { signup, checkAuthToken } from 'actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'
import { getUserPropTypes } from 'lib/proptypes'

class Signup extends React.Component {
  constructor () {
    super()
    this.onSignup = this.onSignup.bind(this)
  }

  componentWillMount () {
    this.ensureNotLoggedIn(this.props)
  }

  componentWillReceiveProps (props) {
    this.ensureNotLoggedIn(props)
  }

  onSignup () {
    this.props.replace('/user/signup')
  }

  ensureNotLoggedIn (props) {
    if (props.user.status === AsyncStatus.SUCCESS) {
      return props.replace('/us er/signup/success')
    }
  }

  render () {
    return (
      <RegistrationComponent
        onSignup={this.onSignup}
        onSubmit={this.props.signup}
        status={this.props.user.status}
        message={this.props.user.message} />
    )
  }
}

Signup.propTypes = {
  user: getUserPropTypes(),
  signup: React.PropTypes.func.isRequired,
  replace: React.PropTypes.func.isRequired,
  location: React.PropTypes.shape({
    state: React.PropTypes.shape({
      pathname: React.PropTypes.string
    })
  })
}

function mapStateToProps (state, ownProps) {
  return {
    user: state.user
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    signup,
    checkAuthToken,
    replace: routerActions.replace
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
