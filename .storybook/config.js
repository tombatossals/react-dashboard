import { configure } from '@kadira/storybook';

function loadStories() {
  require('../src/frontend/components/stories/button');
}

configure(loadStories, module);
