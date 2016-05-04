import React from 'react';
import UserPreferencesComponent from 'components/UserPreferences';
// import { AsyncStatus } from 'lib/constants';
import { updateUser } from 'actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserPropTypes } from 'lib/proptypes';

class UserPreferences extends React.Component {
  updateUser() {
    this.props.updateUser(this.state.user);
  }

  render() {
    if (!this.props.user) {
      return null;
    }

    return (
      <UserPreferencesComponent
        onSubmit={this.props.updateUser}
      />
    );
  }
}

UserPreferences.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(UserPreferences);

