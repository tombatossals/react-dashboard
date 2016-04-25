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
  .add('Login form', () => {
    const onSubmit = (username, password) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (password) {
            return resolve({
              status: AsyncStatus.SUCCESS,
              token: 'abc123',
            });
          }
          return reject({
            status: AsyncStatus.ERROR,
            errorMessage: 'Invalid username or password ' });
        }, 1000);
      });


    const onSuccess = () => {};

    return <Login onSubmit={onSubmit} onSuccess={onSuccess} />;
  });
