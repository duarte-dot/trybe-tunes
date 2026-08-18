import React, { Component } from 'react';
import '../styles/brand.css';

class Brand extends Component {
  render() {
    return (
      <div className="brand">
        <span className="brand__mark" aria-hidden="true" />
        <p className="brand__text">
          Trybe
          <span className="brand__text-strong">Tunes</span>
        </p>
      </div>
    );
  }
}

export default Brand;
