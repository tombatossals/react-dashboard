import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from 'reducers'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import createLogger from 'redux-logger'

export default function configureStore (browserHistory) {
  const routing = routerMiddleware(browserHistory)
  const logger = createLogger()
  const enhancer = compose(
    applyMiddleware(routing, thunk, logger)
  )

  const store = createStore(rootReducer, enhancer)
  return store
}
