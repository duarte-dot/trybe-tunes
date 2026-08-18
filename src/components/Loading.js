import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/loading.css';

class Loading extends Component {
  render() {
    const { label } = this.props;

    return (
      <div className="loader" role="status">
        <span className="loader__spinner" />
        <span className="sr-only">{label}</span>
      </div>
    );
  }
}

Loading.propTypes = {
  label: PropTypes.string,
};

Loading.defaultProps = {
  label: 'loading',
};

export default Loading;
