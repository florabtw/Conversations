import React, { Component } from 'react';

import './home.css';

class Home extends Component {
  render() {
    return (
      <section id="home">
        <h1>Welcome to Conversations!</h1>
        <p>This is a site for tracking your conversations every day.</p>
        <p>
          Personally, I only count conversations which I initiate. If it only
          reaches "Hello", I still count it – as long as they respond.
        </p>
      </section>
    );
  }
}

export default Home;
