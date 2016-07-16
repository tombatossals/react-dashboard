import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'

import Routes from 'routes'
import configureStore from 'lib/store'
import API from 'lib/api'

injectTapEventPlugin()

const rootElement = document.getElementById('root')

const store = configureStore(browserHistory)

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
    return this.state.ready
      ? <Routes history={this.props.history} />
      : false
  }
}

App.propTypes = {
  history: React.PropTypes.any,
  onReady: React.PropTypes.func
}

ReactDOM.render((
  <Provider store={store}>
    <App history={browserHistory} onReady={API.onReady} />
  </Provider>
), rootElement)
