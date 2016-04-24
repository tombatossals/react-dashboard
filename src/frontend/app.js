import React from 'react';
import { Router, Route, Redirect, browserHistory, IndexRoute } from 'react-router';
import Layout from 'components/Layout';
import Youtube from 'components/youtube';
import Login from 'components/Login';

function App() {
  return (
    <Router history={browserHistory}>
      <Redirect from="/" to="/login" />
      <Route path="/" component={Layout}>
        <Route path="/login" component={Login} />
        <IndexRoute component={Youtube} />
        <Route path="/youtube" component={Youtube} />
        <Route path="/dashboard" component={Youtube} />
      </Route>
    </Router>
  );
}

export default App;
