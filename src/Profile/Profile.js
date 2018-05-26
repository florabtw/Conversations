import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { database, auth } from '../firebase';

const dateToKey = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
};

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      signedOut: false,
      count: 0
    };
  }

  componentDidMount() {
    const uid = auth.currentUser.uid;

    const today = new Date();
    const date = dateToKey(today);

    database
      .ref(`users/${uid}/days/`)
      .child(date)
      .on('value', snapshot => {
        const count = snapshot.val() || 0;
        this.setState({ count });
      });
  }

  handleSignOut = () => {
    auth.signOut();
    this.setState({ signedOut: true });
  };

  handleIncrement = () => {
    const uid = auth.currentUser.uid;

    const today = new Date();
    const date = dateToKey(today);

    const count = this.state.count + 1;

    database
      .ref(`users/${uid}/days/`)
      .child(date)
      .set(count);
  };

  render() {
    const { count, signedOut } = this.state;

    if (signedOut) return <Redirect to="/" />;

    return (
      <section id="profile">
        <div className="links">
          <button className="link" onClick={this.handleSignOut}>
            Sign out
          </button>
        </div>
        <div className="counter">
          <p className="counter__intro">You have had</p>
          <div className="counter__count">{count}</div>
          <p className="counter__outro">conversations today.</p>
        </div>
        <div className="clicker">
          <button className="clicker__action" onClick={this.handleIncrement}>
            Increment
          </button>
        </div>
      </section>
    );
  }
}

export default Profile;
