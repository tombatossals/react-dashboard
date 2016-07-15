import React, { Component } from 'react'
import { getUserPropTypes } from 'lib/proptypes'

export default (ChildComponent) => {
  class AuthenticatedComponent extends Component {

    constructor (props) {
      super(props)
      this.state = {
        user: props.user
      }
    }

    componentDidMount () {
      this.state = {
        user: this.props.user
      }
    }

    componentWillReceiveProps (props) {
      this.state = {
        user: props.user
      }
    }

    render () {
      console.log(this.state.user)
      return this.state.user
        ? <div>hola</div>
        : false
    }
  }

  AuthenticatedComponent.propTypes = {
    user: getUserPropTypes()
  }
  return AuthenticatedComponent
}
