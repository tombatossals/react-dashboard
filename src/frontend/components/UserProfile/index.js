import React from 'react';
import { getUserPropTypes } from 'lib/proptypes';
const UserProfile = (props) => (
  <div>
    <h1>Your Profile</h1>
    {props.user.username}
  </div>
);

UserProfile.propTypes = {
  user: getUserPropTypes(),
};

export default UserProfile;
