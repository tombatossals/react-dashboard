/*
 * Copyright (c) 2016-present, Parse, LLC
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */
import React from 'react';
import styles from 'components/AppBadge/AppBadge.scss';

const AppBadge = ({ production }) => (
  <span className={production ? [styles.badge, styles.prod].join(' ') : styles.badge}>
    {production ? 'PROD' : 'DEV'}
  </span>
);

export default AppBadge;

AppBadge.propTypes = {
  production: React.PropTypes.bool,
};
