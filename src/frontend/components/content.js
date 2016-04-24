import React from 'react';
import styles from 'components/content.scss';
import Icon from 'components/Icon/Icon';
import { center } from 'stylesheets/base.scss';

const Content = () => (
  <div className={styles.content}>
    <div className={styles.empty}>
      <div className={center}>
        <div className={styles.cloud}>
          <Icon width={110} height={110} name="cloud-surprise" fill="#1e3b4d" />
        </div>
        <div className={styles.alert}>You don't have any apps</div>
      </div>
    </div>
  </div>
);

export default Content;
