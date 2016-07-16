import React, { Component } from 'react'
import { getUserPropTypes } from 'lib/proptypes'
import { connect } from 'react-redux'
import { AsyncStatus } from 'lib/constants'
import { withRouter } from 'react-router'

export default (ChildComponent) => {
  class RequireAuthentication extends Component {

    constructor (props) {
      super(props)
      this.state = {
        user: props.user
      }
    }

    redirect () {
      this.props.router.push(`/login?redirect=${this.props.routeParams.redirect}`)
    }

    render () {
      if (this.props.user.status === AsyncStatus.FAILED) {
        this.redirect()
      }
      return <ChildComponent {...this.props} />
    }
  }

  const mapStateToProps = ({ user }) => ({
    user
  })

  RequireAuthentication.propTypes = {
    user: getUserPropTypes(),
    router: React.PropTypes.object,
    routeParams: React.PropTypes.object
  }

  return withRouter(connect(mapStateToProps)(RequireAuthentication))
}
