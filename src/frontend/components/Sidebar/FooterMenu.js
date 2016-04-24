import Icon from 'components/Icon/Icon';
import Popover from 'components/Popover/Popover';
import Position from 'lib/Position';
import React from 'react';
import styles from 'components/Sidebar/Sidebar.scss';

export default class FooterMenu extends React.Component {
  constructor() {
    super();

    this.toggle = this.toggle.bind(this);
    this.state = {
      show: false,
      position: null,
    };
  }

  toggle() {
    const pos = Position.inWindow(this.refs.more);
    pos.x += 24;
    this.setState({
      show: true,
      position: pos,
    });
  }

  render() {
    let content = null;
    if (this.state.show) {
      content = (
        <Popover
          fixed
          position={this.state.position}
          onExternalClick={() => this.setState({ show: false })}
        >
          <div className={styles.popup}>
            <a href="https://www.parse.com/docs/server/guide">Server Guide <span className={styles.emoji}>📚</span></a>
            <a href="ttps://www.parse.com/help">Help <span className={styles.emoji}></span></a>
          </div>
        </Popover>
      );
    }
    return (
      <a onClick={this.toggle} ref="more" className={styles.more}>
        <Icon height={24} width={24} name="ellipses" />
        {content}
      </a>
    );
  }
}
