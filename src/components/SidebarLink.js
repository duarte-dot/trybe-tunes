import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

class SidebarLink extends Component {
  render() {
    const { icon, name, onNavigate, path } = this.props;

    return (
      <NavLink
        to={ path }
        className="side-link"
        activeClassName="is-active"
        onClick={ onNavigate }
      >
        {icon}
        <span>{name}</span>
      </NavLink>
    );
  }
}

SidebarLink.propTypes = {
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

export default SidebarLink;
