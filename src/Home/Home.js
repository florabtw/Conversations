import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { googleAuthProvider, auth } from '../firebase';

import GoogleButton from 'react-google-button';

class Home extends Component {
  constructor() {
    super();

    this.state = { loggedIn: false };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) this.setState({ loggedIn: true });
    });
  }

  handleLogIn = () => {
    auth.signInWithPopup(googleAuthProvider);
  };

  render() {
    if (this.state.loggedIn) return <Redirect to="/profile" />;

    return (
      <div>
        <h1>Welcome to Conversations!</h1>
        <p>This is a site for tracking your conversations every day.</p>
        <p>
          Personally, I only count conversations which I initiate. If it only
          reaches "Hello", I still count it – as long as they respond.
        </p>
        <GoogleButton onClick={this.handleLogIn} />
      </div>
    );
  }
}

export default Home;
