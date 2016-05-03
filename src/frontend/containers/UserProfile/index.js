import React from 'react';
import UserProfileComponent from 'components/UserProfile';
// import { AsyncStatus } from 'lib/constants';
import { updateUser } from 'actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserPropTypes } from 'proptypes';

class UserProfile extends React.Component {
  updateUser() {
    this.props.updateUser(this.state.user);
  }

  render() {
    return (
      <UserProfileComponent
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

