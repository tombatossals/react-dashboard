import React from 'react';
import styles from 'containers/Layout/layout.style';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { getAuthPropTypes } from 'proptypes';
import { AsyncStatus } from 'lib/constants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { checkAuthToken } from 'actions';
// import DevTools from 'containers/DevTools';
import HeaderMenu from 'components/HeaderToolbar';

class Layout extends React.Component {
  componentWillMount() {
    this.ensureNotLoggedIn(this.props);
  }

  ensureNotLoggedIn(props) {
    if (this.props.auth.status === AsyncStatus.IDLE) {
      props.checkAuthToken();
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div style={styles.main}>
          <HeaderMenu auth={this.props.auth} />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

Layout.propTypes = {
  children: React.PropTypes.node,
  auth: getAuthPropTypes(),
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    checkAuthToken,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
