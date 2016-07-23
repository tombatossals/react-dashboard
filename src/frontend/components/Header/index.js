import React from 'react'
import Toolbar from 'material-ui/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'
import FlatButton from 'material-ui/FlatButton'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItemLink from 'components/Header/Menu/ItemLink'
import Logo from 'components/Header/Logo'
import styles from 'components/Header/style'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'
import { getUserPropTypes } from 'lib/proptypes'
import { UserStatus } from 'lib/constants'
import LogoutIcon from 'material-ui/svg-icons/action/power-settings-new'
import SettingsIcon from 'material-ui/svg-icons/action/settings'
import AccountBoxIcon from 'material-ui/svg-icons/action/account-box'

export default class HeaderToolbar extends React.Component {
  static propTypes = {
    user: getUserPropTypes(),
    onNavigationChange: React.PropTypes.func
  }

  state = {
    open: false
  }

  handleTouchTap = (event) => {
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false
    })
  }

  handleOnClick = (url) => {
    this.setState({
      open: false
    })
    this.props.onNavigationChange(url)
  }

  navigateHome = () => {
    this.handleOnClick('/home')
  }

  navigateUserLogin = () => {
    this.handleOnClick('/login')
  }

  render () {
    return (
      <Toolbar style={styles.toolbar}>
        <Logo text="React Dashboard" onClick={this.navigateHome} />
        <ToolbarGroup float="right" lastChild>
          {this.props.user.status === UserStatus.ANONYMOUS &&
            <FlatButton
              onClick={this.navigateUserLogin}
              primary
              label="Login"
              style={styles.menulink} />
          }
          {this.props.user.status === UserStatus.AUTHENTICATED &&
            <div style={styles.right}>
              <FlatButton
                label="Your Profile"
                icon={<AccountCircle color="#222" />}
                style={styles.menulink}
                onClick={this.handleTouchTap}
                primary />
              <Popover open={this.state.open} anchorEl={this.state.anchorEl} onRequestClose={this.handleRequestClose}>
                <Menu>
                  <MenuItemLink
                    primaryText="Your profile"
                    url="/user/profile"
                    leftIcon={<AccountBoxIcon />}
                    handleOnClick={this.handleOnClick} />
                  <MenuItemLink
                    primaryText="Preferences"
                    url="/user/preferences"
                    leftIcon={<SettingsIcon />}
                    handleOnClick={this.handleOnClick} />
                  <MenuItemLink
                    primaryText="Logout"
                    url="/logout"
                    leftIcon={<LogoutIcon />}
                    handleOnClick={this.handleOnClick} />
                </Menu>
              </Popover>
            </div>
          }
        </ToolbarGroup>
      </Toolbar>
    )
  }
}
