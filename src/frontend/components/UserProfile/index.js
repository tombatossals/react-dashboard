import React from 'react';
import { getUserPropTypes } from 'lib/proptypes';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import styles from 'components/UserProfile/userprofile.style';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import TextField from 'material-ui/TextField';
import Tabs from 'material-ui/Tabs';
import Tab from 'material-ui/Tabs/Tab';

export default class UserProfile extends React.Component {
  constructor() {
    super();
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleUsernamePrimaryText = this.handleUsernamePrimaryText.bind(this);
    this.handleUsernameSecondaryText = this.handleUsernameSecondaryText.bind(this);
    this.state = {
      editMode: false,
    };
  }

  handleOnClick() {
    this.setState({
      editMode: true,
    });
  }

  handleOnBlur() {
    this.setState({
      editMode: false,
    });
  }

  handleUsernamePrimaryText() {
    if (!this.state.editMode) {
      return this.props.user.data.username;
    }
    return (
      <TextField
        style={styles.textfield}
        defaultValue={this.props.user.data.username}
        hintText="Username"
      />
    );
  }

  handleUsernameSecondaryText() {
    if (!this.state.editMode) {
      return 'Username';
    }
    return null;
  }

  render() {
    return (
      <Paper style={styles.paper} zDepth={4}>
        <Avatar
          style={styles.avatar}
          src="http://lorempixel.com/240/240/"
          size={240}
        />
        <h1 style={styles.h1}>Your Profile</h1>
        <Divider style={styles.divider} />
        <Tabs>
          <Tab
            label="Profile"
          >
            <List>
              <ListItem
                style={styles.item}
                primaryText={this.handleUsernamePrimaryText()}
                secondaryText={this.handleUsernameSecondaryText()}
              />
            </List>
          </Tab>
          <Tab
            label="Preferences"
          >
            <div>hola</div>
          </Tab>
        </Tabs>
      </Paper>
    );
  }
}

UserProfile.propTypes = {
  user: getUserPropTypes(),
};
