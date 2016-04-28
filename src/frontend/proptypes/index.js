import React from 'react';

export const getAuthPropTypes = () =>
  React.PropTypes.shape({
    token: React.PropTypes.string,
    status: React.PropTypes.string,
    username: React.PropTypes.string,
    message: React.PropTypes.string,
    admin: React.PropTypes.bool,
  });
