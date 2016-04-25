import React from 'react';
import LoginComponent from 'components/Login';
import { AsyncStatus } from 'lib/constants';
import { authenticate } from 'actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getAuthPropType } from 'proptypes';

class Login extends React.Component {
  componentWillMount() {
    this.checkProps(this.props);
  }

  componentWillReceiveProps(props) {
    this.checkProps(props);
  }

  checkProps(props) {
    if (props.auth.get('status') === AsyncStatus.SUCCESS) {
      const { location } = props;
      if (location && location.query && location.query.next) {
        return browserHistory.push(location.query.next);
      }
      return browserHistory.push('/');
    }
    return this.setState({ showErrors: true });
  }

  render() {
    return (
      <LoginComponent
        onSubmit={this.props.authenticate}
        status={this.props.auth.get('status')}
        message={this.props.auth.get('message')}
      />
    );
  }
}

Login.propTypes = {
  auth: getAuthPropType(),
  authenticate: React.PropTypes.func.isRequired,
  location: React.PropTypes.shape({
    state: React.PropTypes.shape({
      pathname: React.PropTypes.string,
    }),
  }),
};

function mapStateToProps({ auth }) {
  return { auth };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ authenticate }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

