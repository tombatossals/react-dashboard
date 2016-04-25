import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

export function getAuthPropType() {
  return ImmutablePropTypes.mapContains({
    token: React.PropTypes.string,
    status: React.PropTypes.string,
    username: React.PropTypes.string,
    message: React.PropTypes.string,
    admin: React.PropTypes.bool,
  });
}
