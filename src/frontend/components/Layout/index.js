import React from 'react';
import styles from 'components/Layout/layout.style';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

function Layout(props) {
  return (
    <div style={styles.main}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        {props.children}
      </MuiThemeProvider>
    </div>
  );
}

Layout.propTypes = {
  children: React.PropTypes.node,
};

export default Layout;
