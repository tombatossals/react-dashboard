/*
 * Copyright (c) 2016-present, Parse, LLC
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */
import AppsMenu from 'components/Sidebar/AppsMenu';
import Popover from 'components/Popover/Popover';
import { history } from 'react-router';
import Position from 'lib/Position';
import React from 'react';
import ReactDOM from 'react-dom';
import styles from 'components/Sidebar/Sidebar.scss';

export default class AppsSelector extends React.Component {
  constructor() {
    super();
    this.close = this.close.bind(this);
    this.select = this.select.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      open: false,
      position: null,
    };
  }

  componentDidMount() {
    // this.setState({
    //  position: Position.inWindow(ReactDOM.findDOMNode(this)),
    // });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.context !== nextContext) {
      this.setState({ open: false });
    }
  }

  toggle() {
    this.setState({
      open: !this.state.open,
    });
  }

  close() {
    this.setState({
      open: false,
    });
  }

  select(value) {
    const currentSlug = this.context.currentApp.slug;
    this.setState({
      open: false,
    }, () => {
      if (currentSlug !== value) {
        const sections = location.pathname.split('/');
        if (sections[0] === '') {
          sections.shift();
        }
        history.push(`/apps/${value}/${sections[2]}`);
      }
    });
  }

  render() {
    let position = Position.inWindow(ReactDOM.findDOMNode(this));
    let popover = null;
    if (this.state.open) {
      let height = window.innerHeight - position.y;
      popover = (
        <Popover fixed position={position} onExternalClick={this.close}>
          <AppsMenu
            apps={this.props.apps}
            current={this.context.currentApp}
            height={height}
            onSelect={this.select}
          />
        </Popover>
      );
    }
    return (
      <div className={styles.apps}>
        <div className={styles.currentApp} onClick={this.toggle}>
          {this.context.currentApp.name}
        </div>
        {popover}
      </div>
    );
  }
}

AppsSelector.contextTypes = {
  currentApp: React.PropTypes.any,
};

AppsSelector.propTypes = {
  apps: React.PropTypes.any,
};
