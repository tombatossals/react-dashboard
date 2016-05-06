import React from 'react';
import { getUserPropTypes } from 'lib/proptypes';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import styles from 'components/UserProfile/userprofile.style';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import Tabs from 'material-ui/Tabs';
import Tab from 'material-ui/Tabs/Tab';
// import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import LockIcon from 'material-ui/svg-icons/action/lock';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle';

export default class UserProfile extends React.Component {
  constructor() {
    super();
    this.handleEditMode = this.handleEditMode.bind(this);
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
    this.handleBrowseProfileAction = this.handleBrowseProfileAction.bind(this);
    this.handleBrowsePreferencesAction = this.handleBrowsePreferencesAction.bind(this);
    this.state = {
      editMode: false,
      section: 'profile',
    };
  }

  componentWillMount() {
    this.setState({
      section: this.props.section,
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      section: props.section,
    });
  }

  handleBrowseProfileAction() {
    this.props.browseAction('/user/profile');
  }

  handleBrowsePreferencesAction() {
    this.props.browseAction('/user/preferences');
  }

  handleEditMode() {
    this.setState({
      editMode: true,
    });
  }

  handleCancelEdit() {
    this.setState({
      editMode: false,
    });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary
        onTouchTap={this.handleCancelEdit}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onTouchTap={this.handleCancelEdit}
      />,
    ];

    return (
      <Paper style={styles.paper} zDepth={4}>
        {this.state.section === 'profile' &&
          <div>
            <div style={styles.avatar}>
              <Avatar
                style={styles.avatar}
                src="http://lorempixel.com/240/240/"
                size={240}
              />
              <input type="file" style={styles.imageInput} />
            </div>
            <h1 style={styles.h1}>Your Profile</h1>
          </div>
        }
        {this.state.section === 'preferences' &&
          <div>
            <SettingsIcon
              color="#444"
              style={styles.preferencesIcon}
            />
            <h1 style={styles.h1}>Preferences</h1>
          </div>
        }
        <Divider style={styles.divider} />
        <Tabs
          initialSelectedIndex={this.state.section === 'preferences' ? 1 : 0}
        >
          <Tab
            label="Profile"
            onClick={this.handleBrowseProfileAction}
          >
            <List style={styles.list}>
              <ListItem
                style={styles.item}
                primaryText={this.props.user.data.username}
                secondaryText="Username"
                onClick={this.handleEditMode}
              />
              <ListItem
                style={styles.item}
                primaryText={this.props.user.data.email}
                secondaryText="E-Mail"
                onClick={this.handleEditMode}
              />
            </List>
            <Dialog
              title="Edit profile"
              label="Profile"
              actions={actions}
              modal
              open={this.state.editMode}
            >
              <TextField
                floatingLabelText="Username"
                style={styles.textfield}
                defaultValue={this.props.user.data.username}
              />
              <TextField
                floatingLabelText="E-Mail"
                style={styles.textfield}
                defaultValue={this.props.user.data.email}
              />
            </Dialog>
          </Tab>
          <Tab
            label="Preferences"
            onClick={this.handleBrowsePreferencesAction}
          >
            <List style={styles.list}>
              <ListItem
                style={styles.item}
                primaryText="Change password"
                leftIcon={<LockIcon />}
              />
              <ListItem
                style={styles.item}
                primaryText="Delete account"
                leftIcon={<RemoveIcon />}
              />
            </List>
            <Dialog
              title="Edit profile"
              label="Profile"
              actions={actions}
              modal
              open={this.state.editMode}
            >
              <TextField
                floatingLabelText="Username"
                style={styles.textfield}
                defaultValue={this.props.user.data.username}
              />
              <TextField
                floatingLabelText="E-Mail"
                style={styles.textfield}
                defaultValue={this.props.user.data.email}
              />
            </Dialog>
          </Tab>
        </Tabs>
      </Paper>
    );
  }
}

UserProfile.propTypes = {
  user: getUserPropTypes(),
  section: React.PropTypes.string,
  browseAction: React.PropTypes.func,
};
