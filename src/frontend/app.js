import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Root from './containers/root'

injectTapEventPlugin()

const rootElement = document.getElementById('root')

ReactDOM.render((
  <Root />
), rootElement)
