import React from 'react';
import { Router, Route, Redirect, browserHistory, IndexRoute } from 'react-router';
import Layout from 'components/layout';
import Youtube from 'components/youtube';
import Login from 'components/login';

function App() {
  return (
    <Router history={browserHistory}>
      <Redirect from="/" to="/dashboard" />
      <Route path="/login" component={Login} />
      <Route path="/" component={Layout}>
        <IndexRoute component={Youtube} />
        <Route path="/youtube" component={Youtube} />
        <Route path="/dashboard" component={Youtube} />
      </Route>
    </Router>
  );
}

export default App;
