import React from 'react';
import Toolbar from 'material-ui/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import styles from 'components/HeaderMenu/headermenu.style';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import { Link } from 'react-router';
import { getAuthPropTypes } from 'proptypes';
import { AsyncStatus } from 'lib/constants';

export default class HeaderMenu extends React.Component {
  constructor(props) {
    super(props);

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.state = {
      open: false,
    };
  }

  handleTouchTap(event) {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    return (
      <Toolbar style={styles.toolbar}>
        <Link to="/" style={styles.title}><ToolbarTitle text="React Dashboard" /></Link>
        <ToolbarGroup float="right">
          {this.props.auth.status !== AsyncStatus.SUCCESS &&
            <FlatButton
              label={<Link to="/login" style={styles.link}>Login</Link>}
              primary
            />
          }
          {this.props.auth.status === AsyncStatus.SUCCESS &&
            <div style={styles.right}>
              <FlatButton
                label="David Rubert"
                icon={<AccountCircle color="white" />}
                style={styles.menu}
                onTouchTap={this.handleTouchTap}
                primary
              />
              <Popover
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                onRequestClose={this.handleRequestClose}
              >
                <Menu>
                  <MenuItem primaryText="Refresh" />
                  <MenuItem primaryText="Help &amp; feedback" />
                  <MenuItem primaryText="Settings" />
                  <MenuItem primaryText="Sign out" />
                </Menu>
              </Popover>
            </div>
          }
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

HeaderMenu.propTypes = {
  auth: getAuthPropTypes(),
};
