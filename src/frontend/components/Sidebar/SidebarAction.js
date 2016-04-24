import React from 'react';
import styles from 'components/Sidebar/Sidebar.scss';

export default class SidebarAction {
  constructor(text, fn) {
    this.text = text;
    this.fn = fn || function none() {};
  }

  renderButton() {
    return (
      <a
        className={styles.action}
        onClick={this.fn}
      >
        {this.text}
      </a>
    );
  }
}
