import React from 'react';
import { storiesOf } from '@kadira/storybook';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from 'components/Login';
import styles from 'stories/stories.style';
import { AsyncStatus } from 'lib/constants';

storiesOf('Login', module)
  .addDecorator(story => (
    <div style={styles.center}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        {story()}
      </MuiThemeProvider>
    </div>
  ))
  .add('Login form initial state', () => {
    const status = AsyncStatus.IDLE;
    const onSubmit = () => {};

    return (
      <Login
        onSubmit={onSubmit}
        status={status}
      />
    );
  })
  .add('Login form loading', () => {
    const status = AsyncStatus.LOADING;
    const onSubmit = () => {};

    return (
      <Login
        onSubmit={onSubmit}
        status={status}
      />
    );
  })
  .add('Login form with error message', () => {
    const status = AsyncStatus.FAILED;
    const message = 'Invalid username or password';

    const onSubmit = () => {};

    return (
      <Login
        onSubmit={onSubmit}
        status={status}
        message={message}
      />
    );
  });

