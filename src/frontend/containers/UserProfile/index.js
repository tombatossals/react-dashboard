import React from 'react'
import { AsyncStatus } from 'lib/constants'
import { updateUser } from 'actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUserPropTypes } from 'lib/proptypes'
import UserProfileComponent from 'components/UserProfile'
import { routerActions } from 'react-router-redux'

class UserProfile extends React.Component {
  constructor () {
    super()
    this.browseAction = this.browseAction.bind(this)
  }

  browseAction (url) {
    this.props.replace(url)
  }

  render () {
    if (this.props.user.status !== AsyncStatus.SUCCESS) {
      return null
    }

    return (
      <UserProfileComponent
        user={this.props.user}
        onSubmit={this.props.updateUser}
        section={this.props.section}
        browseAction={this.browseAction} />
      )
  }
}

UserProfile.propTypes = {
  user: getUserPropTypes(),
  section: React.PropTypes.oneOf(['profile', 'preferences']),
  updateUser: React.PropTypes.func,
  replace: React.PropTypes.func
}

function mapStateToProps (state, props) {
  return {
    user: state.user,
    section: props.route.path
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    updateUser,
    replace: routerActions.replace
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
