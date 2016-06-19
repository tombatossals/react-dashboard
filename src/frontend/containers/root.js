import React from 'react'
import { Connector as HorizonConnector } from 'horizon-react'
import { Provider } from 'react-redux'

import routes from '../routes'
import store from '../lib/store'
import horizon from '../lib/db'

export default () => (
  <HorizonConnector horizon={horizon} store={store}>
    <Provider store={store}>
        {routes}
    </Provider>
  </HorizonConnector>
)
