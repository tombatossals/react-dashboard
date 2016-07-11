import React, { Component } from 'react'
import { Login } from 'containers/User'
import api from 'lib/api'

export default (ChildComponent) => {
  class AuthenticatedComponent extends Component {

    constructor (props) {
      super(props)
      this.state = {currentUser: ''}
    }

    componentDidMount () {
      if (api.hasAuthToken()) {
        api.getCurrentUser((user) => {
          this.setState({currentUser: user.id})
        })
      }
    }

    render () {
      return (api.hasAuthToken()
          ? <ChildComponent {...this.props} user={this.state.currentUser} />
          : <Login />
      )
    }
  }

  return AuthenticatedComponent
}
