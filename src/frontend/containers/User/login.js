import React from 'react'
import LoginComponent from 'components/User/Login'
import { AsyncStatus } from 'lib/constants'
import { authenticate, checkAuthToken } from 'actions'
import { connect } from 'react-redux'
import { getUserPropTypes } from 'lib/proptypes'

class Login extends React.Component {
  constructor () {
    super()
    this.onSignup = this.onSignup.bind(this)
  }

  componentDidMount () {
    this.ensureNotLoggedIn(this.props)
  }

  componentDidUpdate (props) {
    this.ensureNotLoggedIn(props)
  }

  onSignup () {
    this.props.navigate('/user/signup')
  }

  ensureNotLoggedIn (props) {
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
  navigate: React.PropTypes.func.isRequired,
  location: React.PropTypes.shape({
    state: React.PropTypes.shape({
      pathname: React.PropTypes.string
    })
  })
}

const mapStateToProps = ({ user }) => ({
  user
})

export default connect(mapStateToProps, { authenticate, checkAuthToken })(Login)
