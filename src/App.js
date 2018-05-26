import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { WanderingCubes } from 'better-react-spinkit';

import { auth } from './firebase';
import Home from './Home/Home';
import Profile from './Profile/Profile';

class App extends Component {
  constructor() {
    super();

    this.state = { isLoading: true };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => this.setState({ isLoading: false }));
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading) return <LoadingSpinner />;

    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/profile" component={Profile} />
      </Switch>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.currentUser ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const LoadingSpinner = () => (
  <div className="loading">
    <WanderingCubes size={30} />
  </div>
);

export default App;
