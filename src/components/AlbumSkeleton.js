import React, { Component } from 'react';
import '../styles/skeleton.css';

class AlbumSkeleton extends Component {
  render() {
    return (
      <div className="album-skeleton" aria-hidden="true">
        <span className="skeleton skeleton--art" />
        <span className="skeleton skeleton--line" />
        <span className="skeleton skeleton--line skeleton--short" />
      </div>
    );
  }
}

export default AlbumSkeleton;
