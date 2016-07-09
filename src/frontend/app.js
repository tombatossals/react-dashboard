import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import Routes from 'routes'
import configureStore from 'lib/store'
import API from 'lib/api'

injectTapEventPlugin()

const rootElement = document.getElementById('root')

API.init()

const store = configureStore(browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
  <Provider store={store}>
    <Routes history={history} />
  </Provider>
), rootElement)
