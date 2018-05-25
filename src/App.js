import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth } from './firebase';

import Home from './Home/Home';
import Profile from './Profile/Profile';

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <PrivateRoute path="/profile" component={Profile} />
  </Switch>
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.currentUser ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

export default App;
