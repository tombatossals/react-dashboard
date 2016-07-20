import React, { Component } from 'react'
import { getUserPropTypes } from 'lib/proptypes'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import API from 'lib/api'

export default (ChildComponent) => {
  class RequireAuthentication extends Component {

    redirect () {
      this.props.router.push(`/login?redirect=${this.props.location.pathname}`)
    }

    render () {
      if (API.isAnonymous(this.props.user)) {
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
    routeParams: React.PropTypes.object,
    location: React.PropTypes.shape({
      pathname: React.PropTypes.string
    })
  }

  return withRouter(connect(mapStateToProps)(RequireAuthentication))
}
