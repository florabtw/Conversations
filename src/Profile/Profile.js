import React, { Component } from 'react';
import { database, auth } from '../firebase';

import './profile.css';

const dateToKey = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
};

class Profile extends Component {
  constructor() {
    super();

    this.state = { count: 0 };
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
    const { count } = this.state;

    return (
      <section id="profile">
        <div className="counter">
          <p className="counter__text">You have had</p>
          <div className="counter__count">{count}</div>
          <p className="counter__text">conversations today.</p>
          <div className="clickers">
            <button
              className="clicker__increment"
              onClick={this.handleIncrement}
            >
              Increment
            </button>
          </div>
        </div>
      </section>
    );
  }
}

export default Profile;
