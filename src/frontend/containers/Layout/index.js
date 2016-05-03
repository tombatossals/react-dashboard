import React from 'react';
import styles from 'containers/Layout/layout.style';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { getUserPropTypes } from 'lib/proptypes';
import { AsyncStatus } from 'lib/constants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { checkAuthToken } from 'actions';
// import DevTools from 'containers/DevTools';
import HeaderMenu from 'components/HeaderToolbar';
import { routerActions } from 'react-router-redux';

class Layout extends React.Component {
  constructor() {
    super();
    this.navigate = this.navigate.bind(this);
  }

  componentWillMount() {
    this.checkLoggedIn(this.props);
  }

  checkLoggedIn(props) {
    if (this.props.user.status === AsyncStatus.IDLE) {
      props.checkAuthToken();
    }
  }

  navigate(url) {
    this.props.redirect(url);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div style={styles.main}>
          <HeaderMenu user={this.props.user} onNavigationChange={this.navigate} />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

Layout.propTypes = {
  children: React.PropTypes.node,
  user: getUserPropTypes(),
  redirect: React.PropTypes.func,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    checkAuthToken,
    redirect: routerActions.replace,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
