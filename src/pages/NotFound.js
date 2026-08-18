import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Brand from '../components/Brand';
import '../styles/notFound.css';

class NotFound extends Component {
  render() {
    return (
      <div className="notfound">
        <Brand />
        <p className="notfound__code">404</p>
        <h1 className="notfound__title">This page is off the setlist</h1>
        <p className="notfound__text">
          The link you followed does not exist anymore.
        </p>
        <Link to="/search" className="btn btn--primary">Back to search</Link>
      </div>
    );
  }
}

export default NotFound;
