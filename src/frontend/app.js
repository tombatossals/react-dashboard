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

const store = configureStore(browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

class App extends React.Component {
  constructor (props) {
    super(props)
    this.enableApp(props.onReady)
    this.state = {
      ready: false
    }
  }

  enableApp (onReady) {
    onReady(() => {
      this.setState({
        ready: true
      })
    })
  }

  render () {
    if (this.state.ready === false) {
      return false
    }
    return (
      <Routes history={this.props.history} />
    )
  }
}

App.propTypes = {
  history: React.PropTypes.any,
  onReady: React.PropTypes.any
}

ReactDOM.render((
  <Provider store={store}>
    <App history={history} onReady={API.onReady} />
  </Provider>
), rootElement)
