import React, { Component } from 'react';
import { WanderingCubes } from 'better-react-spinkit';

import { database } from '../firebase';

import './users.css';

const dateToKey = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
};

class Users extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      users: []
    };
  }

  componentDidMount() {
    database.ref('users').on('value', snapshot => {
      const usersObj = snapshot.val() || {};
      const users = Object.values(usersObj);

      this.setState({ users, isLoading: false });
    });
  }

  renderPeep = user => {
    const today = new Date();
    const todayKey = dateToKey(today);

    const days = user.days || {};
    const count = days[todayKey] || 0;

    return (
      <li className="peep" key={user.uid}>
        <div className="peep__name">{user.name}</div>
        <div className="peep__count">{count} conversations today.</div>
      </li>
    );
  };

  renderPeeps = users => {
    const $peeps = users.map(this.renderPeep);

    return <ul className="peeps">{$peeps}</ul>;
  };

  renderLoading = () => (
    <div className="loading loading--small">
      <WanderingCubes size={10} />
    </div>
  );

  render() {
    const { isLoading, users } = this.state;

    const $peeps = isLoading ? this.renderLoading() : this.renderPeeps(users);

    return (
      <section className="section" id="users">
        <h2 className="section__title">Peeps</h2>
        {$peeps}
      </section>
    );
  }
}

export default Users;
