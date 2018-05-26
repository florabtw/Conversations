import React, { Component } from 'react';
import { database } from '../firebase';

import './counter.css';

const dateToKey = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
};

class Counter extends Component {
  state = {
    count: 0
  };

  componentDidMount() {
    const { uid } = this.props;

    const todayKey = dateToKey(new Date());

    database
      .ref(`users/${uid}/days/`)
      .child(todayKey)
      .on('value', snapshot => {
        const count = snapshot.val() || 0;
        this.setState({ count });
      });
  }

  handleIncrement = () => {
    const { uid } = this.props;

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
    const { topLine, showActions } = this.props;

    return (
      <section id="counter">
        <div className="counter">
          <p className="counter__text">{topLine}</p>
          <div className="counter__count">{count}</div>
          <p className="counter__text">conversations today.</p>
          {showActions && (
            <div className="clickers">
              <button
                className="clicker__increment"
                onClick={this.handleIncrement}
              >
                Increment
              </button>
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default Counter;
