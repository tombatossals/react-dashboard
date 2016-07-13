import React, { Component } from 'react'
import { Login } from 'containers/User'
import api from 'lib/api'

export default (ChildComponent) => {
  class AuthenticatedComponent extends Component {

    constructor (props) {
      super(props)
      this.state = {
        user: undefined
      }
    }

    componentDidMount () {
      api.getCurrentUser((user) => {
        this.setState({ user })
      })
    }

    render () {
      return (this.state.user
          ? <ChildComponent {...this.props} user={this.state.user} />
          : <Login />
      )
    }
  }

  return AuthenticatedComponent
}
