import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

storiesOf('Sidebar', module)
  .add('with text', () => (
    <sidebar onClick={action('clicked')}>My First Button</sidebar>
  ))
  .add('with no text', () => (
    <sidebar></sidebar>
  ));
