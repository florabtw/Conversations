import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { googleAuthProvider, auth } from '../firebase';

import './header.css';

class Header extends Component {
  componentDidMount() {
    const { history } = this.props;

    auth.onAuthStateChanged(user => {
      if (user) history.push('/profile');
      else history.push('/');
    });
  }

  handleSignIn = () => {
    auth.signInWithPopup(googleAuthProvider);
  };

  handleSignOut = () => {
    auth.signOut();
  };

  renderUserLinks = signedIn => {
    if (signedIn) {
      return (
        <React.Fragment>
          <Link to="/profile" className="link">
            Profile
          </Link>
          <button className="link" onClick={this.handleSignOut}>
            Sign out
          </button>
        </React.Fragment>
      );
    }

    return (
      <button className="link" onClick={this.handleSignIn}>
        Sign in
      </button>
    );
  };

  render() {
    const signedIn = !!auth.currentUser;

    const $userLinks = this.renderUserLinks(signedIn);

    return (
      <div className="links">
        <div>
          <Link to="/" className="link">
            Home
          </Link>
        </div>
        <div>{$userLinks}</div>
      </div>
    );
  }
}

export default withRouter(Header);
