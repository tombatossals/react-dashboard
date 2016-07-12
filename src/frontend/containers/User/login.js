import React from 'react'
import LoginComponent from 'components/User/Login'
import { AsyncStatus } from 'lib/constants'
import { authenticate, checkAuthToken } from 'actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'
import { getUserPropTypes } from 'lib/proptypes'

class Login extends React.Component {
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
    console.log(props.user)
    if (props.user.status === AsyncStatus.SUCCESS) {
      props.replace(props.redirect)
    }
  }

  render () {
    return (
      <LoginComponent
        external
        onSignup={this.onSignup}
        onSubmit={this.props.authenticate}
        status={this.props.user.status}
        message={this.props.user.message}
      />
    )
  }
}

Login.propTypes = {
  user: getUserPropTypes(),
  authenticate: React.PropTypes.func.isRequired,
  replace: React.PropTypes.func.isRequired,
  location: React.PropTypes.shape({
    state: React.PropTypes.shape({
      pathname: React.PropTypes.string
    })
  })
}

const mapStateToProps = (state, ownProps) => {
  const redirect = ownProps.location.query.redirect || '/'
  return {
    user: state.user,
    redirect
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  authenticate,
  checkAuthToken,
  replace: routerActions.replace
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Login)
