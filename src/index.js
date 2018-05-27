import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, BrowserRouter } from 'react-router-dom';

import App from './App';

import './index.css';
import './styles/Section.css';

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

const RestoreScroll = withRouter(ScrollToTop);

ReactDOM.render(
  <BrowserRouter>
    <RestoreScroll>
      <App />
    </RestoreScroll>
  </BrowserRouter>,
  document.getElementById('root')
);
