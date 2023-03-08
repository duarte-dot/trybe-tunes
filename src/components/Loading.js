import React, { Component } from 'react';
import './loading.css';

class Loading extends Component {
  render() {
    return (
      <div className="page-loading">
        <div className="loading" />
        <p>loading...</p>
      </div>
    );
  }
}

export default Loading;
