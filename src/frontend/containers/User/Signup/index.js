import React from 'react'
import RegistrationComponent from 'components/User/Signup'
import { AsyncStatus } from 'lib/constants'
import { signup, checkAuthToken } from 'actions'
import { connect } from 'react-redux'
import { getUserPropTypes } from 'lib/proptypes'
import { withRouter } from 'react-router'

class Signup extends React.Component {
  componentWillMount () {
    this.ensureNotLoggedIn(this.props)
  }

  componentWillReceiveProps (props) {
    this.ensureNotLoggedIn(props)
  }

  ensureNotLoggedIn (props) {
    if (props.user.status === AsyncStatus.AUTHENTICATED) {
      return props.router.push('/user/signup/success')
    }
  }

  render () {
    return (
      <RegistrationComponent
        onSubmit={this.props.signup}
        status={this.props.user.status}
        message={this.props.user.message} />
    )
  }
}

Signup.propTypes = {
  user: getUserPropTypes(),
  signup: React.PropTypes.func.isRequired,
  router: React.PropTypes.any
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default withRouter(connect(mapStateToProps,
  { signup, checkAuthToken })(Signup))