import { configure } from '@kadira/storybook';

function loadStories() {
  require('../src/frontend/stories');
}

configure(loadStories, module);
