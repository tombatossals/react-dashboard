import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import styles from 'components/stories/stories.style';

storiesOf('Button', module)
  .addDecorator(story => (
    <div style={styles.center}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        {story()}
      </MuiThemeProvider>
    </div>
  ))
  .add('Raised button', () => (
    <RaisedButton label="Raised Button" onClick={action('click')} />
  ));
