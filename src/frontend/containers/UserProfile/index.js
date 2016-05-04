import React from 'react';
import { AsyncStatus } from 'lib/constants';
import { updateUser } from 'actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserPropTypes } from 'lib/proptypes';
import UserProfileComponent from 'components/UserProfile';

class UserProfile extends React.Component {
  updateUser() {
    this.props.updateUser(this.state.user);
  }

  render() {
    if (this.props.user.status !== AsyncStatus.SUCCESS) {
      return null;
    }

    return (
      <UserProfileComponent
        user={this.props.user}
        onSubmit={this.props.updateUser}
      />
    );
  }
}

UserProfile.propTypes = {
  user: getUserPropTypes(),
  updateUser: React.PropTypes.func,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateUser,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
