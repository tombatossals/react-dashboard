import React from 'react'
import Toolbar from 'material-ui/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle'
import FlatButton from 'material-ui/FlatButton'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItemLink from 'components/HeaderToolbar/MenuItemLink'
import styles from 'components/HeaderToolbar/header-toolbar.style'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'
import { getUserPropTypes } from 'lib/proptypes'
import LogoutIcon from 'material-ui/svg-icons/action/power-settings-new'
import SettingsIcon from 'material-ui/svg-icons/action/settings'
import AccountBoxIcon from 'material-ui/svg-icons/action/account-box'

export default class HeaderToolbar extends React.Component {
  constructor (props) {
    super(props)
    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleTouchTap = this.handleTouchTap.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.navigateUserLogin = this.navigateUserLogin.bind(this)
    this.navigateHome = this.navigateHome.bind(this)
    this.state = {
      open: false
    }
  }

  handleTouchTap (event) {
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    })
  }

  handleRequestClose () {
    this.setState({
      open: false
    })
  }

  handleOnClick (url) {
    this.setState({
      open: false
    })
    this.props.onNavigationChange(url)
  }

  navigateHome () {
    this.handleOnClick('/')
  }

  navigateUserLogin () {
    this.handleOnClick('/login')
  }

  render () {
    return (
      <Toolbar style={styles.toolbar}>
        <ToolbarTitle text='React Dashboard' onClick={this.navigateHome} style={styles.link} />
        <ToolbarGroup float='right' lastChild>
          {!this.props.user.data &&
            <FlatButton
              onClick={this.navigateUserLogin}
              primary
              label='Login'
              style={styles.menulink} />
          }
          {this.props.user.data &&
            <div style={styles.right}>
              <FlatButton
                label={this.props.user.data.username}
                icon={<AccountCircle color='white' />}
                style={styles.menulink}
                onClick={this.handleTouchTap}
                primary />
              <Popover open={this.state.open} anchorEl={this.state.anchorEl} onRequestClose={this.handleRequestClose}>
                <Menu>
                  <MenuItemLink
                    primaryText='Your profile'
                    url='/user/profile'
                    leftIcon={<AccountBoxIcon />}
                    handleOnClick={this.handleOnClick} />
                  <MenuItemLink
                    primaryText='Preferences'
                    url='/user/preferences'
                    leftIcon={<SettingsIcon />}
                    handleOnClick={this.handleOnClick} />
                  <MenuItemLink
                    primaryText='Logout'
                    url='/logout'
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

HeaderToolbar.propTypes = {
  user: getUserPropTypes(),
  onNavigationChange: React.PropTypes.func
}
