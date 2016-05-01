import React from 'react';
import LoginComponent from 'components/Login';
import { AsyncStatus } from 'lib/constants';
import { authenticate, checkAuthToken } from 'actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { getUserPropTypes } from 'proptypes';

class Login extends React.Component {
  componentWillMount() {
    this.ensureNotLoggedIn(this.props);
  }

  componentWillReceiveProps(props) {
    this.ensureNotLoggedIn(props);
  }

  ensureNotLoggedIn(props) {
    if (props.user.status === AsyncStatus.IDLE) {
      props.checkAuthToken();
    } else if (props.user.status === AsyncStatus.SUCCESS) {
      props.replace(props.redirect);
    }
  }

  render() {
    return (
      <LoginComponent
        onSubmit={this.props.authenticate}
        status={this.props.user.status}
        message={this.props.user.message}
      />
    );
  }
}

Login.propTypes = {
  user: getUserPropTypes(),
  authenticate: React.PropTypes.func.isRequired,
  location: React.PropTypes.shape({
    state: React.PropTypes.shape({
      pathname: React.PropTypes.string,
    }),
  }),
};

function mapStateToProps(state, ownProps) {
  const redirect = ownProps.location.query.redirect || '/';
  return {
    user: state.user,
    redirect,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    authenticate,
    checkAuthToken,
    replace: routerActions.replace,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

