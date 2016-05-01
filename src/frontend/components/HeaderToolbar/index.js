import React from 'react';
import Toolbar from 'material-ui/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItemLink from 'components/MenuItemLink';
import styles from 'components/HeaderToolbar/header-toolbar.style';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import { Link } from 'react-router';
import { getAuthPropTypes } from 'proptypes';
import { AsyncStatus } from 'lib/constants';

export default class HeaderToolbar extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.state = {
      open: false,
    };
  }

  handleTouchTap(event) {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleOnClick(url) {
    this.setState({
      open: false,
    });
    this.props.replace(url);
  }

  render() {
    return (
      <Toolbar style={styles.toolbar}>
        <Link to="/" style={styles.title}><ToolbarTitle text="React Dashboard" /></Link>
        <ToolbarGroup float="right" lastChild>
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
                onClick={this.handleTouchTap}
                primary
              />
              <Popover
                open={this.state.open}
                anchorEl={this.state.anchorEl}
              >
                <Menu>
                  <MenuItemLink
                    primaryText="Your profile"
                    url="/user/profile"
                    handleOnClick={this.handleOnClick}
                  />
                  <MenuItemLink
                    primaryText="Preferences"
                    url="/user/preferences"
                    handleOnClick={this.handleOnClick}
                  />
                  <MenuItemLink
                    primaryText="Logout"
                    url="/logout"
                    handleOnClick={this.handleOnClick}
                  />
                </Menu>
              </Popover>
            </div>
          }
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

HeaderToolbar.propTypes = {
  auth: getAuthPropTypes(),
  replace: React.PropTypes.func,
};
