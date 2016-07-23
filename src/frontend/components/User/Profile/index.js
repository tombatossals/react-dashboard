import React from 'react'
import { getUserPropTypes } from 'lib/proptypes'
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import styles from 'components/User/Profile/profile.style'
import Divider from 'material-ui/Divider'
import Tabs from 'material-ui/Tabs'
import Tab from 'material-ui/Tabs/Tab'
import SettingsIcon from 'material-ui/svg-icons/action/settings'
import PreferencesTab from 'components/User/Profile/PreferencesTab'
import ProfileTab from 'components/User/Profile/ProfileTab'

export default class UserProfile extends React.Component {
  static propTypes = {
    user: getUserPropTypes(),
    section: React.PropTypes.string,
    onEditSubmit: React.PropTypes.func,
    onDeleteSubmit: React.PropTypes.func,
    onChangePasswordSubmit: React.PropTypes.func,
    browseAction: React.PropTypes.func
  }

  handleBrowseProfileAction = () => {
    this.props.browseAction('/user/profile')
  }

  handleBrowsePreferencesAction = () => {
    this.props.browseAction('/user/preferences')
  }

  render () {
    return (
      <Paper style={styles.paper} zDepth={4}>
        {this.props.section === 'profile' &&
          <div>
            <div style={styles.avatar}>
              <Avatar style={styles.avatar} src="https://dummyimage.com/240" size={240} />
              <input type="file" style={styles.imageInput} />
            </div>
            <h1 style={styles.h1}>Your Profile</h1>
          </div>}
        {this.props.section === 'preferences' &&
          <div>
            <SettingsIcon color="#444" style={styles.preferencesIcon} />
            <h1 style={styles.h1}>Preferences</h1>
          </div>
        }
        <Divider style={styles.divider} />
        <Tabs initialSelectedIndex={this.props.section === 'preferences' ? 1 : 0}>
          <Tab label="Profile" onActive={this.handleBrowseProfileAction}>
            <ProfileTab user={this.props.user} onEditSubmit={this.props.onEditSubmit} />
          </Tab>
          <Tab label="Preferences" onActive={this.handleBrowsePreferencesAction}>
            <PreferencesTab
              user={this.props.user}
              onDeleteSubmit={this.props.onDeleteSubmit}
              onChangePasswordSubmit={this.props.onChangePasswordSubmit}
              section={this.props.section}
            />
          </Tab>
        </Tabs>
      </Paper>
    )
  }
}
