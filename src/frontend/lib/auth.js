import React, { Component } from 'react'
import { Login } from 'components/User'
import { getUserPropTypes } from 'lib/proptypes'

export default (ChildComponent) => {
  class AuthenticatedComponent extends Component {

    constructor (props) {
      super(props)
      console.log('user', props.user)
      this.state = {
        user: props.user
      }
    }

    componentDidMount () {
      this.state = {
        user: true
      }
    }

    render () {
      return <Login />
    }
  }

  AuthenticatedComponent.propTypes = {
    user: getUserPropTypes()
  }
  return AuthenticatedComponent
}
