import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

import reducers from 'reducers';

export default function createAppStore(browseHistory) {
  const logger = createLogger();
  const routing = routerMiddleware(browseHistory);

  return createStore(
    reducers,
    applyMiddleware(routing, thunk, logger)
  );
}
