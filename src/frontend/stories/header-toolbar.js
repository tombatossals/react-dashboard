import React from 'react';
import { storiesOf } from '@kadira/storybook';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HeaderToolbar from 'components/HeaderToolbar';
import styles from 'stories/stories.style';
import { AsyncStatus } from 'lib/constants';

storiesOf('Header Menu', module)
  .addDecorator(story => (
    <div style={styles.centerBlack}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        {story()}
      </MuiThemeProvider>
    </div>
  ))
  .add('Anonymous User', () => {
    const auth = {
      status: AsyncStatus.FAILED,
    };
    const onNavigationChange = () => {};

    return (
      <HeaderToolbar
        auth={auth}
        onNavigationChange={onNavigationChange}
      />
    );
  })
  .add('Authenticated User', () => {
    const auth = {
      status: AsyncStatus.SUCCESS,
    };

    const onNavigationChange = () => {};
    return (
      <HeaderToolbar
        auth={auth}
        onNavigationChange={onNavigationChange}
      />
    );
  });

