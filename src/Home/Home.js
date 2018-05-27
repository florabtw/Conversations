import React, { Component } from 'react';

import Users from '../Users/Users';

import './home.css';

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="section" id="home">
          <h1>Come out of your shell :)</h1>
          <p>
            I built this site to help incentivize myself to be more outgoing.
            Relationships are critical to happiness and by being shy I am
            robbing myself of the opportunity to engage with all the wonderful
            people around me.
          </p>
          <p>
            You can use this site, too, if you'd like. Just click "sign in" and
            it will automatically use your Google account. Be warned: There is
            no way to delete your account once you create it.
          </p>
          <p>
            Rules? There are none. You get to choose what is a meaningful
            conversation. I plan on starting small: "Hello."
          </p>
        </section>
        <Users />
      </React.Fragment>
    );
  }
}

export default Home;
