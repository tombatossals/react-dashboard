import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import App from './app';
import createAppStore from 'lib/store';

const store = createAppStore();

injectTapEventPlugin();

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>), document.getElementById('root'));

