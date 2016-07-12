import React from 'react'
import { updateUser, deleteUser, changePassword } from 'actions'
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
        onChangePasswordSubmit={this.props.changePassword}
        browseAction={this.browseAction} />
      )
  }
}

Profile.propTypes = {
  user: getUserPropTypes(),
  section: React.PropTypes.oneOf(['profile', 'preferences']),
  updateUser: React.PropTypes.func,
  deleteUser: React.PropTypes.func,
  changePassword: React.PropTypes.func,
  replace: React.PropTypes.func
}

const mapStateToProps = (state, props) => ({
  user: state.user,
  section: props.route.path
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateUser,
  deleteUser,
  changePassword,
  replace: routerActions.replace
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
