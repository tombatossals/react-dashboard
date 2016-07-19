import React from 'react'
import LoginComponent from 'components/User/Login'
import { authenticate, checkAuthToken } from 'actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { getUserPropTypes } from 'lib/proptypes'
import API from 'lib/api'

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
    this.props.router.push('/user/signup')
  }

  ensureNotLoggedIn (props) {
    if (!API.isAnonymous(props.user)) {
      props.router.push(props.location.query.redirect || '/')
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
  router: React.PropTypes.any,
  location: React.PropTypes.shape({
    state: React.PropTypes.shape({
      pathname: React.PropTypes.string
    })
  })
}

const mapStateToProps = ({ user }) => ({
  user
})

export default withRouter(connect(mapStateToProps, { authenticate, checkAuthToken })(Login))
