import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import reducers from 'reducers';

export default function createAppStore(browseHistory) {
  const routing = routerMiddleware(browseHistory);
  const middleware = [routing, thunk];

  const store = createStore(reducers, compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
  return store;
}
