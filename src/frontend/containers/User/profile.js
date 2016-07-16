import React from 'react'
import { updateUser, deleteUser, changePassword } from 'actions'
import { connect } from 'react-redux'
import { getUserPropTypes } from 'lib/proptypes'
import UserProfileComponent from 'components/User/Profile'

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

const mapStateToProps = ({ user }, props) => ({
  user,
  section: props.route.path
})

export default connect(mapStateToProps,
  { updateUser, deleteUser, changePassword })(Profile)
