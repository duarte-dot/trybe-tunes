import React, { Component } from 'react';
import Header from '../components/Header';

class Album extends Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <h2>Album</h2>
      </div>
    );
  }
}

export default Album;
