import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from 'reducers';

export default function createAppStore() {
  const logger = createLogger();
  return createStore(
    reducers,
    applyMiddleware(thunk, logger)
  );
}
