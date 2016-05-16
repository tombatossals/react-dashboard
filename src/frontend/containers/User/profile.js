import React from 'react'
import { updateUser, deleteUser } from 'actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUserPropTypes } from 'lib/proptypes'
import UserProfileComponent from 'components/User/Profile'
import { routerActions } from 'react-router-redux'

class Profile extends React.Component {
  constructor () {
    super()
    this.browseAction = this.browseAction.bind(this)
  }

  browseAction (url) {
    this.props.replace(url)
  }

  render () {
    return (
      <UserProfileComponent
        user={this.props.user}
        onEditSubmit={this.props.updateUser}
        section={this.props.section}
        onDeleteSubmit={this.props.deleteUser}
        browseAction={this.browseAction} />
      )
  }
}

Profile.propTypes = {
  user: getUserPropTypes(),
  section: React.PropTypes.oneOf(['profile', 'preferences']),
  updateUser: React.PropTypes.func,
  deleteUser: React.PropTypes.func,
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
    deleteUser,
    replace: routerActions.replace
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
