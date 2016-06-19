import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import reducers from '../reducers'
import thunk from 'redux-thunk'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers(
  Object.assign({},
    reducers,
    { routing: routerReducer }
  )
)

const configureStore = (initialState = {}) => {
  const store = compose(
    applyMiddleware(
      thunk
    )
  )(createStore)(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept(
      '../reducers',
      () => {
        const nextReducer = require('../reducers')
        store.replaceReducer(nextReducer)
      }
    )
  }

  return store
}

const store = configureStore(window.__INITIAL_STATE__ || {})

export default store
