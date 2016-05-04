import React from 'react';
import { getUserPropTypes } from 'lib/proptypes';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import styles from 'components/UserProfile/userprofile.style';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';

export default class UserProfile extends React.Component {
  constructor() {
    super();
    this.handleRightIcon = this.handleRightIcon.bind(this);
    this.state = {
      editMode: false,
    };
  }

  handleMouseEnter() {
    this.setState({
      editMode: true,
    });
  }

  handleMouseLeave() {
    this.setState({
      editMode: false,
    });
  }

  handleRightIcon() {
    console.log(this.state);
    if (this.state.editMode) {
      return <EditIcon />;
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
        <List>
          <ListItem
            style={styles.item}
            primaryText={this.props.user.data.username}
            secondaryText="Username"
            rightIcon={<EditIcon />}
            onMouseEnter={this.handleOnMouseEnter}
            onMouseLeave={this.handleOnMouseLeave}
          />
        </List>
      </Paper>
    );
  }
}

UserProfile.propTypes = {
  user: getUserPropTypes(),
};
