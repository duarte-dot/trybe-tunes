import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/emptyState.css';

class EmptyState extends Component {
  render() {
    const { action, description, icon, title } = this.props;

    return (
      <div className="empty-state">
        {icon && <span className="empty-state__icon">{icon}</span>}
        <h2 className="empty-state__title">{title}</h2>
        {description && <p className="empty-state__text">{description}</p>}
        {action}
      </div>
    );
  }
}

EmptyState.propTypes = {
  action: PropTypes.node,
  description: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
};

EmptyState.defaultProps = {
  action: null,
  description: '',
  icon: null,
};

export default EmptyState;
