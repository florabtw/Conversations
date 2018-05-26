import React, { Component } from 'react';
import { WanderingCubes } from 'better-react-spinkit';

import Counter from '../Counter/Counter';
import { database } from '../firebase';

import './user.css';

const sortDays = days => {
  return days.sort((a, b) => a[0] < b[0]);
};

class User extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    const { match } = this.props;
    const uid = match.params.id;

    database
      .ref('users')
      .child(uid)
      .on('value', snapshot => {
        const user = snapshot.val() || {};
        this.setState({ user, isLoading: false });
      });
  }

  renderDay = name => ([day, count]) => {
    return (
      <li key={day} className="day">
        <div className="day__date">{day}</div>
        <div className="day__text">
          {name} had {count} conversations.
        </div>
      </li>
    );
  };

  renderDays = user => {
    const daysMap = user.days || {};
    const name = user.name;
    const days = Object.entries(daysMap);
    const sortedDays = sortDays(days);
    const $days = sortedDays.map(this.renderDay(name));

    return <ul className="days">{$days}</ul>;
  };

  render() {
    const { user, isLoading } = this.state;

    if (isLoading) {
      return (
        <div className="loading">
          <WanderingCubes size={30} />
        </div>
      );
    }

    const name = user.name;
    const topLine = `${name} has had`;
    const $days = this.renderDays(user);

    return (
      <React.Fragment>
        <Counter showActions={false} topLine={topLine} uid={user.uid} />
        <section className="section" id="history">
          <h2 className="section__title">History</h2>
          {$days}
        </section>
      </React.Fragment>
    );
  }
}

export default User;
