import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { UilBars } from '@iconscout/react-unicons';

const ICON_SIZE = 22;

class PageHeader extends Component {
  render() {
    const { actions, onMenuClick, subtitle, title } = this.props;

    return (
      <header className="page-head">
        <button
          type="button"
          className="menu-btn"
          aria-label="open menu"
          onClick={ onMenuClick }
        >
          <UilBars size={ ICON_SIZE } />
        </button>

        <div className="page-head__titles">
          <h1 className="page-title">{title}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>

        {actions && <div className="page-head__actions">{actions}</div>}
      </header>
    );
  }
}

PageHeader.propTypes = {
  actions: PropTypes.node,
  onMenuClick: PropTypes.func.isRequired,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

PageHeader.defaultProps = {
  actions: null,
  subtitle: '',
};

export default PageHeader;
