import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Button from '../Button/Button';
import RaisedButton from 'material-ui/lib/raised-button';
import styles from 'components/stories/stories.scss';

storiesOf('Button', module)
  .addDecorator(story => (
    <div className={styles.center}>
      {story()}
    </div>
  ))
  .add('Default button', () => (
    <Button value="My button" onClick={action('click')}>My First Button</Button>
  ))
  .add('Raised button', () => (
    <RaisedButton label="Raised Button" onClick={action('click')} />
  ))
  .add('Progress button', () => (
    <Button progress>Progress Button</Button>
  ))
  .add('Primary button', () => (
    <Button primary>Primary Button</Button>
  ))
  .add('White button', () => (
    <Button color="white">White Button</Button>
  ))
  .add('Red button', () => (
    <Button color="red">Red Button</Button>
  ))
  .add('Green button', () => (
    <Button color="green">Green Button</Button>
  ));

