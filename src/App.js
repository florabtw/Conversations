import React, { Component } from 'react';
import { database } from './firebase';

class App extends Component {
  constructor() {
    super();

    this.state = {
      message: 'Loading message...'
    };
  }

  componentDidMount() {
    this.updateComponent();
  }

  updateComponent = async () => {
    const message = await database
      .ref('hello')
      .once('value')
      .then(snapshot => snapshot.val());

    this.setState({ message });
  };

  render() {
    const { message } = this.state;

    return <div>{message}</div>;
  }
}

export default App;
