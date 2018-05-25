import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { auth } from '../firebase';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      loggedOut: false
    };
  }

  handleLogOut = () => {
    auth.signOut();
    this.setState({ loggedOut: true });
  };

  render() {
    if (this.state.loggedOut) return <Redirect to="/" />;

    const user = auth.currentUser.displayName;

    return (
      <div>
        <h1>Your Profile</h1>
        <p>Welcome {user}</p>
        <button onClick={this.handleLogOut}>Sign Out</button>
      </div>
    );
  }
}

export default Profile;
